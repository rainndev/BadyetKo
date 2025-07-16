import supabase from "@/supabase/supabase-client";
import type { CategoriesListTypes } from "@/types/categories.types";

export const getCategories = async (): Promise<CategoriesListTypes[]> => {
  const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("getting categories error", error)
    throw error
  };
  return data;
};


export const createCategory = async ({
  categoryName,
  categoryColor,
}: {
  categoryName: string;
  categoryColor: string
}): Promise<CategoriesListTypes[]> => {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ name: categoryName, color: categoryColor }])
    .select()
    .single();

  if (error) {
    console.error("creating categories error", error)
    throw error
  };
  return data;
};


export const removeCategory = async (categoryID: string): Promise<CategoriesListTypes[]> => {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryID)
    .select()
    .single();

if (error) {
    console.error("deleting categories error", error)
    throw error
};

return data;
};