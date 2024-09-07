"use server";

import { createClient } from "@/shared/supabase/server";
import { IUser } from "../interfaces/IUser";

export async function getUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("admin_users").select("*");

  if (error) throw error;

  console.log(data);
  console.log(error);

  return data as IUser[];
}
