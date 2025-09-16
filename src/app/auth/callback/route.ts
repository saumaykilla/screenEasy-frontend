import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user?.id) {
      const userId = data.user.id
      
      // Check if user has a practitioner profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      // Handle database errors (except "no rows returned" which is expected)
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error checking practitioner profile:', profileError)
        return NextResponse.redirect(`${origin}/auth/error?error=Database error occurred`)
      }
      
      // Determine redirect based on whether practitioner profile exists
      let next: string
      if (profileData) {
        // User has a practitioner profile, redirect to demo
        next = '/dashboard'
      } else {
        // User doesn't have a practitioner profile, redirect to onboarding
        next = '/onboarding'
      }
      
      // Handle redirect with proper host detection
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // Local development - no load balancer
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // Production with load balancer
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        // Production without load balancer
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}