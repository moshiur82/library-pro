// src/components/Sidebar.tsx
import Link from "next/link"
import { Book, Users, BookOpen, Home, Library, PlusCircle, RotateCcw } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900/80 backdrop-blur-md border-r border-gray-800/50 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-800/50">
        <Link href="/" className="flex items-center gap-2">
          <Library className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Library Pro
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <Home className="w-5 h-5" />
              <span>হোম / ড্যাশবোর্ড</span>
            </Link>
          </li>

          <li className="mt-4">
            <div className="px-4 py-2 text-xs uppercase text-gray-400 font-semibold">বই ম্যানেজমেন্ট</div>
          </li>
          <li>
            <Link href="/books" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <Book className="w-5 h-5" />
              <span>সব বই</span>
            </Link>
          </li>
          <li>
            <Link href="/books/add" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors bg-blue-600/10">
              <PlusCircle className="w-5 h-5" />
              <span>নতুন বই যোগ করুন</span>
            </Link>
          </li>

          <li className="mt-4">
            <div className="px-4 py-2 text-xs uppercase text-gray-400 font-semibold">সদস্য ম্যানেজমেন্ট</div>
          </li>
          <li>
            <Link href="/members" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <Users className="w-5 h-5" />
              <span>সব সদস্য</span>
            </Link>
          </li>
          <li>
            <Link href="/members/add" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors bg-green-600/10">
              <PlusCircle className="w-5 h-5" />
              <span>নতুন সদস্য যোগ করুন</span>
            </Link>
          </li>

          <li className="mt-4">
            <div className="px-4 py-2 text-xs uppercase text-gray-400 font-semibold">ধার ম্যানেজমেন্ট</div>
          </li>
          <li>
            <Link href="/borrows" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors">
              <BookOpen className="w-5 h-5" />
              <span>সব ধারের লিস্ট</span>
            </Link>
          </li>
          <li>
            <Link href="/borrow" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors bg-purple-600/10">
              <BookOpen className="w-5 h-5" />
              <span>নতুন ধার নিন</span>
            </Link>
          </li>
          <li>
            <Link href="/return" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors bg-orange-600/10">
              <RotateCcw className="w-5 h-5" />
              <span>বই ফেরত দিন</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}