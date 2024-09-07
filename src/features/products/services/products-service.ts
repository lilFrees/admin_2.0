import { createClient } from "@/shared/supabase/client";
import { IProduct } from "../interfaces/IProduct";
import { IAdminProduct } from "../interfaces/IAdminProduct";

const supabase = createClient();

export async function getProducts({
  page,
  limit,
  searchQuery,
}: {
  page: number;
  limit: number;
  searchQuery?: string;
}): Promise<{
  products: IAdminProduct[];
  count: number;
}> {
  let query = supabase
    .from("admin_products")
    .select("*")
    .order("product_id", { ascending: true });

  if (searchQuery) {
    query = query.or(
      `product_name.ilike.%${searchQuery}%,product_description.ilike.%${searchQuery}%,category_name.ilike.%${searchQuery}%,brand_name.ilike.%${searchQuery}%`,
    );
  }

  const { data: allProducts, error: countError } = await query;

  if (countError) {
    throw new Error(countError.message);
  }

  const { data, error } = await query.range(
    page * limit,
    (page + 1) * limit - 1,
  );

  if (error) {
    throw new Error(error.message);
  }

  return { products: data, count: allProducts.length };
}

export async function toggleActiveStatus(
  productId: number,
  value: boolean,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("products")
    .update({ is_active: value })
    .match({ id: productId })
    .select("is_active")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.is_active;
}

export async function getProductById(id: number): Promise<IProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}
