import supabase from "../supabase/supabase-client";

export const createAvatar = async ({
  filePath,
  image,
}: {
  filePath: string;
  image: File;
}) => {
  const { data, error } = await supabase.storage
    .from("bank-avatar")
    .upload(filePath, image);

  if (error) throw error;
  return data;
};
