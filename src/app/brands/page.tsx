import BrandsPage from "@/features/brands/components/BrandsPage";
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

  return <BrandsPage />;
}

export default Page;
