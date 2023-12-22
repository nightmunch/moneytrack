import { ModeToggle } from "./mode-toggle";
import { Sidebar } from "./sidebar";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-4 shadow-md dark:bg-[#14141A]">
      <Sidebar />
      <p className="text-lg font-semibold text-content">Money Track</p>
      <ModeToggle />
    </div>
  );
};
