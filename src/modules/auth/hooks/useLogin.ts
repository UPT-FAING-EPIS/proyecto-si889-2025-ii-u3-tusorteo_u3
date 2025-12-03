import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/authService";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await loginUser({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (success) {
      router.replace("/profile");
    }
  }, [success, router]);

  return { login, loading, error, success };
}
