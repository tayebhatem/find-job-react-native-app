import { useEffect, useState } from "react";
import { getCurrentUser } from "./appwrite";

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch (error: any) {
        throw new Error(error);
      }finally{
        setLoading(false)
      }
    };

    getUser();
  }, []);

  return {user,loading};
};
