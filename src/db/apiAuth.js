import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) return null;
  if (error) throw new Error(error.message);
  return data.session?.user;
}

export async function signUp({ name, email, password, profile_pic }) {
  // upload Profile Pic
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: StorageErr } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);
  if (StorageErr) throw new Error(StorageErr.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
