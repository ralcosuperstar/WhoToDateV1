import { User, Session, PostgrestError } from '@supabase/supabase-js';
import { Report, QuizAnswer, BlogPost } from '@shared/schema';
import { getSupabaseClient } from '@/lib/supabase';

/**
 * Initialize Supabase client - uses singleton pattern from lib/supabase.ts
 */
export const initSupabase = async () => {
  try {
    return await getSupabaseClient();
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
    return await getSupabaseClient();
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
   * Get user by email address
   */
  getUserByEmail: async (supabase: any, email: string) => {
    try {
      console.log('Fetching user by email:', email);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error getting user by email:', error);
        return null;
      }

      console.log('Found user by email:', data);
      return data;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return null;
    }
  },
  
  /**
   * Get database integer ID from auth user (useful for solving ID format inconsistencies)
   */
  getDatabaseUserId: async (authUser: User): Promise<number | null> => {
    if (!authUser.email) {
      console.error('User has no email when getting database ID');
      return null;
    }
    
    try {
      const supabase = await authService.getClient();
      
      // Find user in database by email (which should be unique)
      const user = await userService.getUserByEmail(supabase, authUser.email);
      
      if (!user) {
        console.error('Could not find database user ID for auth user');
        return null;
      }
      
      console.log('Using database user ID:', user.id, 'for auth user:', authUser.email);
      
      // Return the database ID as an integer
      if (typeof user.id === 'number') {
        return user.id;
      } else if (typeof user.id === 'string') {
        try {
          return parseInt(user.id, 10);
        } catch (e) {
          console.error('Failed to parse user ID as integer:', user.id);
          return null;
        }
      } else {
        console.error('User ID is not a number or string:', user.id);
        return null;
      }
    } catch (error) {
      console.error('Error getting database user ID:', error);
      return null;
    }
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
  getQuizAnswers: async (supabase: any, userId: string) => {
    console.log('Fetching quiz answers for user ID:', userId);
    
    try {
      // First, try to fetch by user ID directly
      const { data, error } = await supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching quiz answers by userId directly:', error);
      } else if (data) {
        console.log('Successfully found quiz answers');
        return data as QuizAnswer;
      }
      
      // If not found, try to fetch user by email first to get integer ID
      const authUser = await authService.getCurrentUser();
      if (authUser && authUser.email) {
        console.log('Trying to get database user by email');
        const dbUser = await userService.getUserByEmail(supabase, authUser.email);
        
        if (dbUser && dbUser.id) {
          console.log('Found database user ID:', dbUser.id);
          
          // Try again with the database user ID
          const { data: quizData, error: quizError } = await supabase
            .from('quiz_answers')
            .select('*')
            .eq('user_id', dbUser.id)
            .single();
            
          if (quizError && quizError.code !== 'PGRST116') {
            console.error('Error fetching quiz answers with database ID:', quizError);
          } else if (quizData) {
            console.log('Found quiz answers with database ID');
            return quizData as QuizAnswer;
          }
        }
      }
      
      console.log('No quiz answers found for user');
      return null;
    } catch (error) {
      console.error('Error in getQuizAnswers:', error);
      return null;
    }
  },

  /**
   * Get quiz by user ID (alias for getQuizAnswers to match function name used in Results.tsx)
   */
  getQuizByUserId: async (supabase: any, userId: string) => {
    return await quizService.getQuizAnswers(supabase, userId);
  },

  /**
   * Get current user's quiz answers
   */
  getCurrentUserQuizAnswers: async () => {
    const supabase = await authService.getClient();
    const user = await authService.getCurrentUser();
    if (!user) return null;
    
    return await quizService.getQuizAnswers(supabase, user.id);
  },

  /**
   * Save quiz answers
   */
  saveQuizAnswers: async (supabase: any, userId: string, answers: any, completed: boolean = false) => {
    try {
      // Check if user already has answers
      const existingQuiz = await quizService.getQuizAnswers(supabase, userId);
      
      if (existingQuiz) {
        // Update existing answers
        const { data, error } = await supabase
          .from('quiz_answers')
          .update({
            answers,
            completed,
            completed_at: completed ? new Date().toISOString() : null
          })
          .eq('id', existingQuiz.id)
          .select()
          .single();
          
        if (error) {
          console.error('Error updating quiz answers:', error);
          return null;
        }
        
        return data as QuizAnswer;
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
          return null;
        }
        
        return data as QuizAnswer;
      }
    } catch (error) {
      console.error('Error in saveQuizAnswers:', error);
      return null;
    }
  },

  /**
   * Save current user's quiz answers
   */
  saveCurrentUserQuizAnswers: async (answers: any, completed: boolean = false) => {
    const supabase = await authService.getClient();
    const user = await authService.getCurrentUser();
    if (!user) return null;
    
    return await quizService.saveQuizAnswers(supabase, user.id, answers, completed);
  }
};

