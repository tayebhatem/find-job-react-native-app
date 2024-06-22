import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  OAuthProvider,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tayebhatem.jobit",
  projectId: "665e6ae400187d847eac",
  databaseId: "665eb5820009d031e40b",
  userCollectionId: "665eb594003852a3415a",
  verifyTokenCollectionId: "665fc26100059bba097a",
  companyCollectionId: "66653027000cb15a3059",
  offersCollectionId: "667184e9003445be0ffa",
  profileBucketId: "6663c89300341bb2d5c9",
  
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email: string, password: string) {
  try {
    const newAccount = await account.create(ID.unique(), email, password);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(newAccount.email);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      newAccount.$id,
      {
        avatar: avatarUrl,
        verified: false,
        userType: null,
      }
    );

    if (!newUser) throw Error;
    await signIn(email, password);

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw Error;

    const userVrified = await checkAccountVerivication(session.userId);

    if (!userVrified) {
      await deleteToken(session.userId);

      const token = await createVerificationToken(session.userId);
    }

    return userVrified;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const updatePassword=async(password:string)=>{
   try {
    const result=await account.updatePassword(password)

    if(!result) throw Error()
   } catch (error:any) {
    throw new Error(error)
   }
}
// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}
//get session
export async function getCurrentSession() {
  try {
    const session = await account.getSession("current");

    return session;
  } catch (error) {}
}
// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentAccount.$id
    );

    if (!currentUser) throw Error;

    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get  User by id
export async function getUserById(id:string) {
  try {


    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
     id
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//get company
export async function getCompany() {
  try {
    const session = await account.getSession("current");

    const id = session.userId;

    const company = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.companyCollectionId,
      [
        Query.equal('user', id)
    ]
    );

    if (!company) throw Error;
  
    return company.documents[0];
  } catch (error) {
    console.log(error);
   
  }
}



//get company by id
export async function getCompanyById(id:string) {
  
  try {
  
    const data = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.companyCollectionId,
      id
    );

    if (!data) throw Error;
    
    return data;
  } catch (error) {
    console.log(error);
   
  }
}

const getAccount = async () => {
  try {
    const result = await account.get();
    return result;
  } catch (error) {}
};

//verification otp token
const createVerificationToken = async (id: string) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const expirationTime = new Date();

    expirationTime.setHours(expirationTime.getHours() + 1);

    const token = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.verifyTokenCollectionId,
      id,
      {
        secret: otp,
        expDate: expirationTime,
      }
    );

    if (!token) throw Error;
    console.log(`your OTP code is ${token.secret}`);
    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resendCode = async () => {
  try {
    const session = await account.getSession("current");

    const id = session.userId;
    await deleteToken(id);
    createVerificationToken(id);
  } catch (error) {}
};
const deleteToken = async (id: string) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.verifyTokenCollectionId,
      id
    );
    if (!response) return;
  } catch (error) {}
};

const getToken = async (id: string) => {
  try {
    const token = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.verifyTokenCollectionId,
      id
    );
    if (!token) return null;

    return token;
  } catch (error) {}
};

export const verifyAccount = async (code: string) => {
  try {
    const session = await account.getSession("current");

    const id = session.userId;
    const token = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.verifyTokenCollectionId,
      id
    );

    if (token.secret !== code) {
      return { success: false, error: "Wrong OTP code !" };
    } else {
      if (token.expDate < new Date()) {
        return { error: "OTP code has expired !" };
      }

      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        id,
        {
          verified: true,
        }
      );

      await deleteToken(id);
    }
    return { success: true, message: "Account verified successfully" };
  } catch (error) {
    console.log(error);
  }
};

