import { Sun } from "lucide-react";
import ClientOnly from "../client-only";
import { ModeToggle } from "./mode-toggle";
import { Sidebar } from "./sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-4 shadow-md dark:bg-[#14141A]">
      <Sidebar />
      <p className="text-lg font-semibold text-content">Money Track</p>
      <ClientOnly LoadingComponent={<Sun className="h-[1.2rem] w-[1.2rem]" />}>
        <ModeToggle />
      </ClientOnly>
    </div>
  );
};
