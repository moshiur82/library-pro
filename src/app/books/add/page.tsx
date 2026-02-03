// src/app/books/add/page.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export default function AddBookPage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [category, setCategory] = useState('')
  const [totalCopies, setTotalCopies] = useState('1')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !author) {
      toast.error("এরর", { description: "শিরোনাম এবং লেখক দরকার" })
      return
    }

    try {
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          isbn: isbn || null,
          category: category || null,
          total_copies: parseInt(totalCopies) || 1
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'বই যোগ করতে সমস্যা')
      }

      toast.success("সফল!", { description: "নতুন বই যোগ হয়েছে" })

      // ফর্ম রিসেট
      setTitle('')
      setAuthor('')
      setIsbn('')
      setCategory('')
      setTotalCopies('1')

      // বই লিস্ট পেজে ফিরে যাও
      router.push('/books')
} catch (err: unknown) {
  const errorMessage = err instanceof Error ? err.message : 'কোনো সমস্যা হয়েছে'
  toast.error("এরর", { description: errorMessage })
}
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">নতুন বই যোগ করুন</h1>

      <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-white">বইয়ের তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-gray-300">শিরোনাম *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="author" className="text-gray-300">লেখক *</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="isbn" className="text-gray-300">ISBN</Label>
              <Input
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-300">ক্যাটাগরি</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="totalCopies" className="text-gray-300">মোট কপি</Label>
              <Input
                id="totalCopies"
                type="number"
                min="1"
                value={totalCopies}
                onChange={(e) => setTotalCopies(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              বই যোগ করুন
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}