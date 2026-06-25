import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json()

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('decentralbiz')
    .insert([
      {
        email: body.email || null,
        comment: body.comment,
      },
    ])
    .select()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
