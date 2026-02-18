// src/app/borrow/page.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export default function NewBorrowPage() {
  const [bookId, setBookId] = useState('')
  const [memberId, setMemberId] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!bookId || !memberId) {
      toast.error("এরর", { description: "বই আইডি এবং সদস্য আইডি দরকার" })
      return
    }

    try {
      const response = await fetch('https://library-pro-backend-production.up.railway.app/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: parseInt(bookId),
          member_id: parseInt(memberId)
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'ধার নিতে সমস্যা')
      }

      toast.success("সফল!", { description: "নতুন ধার নেওয়া হয়েছে" })
      router.push('/borrows')  // লিস্টে ফিরে যাও
    } catch (err: any) {
      toast.error("এরর", { description: err.message || 'কোনো সমস্যা' })
    }
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">নতুন ধার নিন</h1>

      <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-white">ধারের তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="bookId">বই আইডি *</Label>
              <Input
                id="bookId"
                type="number"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="memberId">সদস্য আইডি *</Label>
              <Input
                id="memberId"
                type="number"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              ধার নিন
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}