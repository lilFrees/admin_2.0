import AuthForm from "@/features/auth/components/AuthForm";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { createClient } from "@/shared/supabase/server";

async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="absolute inset-0 flex h-screen w-screen overflow-hidden bg-zinc-100">
      <div className="hidden h-full basis-1/2 items-center justify-center bg-green-300/20 md:flex">
        <div className="mb-20 h-48 w-48">
          <Image
            src={logo}
            alt="Logo"
            className="block h-full w-full object-contain"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="flex h-full basis-full flex-col items-center justify-center gap-5 px-3 md:basis-1/2">
        <h1 className="text-2xl font-bold">Green Haven</h1>
        <p className="text-lg text-slate-600">
          Enter your credentials to login
        </p>
        <AuthForm />
      </div>
    </div>
  );
}

export default Page;
