// src/components/Sidebar.tsx
import Link from "next/link";
import { Book, Users, BookOpen, Home } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900/80 backdrop-blur-md border-r border-gray-800/50 flex flex-col">
      <div className="p-6 border-b border-gray-800/50">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Library Pro
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <Home className="w-5 h-5" />
              <span>হোম</span>
            </Link>
          </li>
          <li>
            <Link href="/books" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <Book className="w-5 h-5" />
              <span>বই</span>
            </Link>
          </li>
          <li>
            <Link href="/members" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <Users className="w-5 h-5" />
              <span>সদস্য</span>
            </Link>
          </li>
          <li>
            <Link href="/borrows" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <BookOpen className="w-5 h-5" />
              <span>ধার</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}