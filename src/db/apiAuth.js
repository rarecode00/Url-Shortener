import supabase from "./supabase";

export async function login(email, password) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new error(error.message);
  return data;
}
