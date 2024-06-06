import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
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
      const token = await createVerificationToken(session.userId);
      console.log(`your OTP code is ${token.secret}`);
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
    if (!session) throw Error;
    return session;
  } catch (error) {
    console.log(error);
  }
}
// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
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
const emailOTP = async (email: string) => {
  const sessionToken = await account.createEmailToken(ID.unique(), email);

  const userId = sessionToken.userId;
  return userId;
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

    // if (!token) throw Error;

    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteToken = async (id: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.verifyTokenCollectionId,
      id
    );
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
      id,
      [Query.equal("secret", code)]
    );

    if (!token) {
      console.log("Wrong OTP code !");
      return;
    } else {
      if (token.expDate < new Date()) {
        console.log("OTP code has expired !");
        return;
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
    console.log("sucess");
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
