import { type NextRequest } from "next/server";
import { updateSession } from "@/shared/supabase/middleware";
import { NextConfig } from "next";

export async function middleware(request: NextRequest) {
  console.log("middleware");
  return await updateSession(request);
}

export const config: NextConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
  ],
};
