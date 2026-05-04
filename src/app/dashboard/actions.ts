'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function addBlock(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const type = formData.get('type') as string || 'link'

  if (!title || !url) return { error: 'Title and URL are required' }

  const { data: blocks } = await supabase
    .from('blocks')
    .select('sort_order')
    .eq('user_id', user.id)
    .order('sort_order', { ascending: false })
    .limit(1)

  const nextOrder = blocks && blocks.length > 0 ? blocks[0].sort_order + 1 : 0

  const { error } = await supabase.from('blocks').insert({
    user_id: user.id,
    type,
    title,
    url,
    sort_order: nextOrder,
    is_active: true
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
}

export async function updateBlock(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const type = formData.get('type') as string
  const is_active = formData.get('is_active') === 'true'

  if (!id || !title || !url) return { error: 'Missing fields' }

  const { error } = await supabase
    .from('blocks')
    .update({ title, url, type, is_active })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
}

export async function toggleBlockActive(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('blocks')
    .update({ is_active })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
}

export async function updateBlockOrder(updates: { id: string; sort_order: number }[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Supabase JS doesn't have a bulk update helper natively in standard client without an RPC,
  // but we can execute individual updates concurrently since there are usually < 20 blocks.
  const promises = updates.map((update) => 
    supabase
      .from('blocks')
      .update({ sort_order: update.sort_order })
      .eq('id', update.id)
      .eq('user_id', user.id)
  )

  await Promise.all(promises)

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
}

export async function deleteBlock(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('blocks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const full_name = formData.get('full_name') as string
  const bio = formData.get('bio') as string
  const avatar_url = formData.get('avatar_url') as string
  const theme = formData.get('theme') as string || 'light'
  const accent_color = formData.get('accent_color') as string || 'blue'

  const { error } = await supabase
    .from('profiles')
    .update({ 
      full_name, 
      bio, 
      avatar_url, 
      theme, 
      accent_color,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/[username]', 'page')
}
