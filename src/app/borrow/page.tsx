// src/app/borrow/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"  // sonner থেকে toast ইমপোর্ট

export default function BorrowPage() {
  const [books, setBooks] = useState([])
  const [members, setMembers] = useState([])
  const [selectedBookId, setSelectedBookId] = useState('')
  const [selectedMemberId, setSelectedMemberId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, membersRes] = await Promise.all([
          fetch('http://localhost:5000/books'),
          fetch('http://localhost:5000/members')
        ])

        if (!booksRes.ok || !membersRes.ok) {
          throw new Error('ডাটা লোড করতে সমস্যা হয়েছে')
        }

        const booksData = await booksRes.json()
        const membersData = await membersRes.json()

        setBooks(booksData)
        setMembers(membersData)
      } catch (err) {
        setError(err.message)
        toast.error("এরর", {
          description: err.message
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleBorrow = async () => {
    if (!selectedBookId || !selectedMemberId) {
      toast.error("এরর", {
        description: "বই এবং সদস্য সিলেক্ট করুন"
      })
      return
    }

    try {
      const response = await fetch('http://localhost:5000/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: parseInt(selectedBookId),
          member_id: parseInt(selectedMemberId)
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'ধার নিতে সমস্যা')
      }

      toast.success("সফল!", {
        description: "বই ধার নেওয়া হয়েছে"
      })

      // বই লিস্ট রিফ্রেশ
      const updatedBooks = await fetch('http://localhost:5000/books').then(res => res.json())
      setBooks(updatedBooks)

      // ফর্ম রিসেট
      setSelectedBookId('')
      setSelectedMemberId('')
    } catch (err) {
      toast.error("এরর", {
        description: err.message
      })
    }
  }

  if (loading) return <div className="text-center p-10 text-xl text-gray-300">লোড হচ্ছে...</div>
  if (error) return <div className="text-center p-10 text-red-500 text-xl">এরর: {error}</div>

  return (
    <div className="space-y-8 text-white">
      <h1 className="text-3xl font-bold">বই ধার নিন</h1>

      <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl">ধারের ফর্ম</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">বই সিলেক্ট করুন</label>
              <select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-800 text-gray-400">-- বই বেছে নিন --</option>
                {books.map(book => (
                  <option 
                    key={book.id} 
                    value={book.id} 
                    disabled={book.available_copies <= 0}
                    className="bg-gray-800 text-white"
                  >
                    {book.title} ({book.available_copies} উপলব্ধ)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">সদস্য সিলেক্ট করুন</label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-800 text-gray-400">-- সদস্য বেছে নিন --</option>
                {members.map(member => (
                  <option 
                    key={member.id} 
                    value={member.id}
                    className="bg-gray-800 text-white"
                  >
                    {member.name} ({member.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button 
            onClick={handleBorrow}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            disabled={!selectedBookId || !selectedMemberId}
          >
            ধার নিন
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}