/**
 * Report Services
 */
export const reportService = {
  /**
   * Get user's report
   */
  getReport: async (supabase: any, userId: string) => {
    console.log('Fetching report for user ID:', userId);
    
    try {
      // First, try to fetch by user ID directly
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching report by userId directly:', error);
      } else if (data) {
        console.log('Successfully found report');
        return data as Report;
      }
      
      // If not found, try to fetch user by email first to get integer ID
      const authUser = await authService.getCurrentUser();
      if (authUser && authUser.email) {
        console.log('Trying to get database user by email');
        const dbUser = await userService.getUserByEmail(supabase, authUser.email);
        
        if (dbUser && dbUser.id) {
          console.log('Found database user ID:', dbUser.id);
          
          // Try again with the database user ID
          const { data: reportData, error: reportError } = await supabase
            .from('reports')
            .select('*')
            .eq('user_id', dbUser.id)
            .single();
            
          if (reportError && reportError.code !== 'PGRST116') {
            console.error('Error fetching report with database ID:', reportError);
          } else if (reportData) {
            console.log('Found report with database ID');
            return reportData as Report;
          }
        }
      }
      
      console.log('No report found for user');
      return null;
    } catch (error) {
      console.error('Error in getReport:', error);
      return null;
    }
  },

  /**
   * Get report by user ID
   */
  getReportByUserId: async (supabase: any, userId: string) => {
    return await reportService.getReport(supabase, userId);
  },

  /**
   * Get current user's report
   */
  getCurrentUserReport: async () => {
    const supabase = await authService.getClient();
    const user = await authService.getCurrentUser();
    if (!user) return null;
    
    return await reportService.getReport(supabase, user.id);
  },

  /**
   * Create a report
   */
  createReport: async (supabase: any, data: {
    userId: string;
    quizId: number;
    report: any;
    compatibilityColor: string;
    isPaid: boolean;
  }) => {
    console.log('Creating report with data:', data);
    try {
      // Make sure we have a valid user ID by checking if it's a number
      let userId = data.userId;
      
      // If the userId is a UUID (from auth), get the database user ID by email
      if (typeof userId === 'string' && userId.includes('-')) {
        console.log('Detected UUID user ID, fetching database user instead');
        
        // Get the auth user
        const authUser = await authService.getCurrentUser();
        if (authUser && authUser.email) {
          const dbUser = await userService.getUserByEmail(supabase, authUser.email);
          
          if (dbUser && dbUser.id) {
            console.log('Found database user ID:', dbUser.id);
            userId = dbUser.id;
          } else {
            console.error('Could not find database user for auth user');
            return null;
          }
        } else {
          console.error('Auth user not found or has no email');
          return null;
        }
      }
      
      // Convert field names to snake_case for Supabase
      const { data: createdReport, error } = await supabase
        .from('reports')
        .insert({
          user_id: userId,
          quiz_id: data.quizId,
          report: data.report,
          compatibility_color: data.compatibilityColor,
          is_paid: data.isPaid,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (error) {
        console.error('Error creating report:', error);
        return null;
      }
      
      console.log('Successfully created report:', createdReport);
      return createdReport as Report;
    } catch (error) {
      console.error('Error in createReport:', error);
      return null;
    }
  },

  /**
   * Create a report for the current user
   */
  createCurrentUserReport: async (quizId: number, report: any, compatibilityColor: string) => {
    const supabase = await authService.getClient();
    const user = await authService.getCurrentUser();
    if (!user) return null;
    
    return await reportService.createReport(supabase, {
      userId: user.id,
      quizId,
      report,
      compatibilityColor,
      isPaid: false
    });
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