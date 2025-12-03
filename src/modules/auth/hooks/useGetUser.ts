import { useEffect, useState } from "react";
import { getUser } from '../services/getUserService';

type UserInfo = {
  id?: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
} | null;

export function useGetUser() {
  const [user, setUser] = useState<UserInfo>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    }
    fetchUser();
  }, []);

  return { user, loading };
}
