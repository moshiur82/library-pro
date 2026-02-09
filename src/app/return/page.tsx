// src/app/return/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

export default function ReturnPage() {
  const [borrows, setBorrows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await fetch('https://https://library-pro-backend-production.up.railway.app/borrows')
        if (!response.ok) throw new Error('ধারের লিস্ট লোড করতে সমস্যা')
        const data = await response.json()
        // শুধু active ধার দেখাবো (যেগুলো এখনো ফেরত দেওয়া হয়নি)
        const activeBorrows = data.filter(b => b.status === 'active')
        setBorrows(activeBorrows)
      } catch (err) {
        setError(err.message)
        toast.error("এরর", { description: err.message })
      } finally {
        setLoading(false)
      }
    }

    fetchBorrows()
  }, [])

  const handleReturn = async (borrowId) => {
    try {
      const response = await fetch(`https://https://library-pro-backend-production.up.railway.app/return/${borrowId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'বই ফেরত দিতে সমস্যা')
      }

      toast.success("সফল!", { description: "বই ফেরত দেওয়া হয়েছে" })

      // লিস্ট রিফ্রেশ
      const updatedBorrows = await fetch('https://https://library-pro-backend-production.up.railway.app/borrows').then(res => res.json())
      const active = updatedBorrows.filter(b => b.status === 'active')
      setBorrows(active)
    } catch (err) {
      toast.error("এরর", { description: err.message })
    }
  }

  if (loading) return <div className="text-center p-10 text-xl text-gray-300">লোড হচ্ছে...</div>
  if (error) return <div className="text-center p-10 text-red-500 text-xl">এরর: {error}</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">বই ফেরত দিন</h1>

      {borrows.length === 0 ? (
        <p className="text-gray-300 text-lg">কোনো চলমান ধার নেই।</p>
      ) : (
        <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">চলমান ধারের লিস্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">বই</TableHead>
                  <TableHead className="text-gray-300">সদস্য</TableHead>
                  <TableHead className="text-gray-300">ধার তারিখ</TableHead>
                  <TableHead className="text-gray-300">ফেরতের শেষ তারিখ</TableHead>
                  <TableHead className="text-gray-300">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrows.map((borrow) => (
                  <TableRow key={borrow.id} className="hover:bg-gray-800/50">
                    <TableCell className="font-medium text-white">{borrow.book_title}</TableCell>
                    <TableCell className="text-gray-200">{borrow.member_name}</TableCell>
                    <TableCell className="text-gray-200">
                      {new Date(borrow.borrow_date).toLocaleDateString('bn-BD')}
                    </TableCell>
                    <TableCell className="text-gray-200">
                      {new Date(borrow.due_date).toLocaleDateString('bn-BD')}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleReturn(borrow.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        ফেরত দিন
                      </Button>
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