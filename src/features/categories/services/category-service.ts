import { createClient } from "@/shared/supabase/client";
import { ICategoryWithCount } from "../interfaces/ICategory";

export async function getCategories({
  page,
  limit,
  searchQuery,
}: {
  page: number;
  limit: number;
  searchQuery?: string;
}): Promise<ICategoryWithCount> {
  const supabase = createClient();
  let query = supabase
    .from("admin_categories")
    .select("*")
    .order("category_id", { ascending: true });

  if (searchQuery) {
    query = query.ilike("category_name", `%${searchQuery}%`);
  }

  const { data: allCategories, error: errorCategories } = await query;

  if (errorCategories) {
    throw errorCategories.message;
  }

  const count = allCategories.length;

  const { data, error } = await query.range(
    page * limit,
    (page + 1) * limit - 1,
  );

  if (error) {
    throw new Error(error.message);
  }

  return { categories: data, count };
}
