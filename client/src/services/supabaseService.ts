import { createClient, User, Session, PostgrestError } from '@supabase/supabase-js';
import { Report, QuizAnswer, BlogPost } from '@shared/schema';

// Singleton client instance
let supabaseClient: ReturnType<typeof createClient> | null = null;

/**
 * Initialize Supabase client
 */
export const initSupabase = async () => {
  try {
    // If already initialized, return existing client
    if (supabaseClient) return supabaseClient;

    // Get Supabase config from server
    const response = await fetch('/api/supabase-config');
    if (!response.ok) {
      throw new Error(`Failed to fetch Supabase config: ${response.status} ${response.statusText}`);
    }
    
    const config = await response.json();
    if (!config.initialized || !config.url || !config.anonKey) {
      throw new Error('Missing Supabase configuration');
    }

    // Create Supabase client
    supabaseClient = createClient(config.url, config.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      }
    });

    console.log('Supabase service initialized successfully');
    return supabaseClient;
  } catch (error) {
    console.error('Error initializing Supabase service:', error);
    throw error;
  }
};

/**
 * Auth Services
 */
export const authService = {
  /**
   * Get the current Supabase client
   */
  getClient: async () => {
    if (!supabaseClient) {
      return await initSupabase();
    }
    return supabaseClient;
  },

  /**
   * Get the current session
   */
  getSession: async (): Promise<Session | null> => {
    const supabase = await authService.getClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return data.session;
  },

  /**
   * Get the current user
   */
  getCurrentUser: async (): Promise<User | null> => {
    const supabase = await authService.getClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting current user:', error);
      return null;
    }
    return data.user;
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    const supabase = await authService.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error signing in:', error);
      return { user: null, session: null, error };
    }

    return { user: data.user, session: data.session, error: null };
  },

  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string, userData?: any) => {
    const supabase = await authService.getClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth?verification=success`
      }
    });

    if (error) {
      console.error('Error signing up:', error);
      return { user: null, session: null, error };
    }

    return { user: data.user, session: data.session, error: null };
  },

  /**
   * Sign out
   */
  signOut: async () => {
    const supabase = await authService.getClient();
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Reset password
   */
  resetPassword: async (email: string) => {
    const supabase = await authService.getClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?reset-password=true`,
    });
    return { error };
  },

  /**
   * Update password
   */
  updatePassword: async (password: string) => {
    const supabase = await authService.getClient();
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  }
};

/**
 * User Services
 */
export const userService = {
  /**
   * Get user by ID
   */
  getUserById: async (userId: string) => {
    const supabase = await authService.getClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error getting user:', error);
      return { user: null, error };
    }

    return { user: data, error: null };
  },

  /**
   * Ensure a user exists in the users table
   */
  ensureUserExists: async (authUser: User) => {
    if (!authUser.email) {
      console.error('User has no email in ensureUserExists');
      return { error: new Error('User has no email') };
    }

    try {
      const supabase = await authService.getClient();
      
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id, email')
        .eq('id', authUser.id)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error checking if user exists:', checkError);
        return { error: checkError };
      }
      
      // If user doesn't exist, create them
      if (!existingUser) {
        console.log('User not found in database, creating:', authUser.email);
        
        // Extract user metadata (if any)
        const metadata = authUser.user_metadata || {};
        
        // Create a new user record
        const { data, error: insertError } = await supabase
          .from('users')
          .insert({
            id: authUser.id,
            email: authUser.email,
            username: metadata.username || authUser.email.split('@')[0],
            full_name: metadata.full_name || '',
            phone_number: metadata.phone || '',
            is_verified: authUser.email_confirmed_at ? true : false,
            created_at: new Date().toISOString()
          })
          .select()
          .single();
          
        if (insertError) {
          console.error('Error creating user:', insertError);
          return { user: null, error: insertError };
        }
        
        console.log('Successfully created user in database');
        return { user: data, error: null };
      } else {
        console.log('User already exists in database:', existingUser.email);
        return { user: existingUser, error: null };
      }
    } catch (error) {
      console.error('Error in ensureUserExists:', error);
      return { user: null, error };
    }
  },

  /**
   * Get the current user's profile
   */
  getCurrentUserProfile: async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) return { profile: null, error: new Error('No authenticated user') };
      
      return await userService.getUserById(user.id);
    } catch (error) {
      console.error('Error in getCurrentUserProfile:', error);
      return { user: null, error };
    }
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (userId: string, profileData: any) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('users')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user profile:', error);
      return { user: null, error };
    }
    
    return { user: data, error: null };
  }
};

/**
 * Quiz Services
 */
