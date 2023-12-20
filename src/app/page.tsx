import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <div className="flex items-center justify-between px-10 py-4 shadow-md">
        <p className="text-content text-lg font-semibold">Money Track</p>
        <ModeToggle />
      </div>
    </div>
  );
}
