import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabaseConfig';

// We'll use the supabase client from our new supabaseConfig helper
let supabase: SupabaseClient;
let clientPromise: Promise<SupabaseClient>;

// Initialize the client when imported
clientPromise = (async () => {
  try {
    // Get the client from the shared implementation that uses server-provided credentials
    supabase = await getSupabaseClient();
    console.log('directSupabaseService: Using server-configured Supabase client');
    return supabase;
  } catch (error) {
    console.error('directSupabaseService: Failed to initialize Supabase client', error);
    throw error;
  }
})();

// Authentication service
export const auth = {
  // Get the supabase client
  getClient: (): SupabaseClient => {
    return supabase;
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  // Sign up with email and password
  signUp: async (email: string, password: string, userData?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: userData }
    });
  },
  
  // Verify OTP code
  verifyOtp: async (email: string, token: string) => {
    return await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });
  },

  // Sign out
  signOut: async () => {
    // Clear browser storage and cookies first
    localStorage.removeItem("supabase.auth.token");
    localStorage.removeItem("supabase.auth.expires_at");
    document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Then sign out from Supabase
    return await supabase.auth.signOut();
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return data?.session || null;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return data?.user || null;
  },

  // Reset password
  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  },

  // Update password
  updatePassword: async (password: string) => {
    return await supabase.auth.updateUser({ password });
  },
};

// User service
export const user = {
  // Get user by ID
  getUserById: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { user: data, error };
  },

  // Get user by email
  getUserByEmail: async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    return { user: data, error };
  },

  // Ensure user exists in the users table (create if not)
  ensureUserExists: async (authUser: any) => {
    // First check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      // Error other than "no rows returned"
      return { user: null, error: checkError };
    }
    
    if (existingUser) {
      // User exists, return it
      return { user: existingUser, error: null };
    }
    
    // User doesn't exist, create it
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{
        id: authUser.id,
        email: authUser.email,
        username: authUser.email?.split('@')[0] || '',
        full_name: authUser.user_metadata?.full_name || '',
        phone_number: authUser.phone || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();
    
    return { user: newUser, error: createError };
  },

  // Update user profile
  updateUserProfile: async (userId: string, userData: any) => {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...userData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
    
    return { user: data, error };
  },
};

// Quiz service
export const quiz = {
  // Get quiz answers for a user
  getQuizAnswers: async (client: SupabaseClient, userId: string) => {
    console.log('Fetching quiz answers for user ID:', userId);
    console.log('Fetching quiz answers with ID:', userId);
    
    try {
      const { data, error } = await client
        .from('quiz_answers')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching quiz answers:', error);
        return null;
      }
      
      // If we have quiz answers, format them for the frontend
      if (data) {
        return {
          id: data.id,
          userId: data.user_id,
          answers: data.answers,
          completed: data.completed,
          startedAt: data.created_at,
          completedAt: data.updated_at
        };
      }
      
      return null;
    } catch (error) {
      console.error('Exception fetching quiz answers:', error);
      return null;
    }
  },
  
  // Create or update quiz answers
  saveQuizAnswers: async (client: SupabaseClient, userId: string, answers: any, completed: boolean = false) => {
    try {
      // First check if the user already has quiz answers
      const { data: existingAnswers } = await client
        .from('quiz_answers')
        .select('id')
        .eq('user_id', userId)
        .limit(1)
        .single();
      
      // If the user already has answers, update them
      if (existingAnswers) {
        const { data, error } = await client
          .from('quiz_answers')
          .update({
            answers,
            completed,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingAnswers.id)
          .select()
          .single();
        
        if (error) {
          console.error('Error updating quiz answers:', error);
          return { success: false, error };
        }
        
        return { 
          success: true, 
          quizAnswer: {
            id: data.id,
            userId: data.user_id,
            answers: data.answers,
            completed: data.completed,
            startedAt: data.created_at,
            completedAt: data.updated_at
          }
        };
      }
      
      // Otherwise create new answers
      const { data, error } = await client
        .from('quiz_answers')
        .insert([{
          user_id: userId,
          answers,
          completed,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating quiz answers:', error);
        return { success: false, error };
      }
      
      return { 
        success: true, 
        quizAnswer: {
          id: data.id,
          userId: data.user_id,
          answers: data.answers,
          completed: data.completed,
          startedAt: data.created_at,
          completedAt: data.updated_at
        }
      };
    } catch (error) {
      console.error('Exception saving quiz answers:', error);
      return { success: false, error };
    }
  }
};

// Report service
export const report = {
  // Get report by ID
  getReport: async (client: SupabaseClient, userId: string) => {
    console.log('Fetching report for user ID:', userId);
    console.log('Fetching report with ID:', userId);
    
    try {
      const { data, error } = await client
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching report:', error);
        return null;
      }
      
      if (data) {
        return {
          id: data.id,
          userId: data.user_id,
          quizId: data.quiz_id,
          report: data.report,
          compatibilityColor: data.compatibility_color,
          isPaid: data.is_paid,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
      }
      
      return null;
    } catch (error) {
      console.error('Exception fetching report:', error);
      return null;
    }
  },
  
  // Create a report
  createReport: async (client: SupabaseClient, reportData: any) => {
    try {
      const { data, error } = await client
        .from('reports')
        .insert([{
          user_id: reportData.userId,
          quiz_id: reportData.quizId,
          report: reportData.report,
          compatibility_color: reportData.compatibilityColor,
          is_paid: reportData.isPaid || true, // Reports are now free
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating report:', error);
        return { success: false, error };
      }
      
      return { 
        success: true, 
        report: {
          id: data.id,
          userId: data.user_id,
          quizId: data.quiz_id,
          report: data.report,
          compatibilityColor: data.compatibility_color,
          isPaid: data.is_paid,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        }
      };
    } catch (error) {
      console.error('Exception creating report:', error);
      return { success: false, error };
    }
  }
};

// Export all services
const directSupabaseService = {
  auth,
  user,
  quiz,
  report
};

export default directSupabaseService;