"use server";

import { createClient } from "@/shared/supabase/server";
import { FormDataType } from "../types/FormDataType";

export async function loginWithPassword({ email, password }: FormDataType) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error.message;

  return user;
}
