import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    return res
  }

  // URLの形式を検証
  try {
    new URL(supabaseUrl)
  } catch (error) {
    console.error(`Invalid NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}`)
    return res
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value
          },
          set(name, value, options) {
            res.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name, options) {
            res.cookies.delete({
              name,
              ...options,
            })
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // セッション情報をログ出力（デバッグ用）
    console.log('Middleware Session:', session)
    console.log('Middleware Cookies:', req.cookies.getAll())
  } catch (error) {
    console.error('Error in middleware:', error)
  }

  return res
}
