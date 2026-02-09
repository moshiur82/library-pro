// src/app/members/add/page.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export default function AddMemberPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !email) {
      toast.error("এরর", { description: "নাম এবং ইমেইল দরকার" })
      return
    }

    try {
      const response = await fetch('http://https://library-pro-backend-production.up.railway.app/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'সদস্য যোগ করতে সমস্যা')
      }

      toast.success("সফল!", { description: "নতুন সদস্য যোগ হয়েছে" })

      // ফর্ম রিসেট
      setName('')
      setEmail('')
      setPhone('')
      setAddress('')

      // সদস্য লিস্ট পেজে ফিরে যাও
      router.push('/members')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'কোনো সমস্যা হয়েছে'
      toast.error("এরর", { description: errorMessage })
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">নতুন সদস্য যোগ করুন</h1>

      <Card className="bg-gray-900/80 backdrop-blur-md border-gray-800 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-white">সদস্যের তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-300">নাম *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">ইমেইল *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-300">ফোন</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-300">ঠিকানা</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              সদস্য যোগ করুন
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}