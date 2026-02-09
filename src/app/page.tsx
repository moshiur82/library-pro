// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, BookOpen, AlertCircle } from "lucide-react"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    totalMembers: 0,
    activeBorrows: 0,
    overdue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, membersRes, borrowsRes] = await Promise.all([
          fetch('https://library-pro-backend-production.up.railway.app/books'),
          fetch('https://library-pro-backend-production.up.railway.app/members'),
          fetch('https://library-pro-backend-production.up.railway.app/borrows')
        ])

        const books = await booksRes.json()
        const members = await membersRes.json()
        const borrows = await borrowsRes.json()

        const available = books.reduce((sum, b) => sum + b.available_copies, 0)
        const active = borrows.filter(b => b.status === 'active').length
        const overdue = borrows.filter(b => b.status === 'active' && new Date(b.due_date) < new Date()).length

        setStats({
          totalBooks: books.length,
          availableBooks: available,
          totalMembers: members.length,
          activeBorrows: active,
          overdue: overdue
        })
      } catch (err) {
        console.error('Stats fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div className="text-center p-10 text-xl text-gray-300">লোড হচ্ছে...</div>

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">ড্যাশবোর্ড</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-md border-blue-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-300">
              <Book className="h-5 w-5" /> মোট বই
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">{stats.totalBooks}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-md border-green-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-300">
              <BookOpen className="h-5 w-5" /> উপলব্ধ বই
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">{stats.availableBooks}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-md border-purple-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-300">
              <Users className="h-5 w-5" /> মোট সদস্য
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">{stats.totalMembers}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 backdrop-blur-md border-yellow-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-yellow-300">
              <BookOpen className="h-5 w-5" /> চলমান ধার
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">{stats.activeBorrows}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/50 to-red-800/30 backdrop-blur-md border-red-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-red-300">
              <AlertCircle className="h-5 w-5" /> বিলম্বিত
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">{stats.overdue}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}