'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Profile {
  full_name: string
  bio: string
  avatar_url: string
  theme: string
  accent_color: string
}

export function SettingsForm({ profile }: { profile: Profile }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  const [theme, setTheme] = useState(profile.theme || 'light')
  const [accent, setAccent] = useState(profile.accent_color || 'blue')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setMessage(null)
    formData.append('theme', theme)
    formData.append('accent_color', accent)
    
    const res = await updateProfile(formData)
    
    if (res?.error) {
      setMessage({ text: res.error, type: 'error' })
    } else {
      setMessage({ text: 'Profile updated successfully!', type: 'success' })
    }
    setLoading(false)
  }

  return (
    <div className="bg-background border border-border rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-6">Profile Settings</h3>
      
      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Display Name</Label>
            <Input id="full_name" name="full_name" defaultValue={profile.full_name || ''} placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea 
              id="bio" 
              name="bio" 
              defaultValue={profile.bio || ''} 
              className="flex w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-none h-24 transition-all"
              placeholder="Tell your audience about yourself..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url">Avatar Image URL</Label>
            <Input id="avatar_url" name="avatar_url" type="url" defaultValue={profile.avatar_url || ''} placeholder="https://..." />
            <p className="text-xs text-muted-foreground">Provide a link to an image. (e.g. your Twitter avatar)</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Appearance</h4>
          
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${theme === 'light' ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted text-muted-foreground'}`}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${theme === 'dark' ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted text-muted-foreground'}`}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setAccent('blue')}
                className={`w-10 h-10 rounded-full bg-blue-600 ring-offset-2 transition-all ${accent === 'blue' ? 'ring-2 ring-foreground' : ''}`}
                aria-label="Blue"
              />
              <button
                type="button"
                onClick={() => setAccent('purple')}
                className={`w-10 h-10 rounded-full bg-purple-600 ring-offset-2 transition-all ${accent === 'purple' ? 'ring-2 ring-foreground' : ''}`}
                aria-label="Purple"
              />
              <button
                type="button"
                onClick={() => setAccent('black')}
                className={`w-10 h-10 rounded-full bg-black ring-offset-2 transition-all ${accent === 'black' ? 'ring-2 ring-gray-400' : ''}`}
                aria-label="Black"
              />
            </div>
          </div>
        </div>

        {message && (
          <p className={`text-sm font-medium ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message.text}
          </p>
        )}

        <Button type="submit" variant="primary" className="w-full h-12" disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  )
}
