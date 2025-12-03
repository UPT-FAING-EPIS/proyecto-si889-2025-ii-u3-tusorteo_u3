
import { supabase } from './supabaseClient';

export async function registerUser({ email, password, name }: { email: string; password: string; name: string }) {
  // Registro con Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  // Si el registro fue exitoso, crea la fila en la tabla users
  if (data?.user) {
    const { id, email: userEmail } = data.user;
    await supabase.from('users').insert({
      id,
      name,
      email: userEmail,
    });
  }
  return { data, error };
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  return { error };
}