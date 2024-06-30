import supabase from "./supabase";

export async function login({ email, password }) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}
