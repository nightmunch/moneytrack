import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <div className="fixed left-0 right-0 top-0 z-50">
        {/* Navbar goes here */}
        <div className="h-16 bg-white dark:bg-slate-950"></div>
        <ModeToggle />
      </div>
    </div>
  );
}
