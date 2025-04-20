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
   * Ensure a user exists in the users table
   */
  ensureUserExists: async (authUser: User) => {
    if (!authUser.email) {
      console.error('User has no email in ensureUserExists');
      return { error: new Error('User has no email') };
    }

    try {
      const supabase = await authService.getClient();
      
      // Step 1: First check if user exists based on email (most reliable way)
      console.log('Checking if user exists by email:', authUser.email);
      const { data: existingUserByEmail, error: emailCheckError } = await supabase
        .from('users')
        .select('id, email, clerk_id')
        .eq('email', authUser.email)
        .single();
        
      if (emailCheckError && emailCheckError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error checking if user exists by email:', emailCheckError);
        // Continue to try other methods
      } else if (existingUserByEmail) {
        console.log('User already exists in database by email:', existingUserByEmail.email);
        
        // Update clerk_id if it's not set but we have an auth user id
        if (!existingUserByEmail.clerk_id && authUser.id) {
          console.log('Updating clerk_id for existing user:', existingUserByEmail.id);
          try {
            // Only update the clerk_id field to avoid updated_at issues
            const { data: updatedUser, error: updateError } = await supabase
              .from('users')
              .update({ 
                clerk_id: authUser.id
              })
              .eq('id', existingUserByEmail.id)
              .select('*')
              .single();
              
            if (updateError) {
              console.error('Error updating clerk_id:', updateError);
              // Continue with existing user anyway
            } else {
              console.log('Successfully updated clerk_id');
              return { user: updatedUser, error: null };
            }
          } catch (err) {
            console.error('Exception updating clerk_id:', err);
            // Continue with existing user
          }
        }
        
        return { user: existingUserByEmail, error: null };
      }
      
      // If we get here, user doesn't exist by email, create them
      console.log('User not found in database, creating:', authUser.email);
      
      // Extract user metadata (if any)
      const metadata = authUser.user_metadata || {};
      
      // Create a new user record - Don't specify ID to let the database generate one
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          email: authUser.email,
          clerk_id: authUser.id, // Store the auth ID in clerk_id field for reference
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
   * Get user's quiz answers
   */
  getQuizAnswers: async (supabase: any, userId: string | number) => {
    console.log('Fetching quiz answers for user ID:', userId);
    
    try {
      // If userId is a UUID (string with hyphens), we need to get the database integer ID
      let dbUserId = userId;
      if (typeof userId === 'string' && userId.includes('-')) {
        // Get database user ID from email
        const authUser = await authService.getCurrentUser();
        if (authUser && authUser.email) {
          const dbUser = await userService.getUserByEmail(supabase, authUser.email);
          
          if (dbUser && dbUser.id) {
            console.log('Using database user ID:', dbUser.id, 'for auth user:', authUser.email);
            dbUserId = dbUser.id;
          }
        }
      }
      
      // Try to fetch with the determined user ID
      console.log('Fetching quiz answers with ID:', dbUserId);
      const { data, error } = await supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', dbUserId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching quiz answers by userId:', error);
      } else if (data) {
        console.log('Successfully found quiz answers');
        return data as QuizAnswer;
      }
      
      // If we still haven't found anything and we were using a UUID, try the email lookup path
      if (typeof userId === 'string' && userId.includes('-') && !data) {
        // If not found, try to fetch user by email first to get integer ID
        const authUser = await authService.getCurrentUser();
        if (authUser && authUser.email) {
          console.log('Trying second method to get database user by email');
          const dbUser = await userService.getUserByEmail(supabase, authUser.email);
          
          if (dbUser && dbUser.id) {
            console.log('Found database user ID (second attempt):', dbUser.id);
            
            // Try again with the database user ID
            const { data: quizData, error: quizError } = await supabase
              .from('quiz_answers')
              .select('*')
              .eq('user_id', dbUser.id)
              .single();
              
            if (quizError && quizError.code !== 'PGRST116') {
              console.error('Error fetching quiz answers with database ID:', quizError);
            } else if (quizData) {
              console.log('Found quiz answers with database ID (second attempt)');
              return quizData as QuizAnswer;
            }
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
  getQuizByUserId: async (supabase: any, userId: string | number) => {
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
   * Save quiz answers
   */
  saveQuizAnswers: async (supabase: any, userId: string | number, answers: any, completed: boolean = false) => {
    try {
      console.log('Saving quiz answers for user ID:', userId);
      
      // We're now using Supabase Auth UUID directly, so we don't need to convert it
      // Just ensure it's a string (newer schema uses text columns for user_id)
      let dbUserId = String(userId);
      
      // Check if user already has answers
      const existingQuiz = await quizService.getQuizAnswers(supabase, dbUserId);
      
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
        console.log('Creating new quiz answers for user ID:', dbUserId);
        // Create new answers
        const { data, error } = await supabase
          .from('quiz_answers')
          .insert({
            user_id: dbUserId,
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
   * Get user's report
   */
  getReport: async (supabase: any, userId: string | number) => {
    console.log('Fetching report for user ID:', userId);
    
    try {
      // We're now using Supabase Auth UUID directly, so we don't need to convert it
      // Just ensure it's a string (newer schema uses text columns for user_id)
      let dbUserId = String(userId);
      
      // Try to fetch with the determined user ID
      console.log('Fetching report with ID:', dbUserId);
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', dbUserId)
        .single();
        
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching report by userId:', error);
      } else if (data) {
        console.log('Successfully found report');
        return data as Report;
      }
      
      // If we still haven't found anything and we were using a UUID, try the email lookup path
      if (typeof userId === 'string' && userId.includes('-') && !data) {
        // If not found, try to fetch user by email first to get integer ID
        const authUser = await authService.getCurrentUser();
        if (authUser && authUser.email) {
          console.log('Trying second method to get database user by email');
          const dbUser = await userService.getUserByEmail(supabase, authUser.email);
          
          if (dbUser && dbUser.id) {
            console.log('Found database user ID (second attempt):', dbUser.id);
            
            // Try again with the database user ID
            const { data: reportData, error: reportError } = await supabase
              .from('reports')
              .select('*')
              .eq('user_id', dbUser.id)
              .single();
              
            if (reportError && reportError.code !== 'PGRST116') {
              console.error('Error fetching report with database ID:', reportError);
            } else if (reportData) {
              console.log('Found report with database ID (second attempt)');
              return reportData as Report;
            }
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
  getReportByUserId: async (supabase: any, userId: string | number) => {
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
   * Create a report
   */
  createReport: async (supabase: any, data: {
    userId: string | number;
    quizId: number;
    report: any;
    compatibilityColor: string;
    isPaid: boolean;
  }) => {
    console.log('Creating report with data:', data);
    try {
      // We're now using Supabase Auth UUID directly, so we don't need to convert it
      // Just ensure it's a string (newer schema uses text columns for user_id)
      let dbUserId = String(data.userId);
      
      console.log('Using database user ID for report:', dbUserId);
      
      // Convert field names to snake_case for Supabase
      const { data: createdReport, error } = await supabase
        .from('reports')
        .insert({
          user_id: dbUserId,
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
   * Create a payment
   */
  createPayment: async (userId: string | number, reportId: number, amount: number) => {
    const supabase = await authService.getClient();
    
    // We're now using Supabase Auth UUID directly, so we don't need to convert it
    // Just ensure it's a string (newer schema uses text columns for user_id)
    let dbUserId = String(userId);
    
    console.log('Creating payment with user ID:', dbUserId);
    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: dbUserId,
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