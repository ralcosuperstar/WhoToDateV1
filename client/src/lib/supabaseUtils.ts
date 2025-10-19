import { User } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabaseConfig';

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
    const supabase = await getSupabaseClient();
    
    // First check if we have stored signup data in localStorage
    let storedUserData: any = null;
    try {
      const savedData = localStorage.getItem('pendingSignupData');
      if (savedData) {
        storedUserData = JSON.parse(savedData);
        console.log('Found stored signup data:', storedUserData);
      }
    } catch (e) {
      console.error('Error retrieving saved signup data:', e);
    }
    
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, phone_number')
      .eq('id', authUser.id)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking if user exists:', checkError);
      return;
    }
    
    // Extract user metadata (if any)
    const metadata = authUser.user_metadata || {};
    
    // If user exists but is missing profile data
    if (existingUser) {
      console.log('User already exists in database:', existingUser.email);
      
      // Check if profile data is missing and we have stored data to update with
      if (storedUserData && (!existingUser.first_name || !existingUser.last_name || !existingUser.phone_number)) {
        console.log('Updating existing user with stored signup data');
        
        const { error: updateError } = await supabase
          .from('users')
          .update({
            first_name: storedUserData.first_name,
            last_name: storedUserData.last_name,
            phone_number: storedUserData.phone,
            full_name: `${storedUserData.first_name} ${storedUserData.last_name}`.trim(),
            is_verified: authUser.email_confirmed_at ? true : false,
          })
          .eq('id', authUser.id);
          
        if (updateError) {
          console.error('Error updating user with stored data:', updateError);
        } else {
          console.log('Successfully updated user with stored signup data');
          // Clear the stored data
          localStorage.removeItem('pendingSignupData');
        }
      }
    }
    // If user doesn't exist, create them
    else {
      console.log('User not found in database, creating:', authUser.email);
      
      // Prioritize stored data, fallback to metadata
      const userData = {
        id: authUser.id,
        email: authUser.email,
        username: metadata.username || authUser.email.split('@')[0],
        first_name: storedUserData?.first_name || metadata.first_name || '',
        last_name: storedUserData?.last_name || metadata.last_name || '',
        phone_number: storedUserData?.phone || metadata.phone || '',
        full_name: '',
        is_verified: authUser.email_confirmed_at ? true : false,
        created_at: new Date().toISOString(),
      };
      
      // Set the full name if we have first and last name
      if (userData.first_name && userData.last_name) {
        userData.full_name = `${userData.first_name} ${userData.last_name}`;
      }
      
      // Create a new user record
      const { error: insertError } = await supabase
        .from('users')
        .insert(userData);
        
      if (insertError) {
        console.error('Error creating user:', insertError);
      } else {
        console.log('Successfully created user in database');
        // Clear the stored data
        localStorage.removeItem('pendingSignupData');
      }
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
    const supabase = await getSupabaseClient();
    
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
    const supabase = await getSupabaseClient();
    
    // Update the profile
    const { data, error } = await supabase
      .from('users')
      .update({
        ...profileData
        // Note: updated_at column doesn't exist in the database schema
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
    const supabase = await getSupabaseClient();
    
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
    const supabase = await getSupabaseClient();
    
    // Check if user already has answers
    const { quizAnswers } = await getUserQuizAnswers(userId);
    
    if (quizAnswers) {
      // Update existing answers
      const { data, error } = await supabase
        .from('quiz_answers')
        .update({
          answers,
          completed
          // Note: updated_at column doesn't exist in the database schema
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
          created_at: new Date().toISOString()
          // Note: updated_at column doesn't exist in the database schema
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
    const supabase = await getSupabaseClient();
    
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
    const supabase = await getSupabaseClient();
    
    const { data, error } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        compatibility_profile: compatibilityProfile,
        is_paid: false,
        created_at: new Date().toISOString()
        // Note: updated_at column doesn't exist in the database schema
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

