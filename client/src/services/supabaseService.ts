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

      // We found the user, but we need to ensure we're returning the database
      // integer ID and not using a string that might be parsed incorrectly
      if (data) {
        // Make sure the returned ID is a numeric database ID
        const numericId = typeof data.id === 'number' ? 
          data.id : 
          (typeof data.id === 'string' ? parseInt(data.id, 10) : null);
          
        console.log('Found user by email with database ID:', numericId);
        
        if (numericId === null || isNaN(numericId)) {
          console.error('Invalid user ID format from database:', data.id);
          return null;
        }
        
        return {
          ...data,
          id: numericId
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return null;
    }
  },
  
  /**
   * Get database integer ID from auth user (useful for solving ID format inconsistencies)
   */
  getDatabaseUserId: async (authUser: User): Promise<number | null> => {
    if (!authUser || !authUser.email) {
      console.error('User has no email when getting database ID');
      return null;
    }
    
    try {
      console.log('Getting database ID for auth user:', authUser.email);
      const supabase = await authService.getClient();
      
      // Find user in database by email (which should be unique)
      const user = await userService.getUserByEmail(supabase, authUser.email);
      
      if (!user) {
        console.error('Could not find database user ID for auth user');
        return null;
      }
      
      // At this point user.id should already be a number due to the fix in getUserByEmail
      console.log('Found database user ID:', user.id, 'for auth user:', authUser.email);
      
      // Ensure the ID is a number and return it
      if (typeof user.id === 'number') {
        return user.id;
      } else {
        console.error('User ID is not a number after conversion:', user.id);
        return null;
      }
    } catch (error) {
      console.error('Error getting database user ID:', error);
      return null;
    }
  },

  /**
   * Ensure a user exists in the users table - simplified for Supabase-only operation
   */
  ensureUserExists: async (authUser: User) => {
    if (!authUser.email) {
      console.error('User has no email in ensureUserExists');
      return { error: new Error('User has no email') };
    }

    try {
      const supabase = await authService.getClient();
      
      // Try to find the user by direct ID first (Supabase UUID)
      if (authUser.id) {
        const { data: existingUserById, error: idCheckError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();
          
        if (!idCheckError && existingUserById) {
          console.log('User already exists by ID in database:', existingUserById.id);
          return { user: existingUserById, error: null };
        }
        
        // ID lookup failed, continue to email lookup
      }
      
      // Check if user exists based on email
      console.log('Checking if user exists by email:', authUser.email);
      const { data: existingUserByEmail, error: emailCheckError } = await supabase
        .from('users')
        .select('*')
        .eq('email', authUser.email)
        .single();
        
      if (!emailCheckError && existingUserByEmail) {
        console.log('User already exists in database by email:', existingUserByEmail.email);
        return { user: existingUserByEmail, error: null };
      }
      
      // If we get here, user doesn't exist, create them
      console.log('User not found in database, creating:', authUser.email);
      
      // Extract user metadata (if any)
      const metadata = authUser.user_metadata || {};
      
      // Create a new user record using Supabase Auth UUID as the primary key
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: authUser.id, // Use Supabase Auth UUID as the primary key
          email: authUser.email,
          username: metadata.username || authUser.email.split('@')[0],
          first_name: metadata.first_name || '',
          last_name: metadata.last_name || '',
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
      
      console.log('Successfully created user in database with ID:', newUser.id);
      return { user: newUser, error: null };
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
   * Get user's quiz answers - simplified for Supabase-only operation
   */
  getQuizAnswers: async (supabase: any, userId: string) => {
    console.log('Fetching quiz answers for user ID:', userId);
    
    try {
      // Simply use the userId directly (which should be the Supabase Auth UUID)
      console.log('Fetching quiz answers with ID:', userId);
      
      // All IDs are now TEXT type, so we can use eq for both UUID and integer IDs
      const { data, error } = await supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching quiz answers by userId:', error);
      } else if (data) {
        console.log('Successfully found quiz answers');
        return data as QuizAnswer;
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
    
    console.log('Getting current user quiz answers for auth user:', user.email);
    
    // With the updated schema, we can directly use the Auth UUID
    if (user && user.id) {
      console.log('Using auth UUID for quiz lookup:', user.id);
      return await quizService.getQuizAnswers(supabase, user.id);
    }
    
    console.error('Auth user has no ID');
    return null;
  },

  /**
   * Save quiz answers - simplified for Supabase-only operation
   */
  saveQuizAnswers: async (supabase: any, userId: string, answers: any, completed: boolean = false) => {
    try {
      console.log('Saving quiz answers for user ID:', userId);
      
      // Check if user already has answers
      const existingQuiz = await quizService.getQuizAnswers(supabase, userId);
      
      if (existingQuiz) {
        console.log('Updating existing quiz answers for ID:', existingQuiz.id);
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
        
        console.log('Successfully updated quiz answers');
        return data as QuizAnswer;
      } else {
        console.log('Creating new quiz answers for user ID:', userId);
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
        
        console.log('Successfully created quiz answers');
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
    if (!user || !user.id) {
      console.error("No authenticated user or user has no ID");
      return null;
    }
    
    console.log('Saving quiz answers for current user:', user.email, 'with ID:', user.id);
    
    // With the updated schema, we can directly use the Auth UUID
    return await quizService.saveQuizAnswers(supabase, user.id, answers, completed);
  }
};

/**
 * Report Services
 */
export const reportService = {
  /**
   * Get user's report - simplified for Supabase-only operation
   */
  getReport: async (supabase: any, userId: string) => {
    console.log('Fetching report for user ID:', userId);
    
    try {
      // Simply use the userId directly (which should be the Supabase Auth UUID)
      console.log('Fetching report with ID:', userId);
      
      // All IDs are now TEXT type, so we can use eq for direct lookups
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching report by userId:', error);
      } else if (data) {
        console.log('Successfully found report');
        return data as Report;
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
    if (!user || !user.id) {
      console.error('No authenticated user or user has no ID');
      return null;
    }
    
    console.log('Getting report for current user:', user.email, 'with ID:', user.id);
    
    // With the updated schema, we can directly use the Auth UUID
    return await reportService.getReport(supabase, user.id);
  },

  /**
   * Create a report - simplified for Supabase-only operation
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
      console.log('Creating report with user ID:', data.userId);
      
      // Convert field names to snake_case for Supabase
      const { data: createdReport, error } = await supabase
        .from('reports')
        .insert({
          user_id: data.userId,
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
    if (!user || !user.id) {
      console.error('No authenticated user or user has no ID');
      return null;
    }
    
    console.log('Creating report for current user:', user.email, 'with ID:', user.id);
    
    // With the updated schema, we can directly use the Auth UUID
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
   * Create a payment - simplified for Supabase-only operation
   */
  createPayment: async (userId: string, reportId: number, amount: number) => {
    const supabase = await authService.getClient();
    
    console.log('Creating payment with user ID:', userId);
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