const checkAccountVerivication = async (id: string) => {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id
    );
    if (!user) throw Error;

    return user.verified;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserType = async (type: string) => {
  try {
    const session = await account.getSession("current");

    const id = session.userId;
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id,
      {
        userType: type,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const updateUserAvatar = async (url: URL) => {
  try {
    const session = await account.getSession("current");

    const id = session.userId;
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id,
      {
        avatar: url,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getFilePreview=async(fileId:string)=> {
  let fileUrl;

  try {
    const session = await account.getSession("current");

    const id = session.userId;

    fileUrl = storage.getFilePreview(
      appwriteConfig.profileBucketId,
      id,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error:any) {
    throw new Error(error);
  }
}
export const uploadImage = async (file: any) => {
  if (!file) return;

  const { uri, mimeType, fileName } = file;
  const response = await fetch(uri);
  const blob = await response.blob();
  const size = blob.size;

  const asset = {
    uri,
    type: mimeType,
    size,
    name: fileName 
  };


  try {
    const session = await account.getSession("current");
    const id = session.userId;
    await deleteFile(id)
    const result = await storage.createFile(
      appwriteConfig.profileBucketId,
      id,
      asset
    );
    if (!result) throw Error;
   const fileUrl=await getFilePreview(result.$id)
   await updateUserAvatar(fileUrl)
    return result;
  } catch (error:any) {
   throw new Error(error.message)
  }
};

const deleteFile=async(id:string)=>{
try {
  const result = await storage.deleteFile(
    appwriteConfig.profileBucketId, 
    id 
);
} catch (error:any) {
  throw new Error(error.message)
}
}
export const createCompanyAccount = async (
  name: string,
  website: string,
  field: number,
  state: number,
  adress: string
) => {
  try {
    const session = await account.getSession("current");

    const id = session.userId;
    const user = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id,
      {
        name,
        website,
        state,
        adress,
      }
    );
    if (!user) throw Error;

    const data = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.companyCollectionId,
      ID.unique(),
      {
        field: field,
        user: id,
      }
    );
    if (!data) throw Error;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};


export const updateCompany = async (
  id:string,
  name: string,
  website: string,
  field: number,
  state: number,
  adress: string
) => {
  try {
    const session = await account.getSession("current");

    const userId = session.userId;
    const user = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        name,
        website,
        state,
        adress,
      }
    );
    if (!user) throw Error;

    const data = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.companyCollectionId,
      id,
      {
        field: field,

      }
    );
    if (!data) throw Error;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};


//get company offers
export async function getOffersByCompanyId(id:string) {
  try {
  

    const offers = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.offersCollectionId,
      [
        Query.equal('company', id),
        Query.equal('archived',false),
        Query.orderDesc("datetime")
    ]
    );

    if (!offers) throw Error;
  
    return offers.documents;
  } catch (error) {
    console.log(error);
   
  }
}

//get company offers
export async function getArchivedOffers(id:string) {
  try {
  

    const offers = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.offersCollectionId,
      [
        Query.equal('company', id),
        Query.equal('archived',true),
        Query.orderDesc("datetime")
    ]
    );

    if (!offers) throw Error;
  
    return offers.documents;
  } catch (error) {
    console.log(error);
   
  }
}

//get company offer by id
export async function getOfferById(id:string) {
  try {
  

    const offer = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.offersCollectionId,
     id
    );

    if (!offer) throw Error;
  
    return offer;
  } catch (error) {
    console.log(error);
   
  }
}

export const createOffer=async(id:string | undefined,title:string,description:string,experience:number,education:number)=>{
  const datetime=new Date()
  try {
   const offer= await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.offersCollectionId,
      ID.unique(),
      {
        company:id,
        title,
        description,
        experience,
        datetime,
        education
      }
      )
      if(!offer) throw Error();
      return offer
  } catch (error:any) {
    throw new Error(error)
  }
}



//delete offer
export const deleteOffer = async (
  id:string,
) => {
  try {
    

    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.offersCollectionId,
      id,
      
    );
    if (!response) throw Error;
   
  } catch (error: any) {
    throw new Error(error);
  }
};

//archive offer
export const archiveOffer = async (
  id:string,
  archive:boolean
) => {
  try {
    

    const data = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.offersCollectionId,
      id,
      {
        archived: archive,

      }
    );
    if (!data) throw Error;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};