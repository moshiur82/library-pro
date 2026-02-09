import type { Metadata } from "next"
import "./globals.css"
import '@/i18n' // যদি i18n ব্যবহার করো

import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Library Pro - World-Class Library Management",
  description: "Next.js + Tailwind + PostgreSQL powered library system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 min-h-screen">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}