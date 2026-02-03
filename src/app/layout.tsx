// src/app/members/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'

// সদস্যের টাইপ ডিফাইন করলাম
interface Member {
  id: number
  name: string
  email: string
  phone: string | null
  address: string | null
  join_date: string
  created_at: string
  updated_at: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/members')
        if (!response.ok) {
          throw new Error('সদস্য লিস্ট লোড করতে সমস্যা')
        }

        const data: Member[] = await response.json()
        setMembers(data)
      } catch (err: unknown) {
        // এখানে সেফ চেক যোগ করলাম
        const errorMessage = err instanceof Error ? err.message : 'সদস্য লিস্ট লোড করতে সমস্যা'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  if (loading) return <div className="text-center p-10 text-xl text-gray-300">লোড হচ্ছে...</div>
  if (error) return <div className="text-center p-10 text-red-500 text-xl">এরর: {error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">সব সদস্য</h1>
        <Link href="/members/add">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            নতুন সদস্য যোগ করুন
          </Button>
        </Link>
      </div>

      {members.length === 0 ? (
        <p className="text-gray-300 text-lg">কোনো সদস্য এখনো যোগ করা হয়নি।</p>
      ) : (
        <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">সদস্যের লিস্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">নাম</TableHead>
                  <TableHead className="text-gray-300">ইমেইল</TableHead>
                  <TableHead className="text-gray-300">ফোন</TableHead>
                  <TableHead className="text-gray-300">ঠিকানা</TableHead>
                  <TableHead className="text-gray-300">জয়েন তারিখ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-800/50">
                    <TableCell className="font-medium text-white">{member.name}</TableCell>
                    <TableCell className="text-gray-200">{member.email}</TableCell>
                    <TableCell className="text-gray-200">{member.phone || '-'}</TableCell>
                    <TableCell className="text-gray-200">{member.address || '-'}</TableCell>
                    <TableCell className="text-gray-200">
                      {new Date(member.join_date).toLocaleDateString('bn-BD')}
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