import { useEffect, useState } from "react";
import { getCurrentUser } from "./appwrite";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    getUser();
  }, []);

  return user;
};
