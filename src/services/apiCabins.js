import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function addEditCabins(formData, editId) {
  const hasImagePath = formData.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );

  const imageName = `${Math.random()}-${formData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? formData.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Creating or Editing the cabin
  let query = supabase.from("cabins");

  // CREATE
  if (!editId) {
    query = query.insert([{ ...formData, image: imagePath }]);
  }

  // EDIT
  if (editId) {
    query = query.update([{ ...formData, image: imagePath }]).eq("id", editId);
  }
  const { data: cabinData, error: cabinError } = await query.select();

  if (cabinError) {
    console.log(cabinError);
    throw new Error("Cabin could not added!");
  }

  // 2) Upload the image
  if (!hasImagePath) {
    const { error: cabinImageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, formData.image);

    if (cabinImageError) {
      await supabase.from("cabins").delete().eq("id", cabinData.id);
      console.log(cabinImageError);
      throw new Error("Cabin Image could not added and Cabin wasn't created!");
    }
  }

  return cabinData;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted!");
  }

  return data;
}
