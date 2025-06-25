import supabase from "../supabase/supabase-client";

export const getSignedImageUrl = async (path: string) => {
  const { data, error } = await supabase.storage
    .from("bank-avatar")
    .createSignedUrl(path, 60);

  if (error || !data?.signedUrl) {
    throw new Error("Failed to get signed URL");
  }

  console.log("fetching image path", path);

  return data.signedUrl;
};
