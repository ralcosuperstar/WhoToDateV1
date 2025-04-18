import { User } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabase';

/**
 * Ensures that a user exists in the public.users table after authentication
 * This function runs after a user signs in to make sure their profile exists
 */
export async function ensureUserExists(authUser: User): Promise<void> {
  if (!authUser.email) {
    console.error('User has no email in ensureUserExists');
    return;
  }

  try {
    const supabase = getSupabaseClient();
    
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, email')
      .eq('id', authUser.id)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking if user exists:', checkError);
      return;
    }
    
    // If user doesn't exist, create them
    if (!existingUser) {
      console.log('User not found in database, creating:', authUser.email);
      
      // Extract user metadata (if any)
      const metadata = authUser.user_metadata || {};
      
      // Create a new user record
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: authUser.id,
          email: authUser.email,
          username: metadata.username || authUser.email.split('@')[0],
          first_name: metadata.first_name || '',
          last_name: metadata.last_name || '',
          phone_number: metadata.phone || '',
          is_verified: authUser.email_confirmed_at ? true : false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
      if (insertError) {
        console.error('Error creating user:', insertError);
      } else {
        console.log('Successfully created user in database');
      }
    } else {
      console.log('User already exists in database:', existingUser.email);
    }
  } catch (error) {
    console.error('Error in ensureUserExists:', error);
  }
}

/**
 * Gets the profile of the current authenticated user
 */
export async function getCurrentUserProfile() {
  try {
    const supabase = getSupabaseClient();
    
    // Get user ID from auth
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { profile: null };
    }
    
    // Get full profile from database
    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return { profile: null, error };
    }
    
    return { profile };
  } catch (error) {
    console.error('Error in getCurrentUserProfile:', error);
    return { profile: null, error };
  }
}

/**
 * Updates a user's profile in the database
 */
export async function updateUserProfile(userId: string, profileData: any) {
  try {
    const supabase = getSupabaseClient();
    
    // Update the profile
    const { data, error } = await supabase
      .from('users')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating user profile:', error);
      return { profile: null, error };
    }
    
    return { profile: data };
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    return { profile: null, error };
  }
}

/**
 * Gets a user's quiz answers
 */
export async function getUserQuizAnswers(userId: string) {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('quiz_answers')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching quiz answers:', error);
      return { quizAnswers: null, error };
    }
    
    return { quizAnswers: data || null };
  } catch (error) {
    console.error('Error in getUserQuizAnswers:', error);
    return { quizAnswers: null, error };
  }
}

/**
 * Creates or updates a user's quiz answers
 */
export async function saveQuizAnswers(userId: string, answers: any, completed: boolean = false) {
  try {
    const supabase = getSupabaseClient();
    
    // Check if user already has answers
    const { quizAnswers } = await getUserQuizAnswers(userId);
    
    if (quizAnswers) {
      // Update existing answers
      const { data, error } = await supabase
        .from('quiz_answers')
        .update({
          answers,
          completed,
          updated_at: new Date().toISOString()
        })
        .eq('id', quizAnswers.id)
        .select()
        .single();
        
      if (error) {
        console.error('Error updating quiz answers:', error);
        return { quizAnswers: null, error };
      }
      
      return { quizAnswers: data };
    } else {
      // Create new answers
      const { data, error } = await supabase
        .from('quiz_answers')
        .insert({
          user_id: userId,
          answers,
          completed,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (error) {
        console.error('Error creating quiz answers:', error);
        return { quizAnswers: null, error };
      }
      
      return { quizAnswers: data };
    }
  } catch (error) {
    console.error('Error in saveQuizAnswers:', error);
    return { quizAnswers: null, error };
  }
}

/**
 * Gets a user's report
 */
export async function getUserReport(userId: string) {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching report:', error);
      return { report: null, error };
    }
    
    return { report: data || null };
  } catch (error) {
    console.error('Error in getUserReport:', error);
    return { report: null, error };
  }
}

/**
 * Creates a user report
 */
export async function createUserReport(userId: string, quizId: number, compatibilityProfile: any) {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        compatibility_profile: compatibilityProfile,
        is_paid: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating report:', error);
      return { report: null, error };
    }
    
    return { report: data };
  } catch (error) {
    console.error('Error in createUserReport:', error);
    return { report: null, error };
  }
}

/**
 * Gets all blog posts
 */
export async function getBlogPosts() {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching blog posts:', error);
      return { posts: [], error };
    }
    
    return { posts: data || [] };
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return { posts: [], error };
  }
}

/**
 * Gets a blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
      
    if (error) {
      console.error('Error fetching blog post:', error);
      return { post: null, error };
    }
    
    return { post: data };
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    return { post: null, error };
  }
}