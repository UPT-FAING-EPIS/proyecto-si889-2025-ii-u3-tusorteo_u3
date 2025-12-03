import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/authService';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await registerUser({ name, email, password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (success) {
      router.replace('/profile');
    }
  }, [success, router]);

  return { register, loading, error, success };
}
