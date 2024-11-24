import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create a custom getSupabase function that includes the user's JWT
export async function getSupabase() {
  try {
    // Get the Clerk session
    const { getToken } = auth()
    if (!getToken) {
      throw new Error('Not authenticated')
    }

    // Get the JWT token for Supabase
    const token = await getToken({ template: 'supabase' })
    if (token === null || token === undefined) {
      throw new Error('Failed to get Supabase token')
    }

    // Create Supabase client with the token
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  } catch (error) {
    console.error('Error getting Supabase client:', error)
    // Return anonymous client as fallback
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  }
}

// Default client for non-authenticated requests
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})
