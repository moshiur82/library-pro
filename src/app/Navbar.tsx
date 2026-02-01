// src/components/Navbar.tsx
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
      <div className="text-lg font-semibold">
        ড্যাশবোর্ড
      </div>

      <Button variant="ghost" size="icon">
        <Sun className="h-5 w-5" />
      </Button>
    </header>
  );
}