import { toast } from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

//signup
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

//login
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }

  return data?.user;
}

//logout

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
}

//update user
export async function updateCurrentUser({ password, fullName, avatar }) {
  // update pass/fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    // toast.error(error.message);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    // toast.error(storageError.message);
    throw new Error(storageError.message);
  }

  //update avatar in the user
  const { data: updatedUser, error: avatarError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (avatarError) {
    // toast.error(avatarError.message);
    throw new Error(avatarError.message);
  }
  return updatedUser;
}
