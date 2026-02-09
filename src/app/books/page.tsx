// src/app/books/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Book = {
  id: number
  title: string
  author: string
  isbn: string | null
  category: string | null
  total_copies: number
  available_copies: number
  created_at: string
  updated_at: string
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://https://library-pro-backend-production.up.railway.app/books')
        if (!response.ok) {
          throw new Error('বই লিস্ট লোড করতে সমস্যা হয়েছে')
        }
        const data = await response.json()
        setBooks(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) return <div className="text-center p-10 text-xl text-gray-300">লোড হচ্ছে...</div>
  if (error) return <div className="text-center p-10 text-red-500 text-xl">এরর: {error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">সব বই</h1>
        <Link href="/books/add">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            নতুন বই যোগ করুন
          </Button>
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-300 text-lg">কোনো বই এখনো যোগ করা হয়নি।</p>
      ) : (
        <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">বইয়ের লিস্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">শিরোনাম</TableHead>
                  <TableHead className="text-gray-300">লেখক</TableHead>
                  <TableHead className="text-gray-300">ISBN</TableHead>
                  <TableHead className="text-gray-300">ক্যাটাগরি</TableHead>
                  <TableHead className="text-gray-300">মোট কপি</TableHead>
                  <TableHead className="text-gray-300">উপলব্ধ কপি</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id} className="hover:bg-gray-800/50">
                    <TableCell className="font-medium text-white">{book.title}</TableCell>
                    <TableCell className="text-gray-200">{book.author}</TableCell>
                    <TableCell className="text-gray-200">{book.isbn || '-'}</TableCell>
                    <TableCell className="text-gray-200">{book.category || '-'}</TableCell>
                    <TableCell className="text-gray-200">{book.total_copies}</TableCell>
                    <TableCell className={book.available_copies > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                      {book.available_copies}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}