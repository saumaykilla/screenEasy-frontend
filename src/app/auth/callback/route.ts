import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    
    try {
      const { error, data } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error && data.user?.id) {
        // Give the session a moment to be established
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Check if user has a profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', data.user.id)
          .single()
        
        // Handle database errors (except "no rows returned" which is expected)
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking profile:', profileError)
          return NextResponse.redirect(`${origin}/?error=Database error occurred`)
        }
        
        // Determine redirect based on whether profile exists
        let redirectPath: string
        if (profileData) {
          redirectPath = '/dashboard'
        } else {
          redirectPath = '/onboarding'
        }
        
        // Redirect to the appropriate page
        return NextResponse.redirect(`${origin}${redirectPath}`)
      }
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/?error=Authentication failed`)
    }
  }

  // Return to home page with error
  return NextResponse.redirect(`${origin}/?error=Invalid auth code`)
}