"use client";

import { useAuthStore } from "@/features/auth/hooks/useAuthStore";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaCube, FaFileAlt, FaShapes } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import { MdComment, MdStars } from "react-icons/md";
import { createClient } from "./supabase/client";

const links = [
  {
    to: "/dashboard",
    title: "Dashboard",
    icon: <BsGrid1X2Fill />,
  },
  {
    to: "/products",
    title: "Products",
    icon: <FaCube />,
  },
  {
    to: "/categories",
    title: "Categories",
    icon: <FaShapes />,
  },
  {
    to: "/brands",
    title: "Brands",
    icon: <MdStars />,
  },
  {
    to: "/users",
    title: "Users",
    icon: <FaUserGroup />,
  },
  {
    to: "/orders",
    title: "Orders",
    icon: <FaFileAlt />,
  },
  {
    to: "/reviews",
    title: "Reviews",
    icon: <MdComment />,
  },
];

function LayoutNav() {
  const supabase = createClient();
  const pathname = usePathname();
  const { setUser } = useAuthStore((state) => state);
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut({
      scope: "global",
    });
    setUser(null);
    router.refresh();
  }

  if (pathname === "/login") return null;
  return (
    <div className="flex h-full basis-80 flex-col gap-5 border-r border-slate-300 p-3">
      <h2 className="text-xl font-bold">Green Haven Admin</h2>
      <nav className="flex w-full grow flex-col gap-3">
        {links.map((link) => (
          <Link key={link.to} href={link.to}>
            <Button
              leftIcon={link.icon}
              variant="ghost"
              colorScheme="green"
              className="w-full justify-start"
              isActive={pathname === link.to}
            >
              <span className="w-full text-left">{link.title}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <Button colorScheme="green" onClick={signOut} rightIcon={<IoMdExit />}>
        Logout
      </Button>
    </div>
  );
}

export default LayoutNav;
