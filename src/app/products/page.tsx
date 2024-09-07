import ProductPage from "@/features/products/components/ProductPage";
import { createClient } from "@/shared/supabase/server";
import { redirect } from "next/navigation";

async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return <ProductPage />;
}

export default Page;
