import { getSupabaseClient } from '@/lib/supabase';
import type { Report } from '@shared/schema';

/**
 * Report Services - Direct Supabase Implementation
 */
export const reportService = {
  /**
   * Get report by user ID
   */
  getReport: async (userId: string) => {
    try {
      const supabase = getSupabaseClient();
      console.log('Fetching report for user:', userId);
      
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching report from Supabase:', error);
        return { report: null, error };
      }
      
      console.log('Report fetched from Supabase:', data);
      return { report: data as Report, error: null };
    } catch (error) {
      console.error('Exception in getReport service:', error);
      return { 
        report: null, 
        error: error instanceof Error ? error : new Error('Unknown error in getReport')
      };
    }
  },

  /**
   * Get report by report ID
   */
  getReportById: async (reportId: number) => {
    try {
      const supabase = getSupabaseClient();
      
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', reportId)
        .single();
        
      if (error) {
        console.error('Error fetching report by ID:', error);
        return { report: null, error };
      }
      
      return { report: data as Report, error: null };
    } catch (error) {
      console.error('Exception in getReportById service:', error);
      return { 
        report: null, 
        error: error instanceof Error ? error : new Error('Unknown error in getReportById')
      };
    }
  },

  /**
   * Update report payment status
   */
  updateReportPaymentStatus: async (reportId: number, isPaid: boolean) => {
    try {
      const supabase = getSupabaseClient();
      
      const { data, error } = await supabase
        .from('reports')
        .update({ is_paid: isPaid })
        .eq('id', reportId)
        .select()
        .single();
        
      if (error) {
        console.error('Error updating report payment status:', error);
        return { report: null, error };
      }
      
      return { report: data as Report, error: null };
    } catch (error) {
      console.error('Exception in updateReportPaymentStatus service:', error);
      return { 
        report: null, 
        error: error instanceof Error ? error : new Error('Unknown error in updateReportPaymentStatus')
      };
    }
  }
};