export const quizService = {
  /**
   * Get user's quiz answers
   */
  getQuizAnswers: async (userId: string) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('quiz_answers')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching quiz answers:', error);
      return { quizAnswers: null, error };
    }
    
    return { quizAnswers: data as QuizAnswer, error: null };
  },

  /**
   * Get current user's quiz answers
   */
  getCurrentUserQuizAnswers: async () => {
    const user = await authService.getCurrentUser();
    if (!user) return { quizAnswers: null, error: new Error('No authenticated user') };
    
    return await quizService.getQuizAnswers(user.id);
  },

  /**
   * Save quiz answers
   */
  saveQuizAnswers: async (userId: string, answers: any, completed: boolean = false) => {
    try {
      const supabase = await authService.getClient();
      
      // Check if user already has answers
      const { quizAnswers } = await quizService.getQuizAnswers(userId);
      
      if (quizAnswers) {
        // Update existing answers
        const { data, error } = await supabase
          .from('quiz_answers')
          .update({
            answers,
            completed,
            completed_at: completed ? new Date().toISOString() : null
          })
          .eq('id', quizAnswers.id)
          .select()
          .single();
          
        if (error) {
          console.error('Error updating quiz answers:', error);
          return { quizAnswers: null, error };
        }
        
        return { quizAnswers: data as QuizAnswer, error: null };
      } else {
        // Create new answers
        const { data, error } = await supabase
          .from('quiz_answers')
          .insert({
            user_id: userId,
            answers,
            completed,
            started_at: new Date().toISOString(),
            completed_at: completed ? new Date().toISOString() : null
          })
          .select()
          .single();
          
        if (error) {
          console.error('Error creating quiz answers:', error);
          return { quizAnswers: null, error };
        }
        
        return { quizAnswers: data as QuizAnswer, error: null };
      }
    } catch (error) {
      console.error('Error in saveQuizAnswers:', error);
      return { quizAnswers: null, error };
    }
  },

  /**
   * Save current user's quiz answers
   */
  saveCurrentUserQuizAnswers: async (answers: any, completed: boolean = false) => {
    const user = await authService.getCurrentUser();
    if (!user) return { quizAnswers: null, error: new Error('No authenticated user') };
    
    return await quizService.saveQuizAnswers(user.id, answers, completed);
  }
};

/**
 * Report Services
 */
export const reportService = {
  /**
   * Get user's report
   */
  getReport: async (userId: string) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching report:', error);
      return { report: null, error };
    }
    
    return { report: data as Report, error: null };
  },

  /**
   * Get current user's report
   */
  getCurrentUserReport: async () => {
    const user = await authService.getCurrentUser();
    if (!user) return { report: null, error: new Error('No authenticated user') };
    
    return await reportService.getReport(user.id);
  },

  /**
   * Create a report
   */
  createReport: async (userId: string, quizId: number, report: any, compatibilityColor: string) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        report,
        compatibility_color: compatibilityColor,
        is_paid: false,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating report:', error);
      return { report: null, error };
    }
    
    return { report: data as Report, error: null };
  },

  /**
   * Create a report for the current user
   */
  createCurrentUserReport: async (quizId: number, report: any, compatibilityColor: string) => {
    const user = await authService.getCurrentUser();
    if (!user) return { report: null, error: new Error('No authenticated user') };
    
    return await reportService.createReport(user.id, quizId, report, compatibilityColor);
  },

  /**
   * Update report payment status
   */
  updateReportPaymentStatus: async (reportId: number, isPaid: boolean) => {
    const supabase = await authService.getClient();
    
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
  }
};

/**
 * Blog Services
 */
export const blogService = {
  /**
   * Get all blog posts
   */
  getAllPosts: async () => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published_at', 'is not null')
      .order('published_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching blog posts:', error);
      return { posts: [], error };
    }
    
    return { posts: data as BlogPost[], error: null };
  },

  /**
   * Get blog post by ID
   */
  getPostById: async (id: number) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching blog post:', error);
      return { post: null, error };
    }
    
    return { post: data as BlogPost, error: null };
  },

  /**
   * Get blog post by slug
   */
  getPostBySlug: async (slug: string) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error fetching blog post by slug:', error);
      return { post: null, error };
    }
    
    return { post: data as BlogPost, error: null };
  }
};

/**
 * Payment Services
 */
export const paymentService = {
  /**
   * Create a payment
   */
  createPayment: async (userId: string, reportId: number, amount: number) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        report_id: reportId,
        amount,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating payment:', error);
      return { payment: null, error };
    }
    
    return { payment: data, error: null };
  },

  /**
   * Update payment status
   */
  updatePaymentStatus: async (paymentId: number, status: string, razorpayPaymentId?: string) => {
    const supabase = await authService.getClient();
    
    const updateData: any = { status };
    if (razorpayPaymentId) {
      updateData.razorpay_payment_id = razorpayPaymentId;
    }
    
    const { data, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', paymentId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating payment status:', error);
      return { payment: null, error };
    }
    
    return { payment: data, error: null };
  },

  /**
   * Get payment by report ID
   */
  getPaymentByReportId: async (reportId: number) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('report_id', reportId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching payment:', error);
      return { payment: null, error };
    }
    
    return { payment: data, error: null };
  }
};

/**
 * Storage Services
 */
export const storageService = {
  /**
   * Upload a file
   */
  uploadFile: async (bucket: string, path: string, file: File) => {
    const supabase = await authService.getClient();
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (error) {
      console.error('Error uploading file:', error);
      return { path: null, error };
    }
    
    return { path: data.path, error: null };
  },

  /**
   * Get a public URL for a file
   */
  getPublicUrl: async (bucket: string, path: string) => {
    const supabase = await authService.getClient();
    
    const { data } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(path);
      
    return data.publicUrl;
  },

  /**
   * Delete a file
   */
  deleteFile: async (bucket: string, path: string) => {
    const supabase = await authService.getClient();
    
    const { error } = await supabase
      .storage
      .from(bucket)
      .remove([path]);
      
    if (error) {
      console.error('Error deleting file:', error);
      return { error };
    }
    
    return { error: null };
  }
};

// Initialize Supabase on module import
initSupabase().catch(err => {
  console.error('Failed to initialize Supabase service:', err);
});

// Export a default object with all services
export default {
  auth: authService,
  user: userService,
  quiz: quizService,
  report: reportService,
  blog: blogService,
  payment: paymentService,
  storage: storageService,
};