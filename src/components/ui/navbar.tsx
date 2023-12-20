import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-4 shadow-md dark:bg-[#14141A]">
      <p className="text-content text-lg font-semibold">Money Track</p>
      <ModeToggle />
    </div>
  );
};
