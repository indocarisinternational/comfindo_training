"use server"

import { createClient } from "@supabase/supabase-js"

// Create a generic client without attaching browser cookies
// so that signing up a new user doesn't log the current admin out.
const getAnonClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    throw new Error("Missing Supabase credentials")
  }

  return createClient(supabaseUrl, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function createNewAdmin(email: string, password: string) {
  try {
    const supabase = getAnonClient()
    
    // We use standard signUp instead of inviteUserByEmail
    // so it doesn't require SERVICE_ROLE_KEY.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
