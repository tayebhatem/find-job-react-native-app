import { useEffect, useState } from "react";
import { getCurrentSession } from "./appwrite";

export const useSession = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await getCurrentSession();

        setSession(session);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    getSession();
  }, []);

  return session;
};
