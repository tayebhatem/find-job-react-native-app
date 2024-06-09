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
  storageId: "6656445900358660b5c9",
  databaseId: "665eb5820009d031e40b",
  userCollectionId: "665eb594003852a3415a",
  verifyTokenCollectionId: "665fc26100059bba097a",
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

export const uploadImage = async (image: any) => {
  if (!image) return;
  const uri = image.uri;
  const filename = uri.split("/").pop()!;
  const type = `image/${filename.split(".").pop()}`;

  const formData = new FormData();
  formData.append("file", {
    uri,
    name: filename,
    type,
  } as any);
  try {
    const session = await account.getSession("current");
    const id = session.userId;

    const result = await storage.createFile(
      appwriteConfig.profileBucketId,
      id,
      formData as any
    );
    if (!result) throw Error;

    return result;
  } catch (error: any) {
    console.log(error);
  }
};
