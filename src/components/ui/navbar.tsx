import { Sun } from "lucide-react";
import ClientOnly from "../client-only";
import { ModeToggle } from "./mode-toggle";
import { Sidebar } from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export const Navbar = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex items-center justify-between px-10 py-4 shadow-md dark:bg-[#14141A]">
      <Sidebar />
      <p className="text-lg font-semibold text-content">Money Track</p>
      <div className="flex gap-2">
        <ClientOnly
          LoadingComponent={<Sun className="h-[1.2rem] w-[1.2rem]" />}
        >
          <ModeToggle />
        </ClientOnly>
        {session?.user.image && (
          <Avatar>
            <AvatarImage src={session.user.image} />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        )}
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};
