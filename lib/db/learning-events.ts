import { getSupabase } from '@/lib/supabase'
import { type LearningEvent } from '@/types/learning'

interface LearningEventStats {
  type: string;
  subject: string;
  count: number;
  first_event: string;
  last_event: string;
}

export class LearningEventsDB {
  static async create(event: Omit<LearningEvent, 'id'>) {
    const supabase = await getSupabase()
    
    const { data, error } = await supabase
      .from('learning_events')
      .insert([{
        clerk_user_id: event.userId,
        type: event.type,
        subject: event.subject,
        content: event.content,
        timestamp: event.timestamp.toISOString(),
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getByUserId(userId: string, options?: {
    limit?: number
    offset?: number
    type?: LearningEvent['type']
    subject?: string
    fromDate?: Date
    toDate?: Date
  }) {
    const supabase = await getSupabase()
    
    let query = supabase
      .from('learning_events')
      .select('*')
      .eq('clerk_user_id', userId)
      .order('timestamp', { ascending: false })

    if (options?.type) {
      query = query.eq('type', options.type)
    }
    
    if (options?.subject) {
      query = query.eq('subject', options.subject)
    }
    
    if (options?.fromDate) {
      query = query.gte('timestamp', options.fromDate.toISOString())
    }
    
    if (options?.toDate) {
      query = query.lte('timestamp', options.toDate.toISOString())
    }
    
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }

  static async getRecentByUserId(userId: string, limit = 10) {
    return this.getByUserId(userId, { limit })
  }

  static async getStats(userId: string) {
    const supabase = await getSupabase()
    
    const query = supabase
      .from('learning_events')
      .select('type, subject, count(*), min(timestamp) as first_event, max(timestamp) as last_event')
      .eq('clerk_user_id', userId)

    // @ts-ignore - group by is supported but types are not up to date
    const { data, error } = await query.groupBy('type,subject')

    if (error) throw error
    return data as LearningEventStats[]
  }
}
