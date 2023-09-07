import { toast } from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

// fetch the cabins from the database

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Create a new cabin in the database, through the form

export async function createEditCabin(newCabin, id) {

  console.log("newCabinData:", newCabin); // Add this line
  console.log("id:", id); // Add this line

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);



    const fileExtension = newCabin.image.name?.split(".").pop() || "";
    const uniqueId = uuidv4();
    const imageName = `${uniqueId}.${fileExtension}`;
  



  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://ibbswuaejyecacuwqjpj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from("cabins");

  //create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).single();
  }

  //update
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Error in creating a cabin", error.message);
  }
 
  //upload image
  if (hasImagePath) {
    return data;
  }
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //Delete cabin image if upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Error in uploading image", storageError.message);
  }

  return data;
}

// delete a cabin from the database

export async function deleteCabin(id) {
  try {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
