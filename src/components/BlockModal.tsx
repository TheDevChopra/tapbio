'use client'

import { useState } from 'react'
import { addBlock, updateBlock } from '@/app/dashboard/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const BLOCK_TYPES = [
  { id: 'link', label: 'Link' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'payment', label: 'Payment' },
  { id: 'booking', label: 'Booking' },
  { id: 'map', label: 'Map Location' }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlockModal({ block, isOpen, onClose }: { block?: any, isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // State for the form
  const [type, setType] = useState(block?.type || 'link')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    formData.append('type', type)
    
    let res;
    if (block?.id) {
      formData.append('id', block.id)
      formData.append('is_active', block.is_active ? 'true' : 'false') // Maintain state
      res = await updateBlock(formData)
    } else {
      res = await addBlock(formData)
    }
    
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    } else {
      setLoading(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-background w-full max-w-md border border-border rounded-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">{block ? 'Edit Block' : 'Add New Block'}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>
        </div>

        <form action={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <Label>Block Type</Label>
            <div className="flex flex-wrap gap-2">
              {BLOCK_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`px-4 py-2 text-sm rounded-xl border transition-all ${
                    type === t.id 
                      ? 'border-foreground bg-foreground text-background' 
                      : 'border-border bg-background hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={block?.title} placeholder="Check out my work" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" name="url" type="url" defaultValue={block?.url} placeholder="https://example.com" required />
            {type === 'whatsapp' && <p className="text-xs text-muted-foreground mt-1">Format: https://wa.me/1234567890</p>}
            {type === 'payment' && <p className="text-xs text-muted-foreground mt-1">Format: upi://pay?pa=... or https://stripe.com/...</p>}
            {type === 'booking' && <p className="text-xs text-muted-foreground mt-1">Format: https://calendly.com/yourname</p>}
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <Button type="submit" variant="primary" className="w-full h-12" disabled={loading}>
            {loading ? 'Saving...' : 'Save Block'}
          </Button>
        </form>
      </div>
    </div>
  )
}
