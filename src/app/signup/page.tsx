'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const res = await signup(formData)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md bg-background border border-border rounded-3xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-10 h-10 bg-foreground rounded-xl mx-auto flex items-center justify-center">
              <div className="w-3 h-3 bg-background rounded-full" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Create your TapBio</h1>
          <p className="text-muted-foreground mt-2">Claim your unique link today.</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-muted-foreground">tapb.io/</span>
              <Input 
                id="username" 
                name="username" 
                type="text" 
                className="pl-16" 
                placeholder="username" 
                required 
                pattern="[a-zA-Z0-9_-]+" 
                title="Only letters, numbers, underscores, and dashes are allowed."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} />
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}

          <Button type="submit" variant="primary" className="w-full h-12 mt-4" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-foreground font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
