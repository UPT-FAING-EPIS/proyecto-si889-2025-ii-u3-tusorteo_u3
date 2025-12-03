import { supabase } from "./supabaseClient";

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    const { data: userData } = await supabase
      .from("users")
      .select("name, email, avatar_url, created_at")
      .eq("id", data.user.id)
      .single();
    return { ...data.user, ...userData };
  }
  return null;
}
