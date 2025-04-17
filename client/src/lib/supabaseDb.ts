import { getSupabaseClient } from './supabase';
import type { User, QuizAnswer, Report, Payment, BlogPost } from '@shared/schema';

// Type for responses
interface SupabaseResponse<T> {
  data: T | null;
  error: Error | null;
}

// Helper to ensure proper error handling for Supabase responses
function handleSupabaseResponse<T>(result: { data: T | null, error: any }): SupabaseResponse<T> {
  if (result.error) {
    console.error('Supabase error:', result.error);
    return { data: null, error: new Error(result.error.message || 'An error occurred') };
  }
  return { data: result.data, error: null };
}

// User profile operations
export async function getProfile(userId: string): Promise<SupabaseResponse<User>> {
  try {
    const supabase = getSupabaseClient();
    const result = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error getting profile:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function updateProfile(userId: string, userData: Partial<User>): Promise<SupabaseResponse<User>> {
  try {
    const supabase = getSupabaseClient();
    const result = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select()
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error updating profile:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

// Quiz operations
export async function getQuizAnswers(userId: string): Promise<SupabaseResponse<QuizAnswer>> {
  try {
    const supabase = getSupabaseClient();
    const result = await supabase
      .from('quiz_answers')
      .select('*')
      .eq('userId', userId)
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error getting quiz answers:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function saveQuizAnswers(quizData: Partial<QuizAnswer>): Promise<SupabaseResponse<QuizAnswer>> {
  try {
    const supabase = getSupabaseClient();
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      return { data: null, error: new Error('No authenticated user') };
    }
    
    const userId = session.session.user.id;
    
    // Check if a record already exists
    const { data: existingQuiz } = await supabase
      .from('quiz_answers')
      .select('id')
      .eq('userId', userId)
      .maybeSingle();
    
    let result;
    
    if (existingQuiz) {
      // Update existing quiz
      result = await supabase
        .from('quiz_answers')
        .update({
          ...quizData,
          userId
        })
        .eq('id', existingQuiz.id)
        .select()
        .single();
    } else {
      // Create new quiz
      result = await supabase
        .from('quiz_answers')
        .insert({
          ...quizData,
          userId
        })
        .select()
        .single();
    }
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error saving quiz answers:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

// Report operations
export async function getReport(userId: string): Promise<SupabaseResponse<Report>> {
  try {
    const supabase = getSupabaseClient();
    const result = await supabase
      .from('reports')
      .select('*')
      .eq('userId', userId)
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error getting report:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function createReport(reportData: Partial<Report>): Promise<SupabaseResponse<Report>> {
  try {
    const supabase = getSupabaseClient();
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      return { data: null, error: new Error('No authenticated user') };
    }
    
    const userId = session.session.user.id;
    
    const result = await supabase
      .from('reports')
      .insert({
        ...reportData,
        userId,
        isPaid: false,
        createdAt: new Date().toISOString()
      })
      .select()
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error creating report:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function updateReportPayment(reportId: number, isPaid: boolean): Promise<SupabaseResponse<Report>> {
  try {
    const supabase = getSupabaseClient();
    
    const result = await supabase
      .from('reports')
      .update({ isPaid })
      .eq('id', reportId)
      .select()
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error updating report payment:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

// Payment operations
export async function createPayment(paymentData: Partial<Payment>): Promise<SupabaseResponse<Payment>> {
  try {
    const supabase = getSupabaseClient();
    
    const result = await supabase
      .from('payments')
      .insert({
        ...paymentData,
        createdAt: new Date().toISOString()
      })
      .select()
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error creating payment:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function getPaymentByReportId(reportId: number): Promise<SupabaseResponse<Payment>> {
  try {
    const supabase = getSupabaseClient();
    
    const result = await supabase
      .from('payments')
      .select('*')
      .eq('reportId', reportId)
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error getting payment:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function updatePaymentStatus(paymentId: number, status: string): Promise<SupabaseResponse<Payment>> {
  try {
    const supabase = getSupabaseClient();
    
    const result = await supabase
      .from('payments')
      .update({ status })
      .eq('id', paymentId)
      .select()
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error updating payment status:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

// Blog operations
export async function getAllBlogPosts(): Promise<SupabaseResponse<BlogPost[]>> {
  try {
    const supabase = getSupabaseClient();
    
    const result = await supabase
      .from('blog_posts')
      .select('*')
      .order('createdAt', { ascending: false });
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function getBlogPostById(id: number): Promise<SupabaseResponse<BlogPost>> {
  try {
    const supabase = getSupabaseClient();
    
    const result = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error getting blog post by ID:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<SupabaseResponse<BlogPost>> {
  try {
    const supabase = getSupabaseClient();
    
    const result = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    return handleSupabaseResponse(result);
  } catch (error) {
    console.error('Error getting blog post by slug:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
}