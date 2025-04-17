import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useSupabase } from './SupabaseContext';
import { getSupabaseClient } from '@/lib/supabase';
import type { User, QuizAnswer, Report, Payment, BlogPost } from '@shared/schema';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface SupabaseDbContextType {
  // User profile operations
  profile: {
    data: User | null;
    isLoading: boolean;
    error: Error | null;
    update: (userData: Partial<User>) => Promise<User | null>;
  };
  
  // Quiz operations
  quiz: {
    data: QuizAnswer | null;
    isLoading: boolean;
    error: Error | null;
    saveAnswers: (answers: Record<number, number>, completed: boolean) => Promise<QuizAnswer | null>;
  };
  
  // Report operations
  report: {
    data: Report | null;
    isLoading: boolean;
    error: Error | null;
    create: (data: { quizId: number, compatibilityProfile: any, isPaid: boolean }) => Promise<Report | null>;
    updatePayment: (reportId: number, isPaid: boolean) => Promise<Report | null>;
  };
  
  // Blog operations
  blogPosts: {
    data: BlogPost[] | null;
    isLoading: boolean;
    error: Error | null;
    getBySlug: (slug: string) => Promise<BlogPost | null>;
    getById: (id: number) => Promise<BlogPost | null>;
  };
}

const SupabaseDbContext = createContext<SupabaseDbContextType | null>(null);

export const SupabaseDbProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useSupabase();
  const queryClient = useQueryClient();
  
  // Get user profile
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  
  // Update user profile
  const updateProfileMutation = useMutation({
    mutationFn: async (userData: Partial<User>) => {
      if (!user) throw new Error('No authenticated user');
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', user?.id], data);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Get quiz answers
  const {
    data: quizData,
    isLoading: isQuizLoading,
    error: quizError
  } = useQuery({
    queryKey: ['quiz', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  
  // Save quiz answers
  const saveQuizMutation = useMutation({
    mutationFn: async ({ answers, completed }: { answers: Record<number, number>, completed: boolean }) => {
      if (!user) throw new Error('No authenticated user');
      
      const supabase = getSupabaseClient();
      
      // Check if user already has quiz answers
      const { data: existingAnswers } = await supabase
        .from('quiz_answers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      let result;
      
      if (existingAnswers) {
        // Update existing quiz answers
        const { data, error } = await supabase
          .from('quiz_answers')
          .update({
            answers,
            completed
          })
          .eq('id', existingAnswers.id)
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      } else {
        // Create new quiz answers
        const { data, error } = await supabase
          .from('quiz_answers')
          .insert({
            user_id: user.id,
            answers,
            completed
          })
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      }
      
      return result;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['quiz', user?.id], data);
    },
    onError: (error) => {
      console.error('Error saving quiz answers:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your answers. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Get report
  const {
    data: reportData,
    isLoading: isReportLoading,
    error: reportError
  } = useQuery({
    queryKey: ['report', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  
  // Create report
  const createReportMutation = useMutation({
    mutationFn: async (data: { quizId: number, compatibilityProfile: any, isPaid: boolean }) => {
      if (!user) throw new Error('No authenticated user');
      
      const supabase = getSupabaseClient();
      
      // Check if user already has a report
      const { data: existingReport } = await supabase
        .from('reports')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      let result;
      
      if (existingReport) {
        // Update existing report
        const { data: updatedReport, error } = await supabase
          .from('reports')
          .update({
            quiz_id: data.quizId,
            compatibility_profile: data.compatibilityProfile,
            is_paid: data.isPaid
          })
          .eq('id', existingReport.id)
          .select()
          .single();
          
        if (error) throw error;
        result = updatedReport;
      } else {
        // Create new report
        const { data: newReport, error } = await supabase
          .from('reports')
          .insert({
            user_id: user.id,
            quiz_id: data.quizId,
            compatibility_profile: data.compatibilityProfile,
            is_paid: data.isPaid
          })
          .select()
          .single();
          
        if (error) throw error;
        result = newReport;
      }
      
      return result;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['report', user?.id], data);
    },
    onError: (error) => {
      console.error('Error creating report:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate your report. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Update report payment status
  const updateReportPaymentMutation = useMutation({
    mutationFn: async ({ reportId, isPaid }: { reportId: number, isPaid: boolean }) => {
      if (!user) throw new Error('No authenticated user');
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('reports')
        .update({ is_paid: isPaid })
        .eq('id', reportId)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['report', user?.id], data);
      toast({
        title: 'Payment successful',
        description: 'Your report has been unlocked. Enjoy!',
      });
    },
    onError: (error) => {
      console.error('Error updating payment status:', error);
      toast({
        title: 'Error',
        description: 'Failed to process payment. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  // Get all blog posts
  const {
    data: blogPostsData,
    isLoading: isBlogPostsLoading,
    error: blogPostsError
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
  });
  
  // Function to get blog post by slug
  const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting blog post by slug:', error);
      return null;
    }
  };
  
  // Function to get blog post by ID
  const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting blog post by ID:', error);
      return null;
    }
  };
  
  // Context value
  const contextValue = useMemo(() => ({
    profile: {
      data: profileData,
      isLoading: isProfileLoading,
      error: profileError instanceof Error ? profileError : null,
      update: async (userData: Partial<User>) => {
        try {
          return await updateProfileMutation.mutateAsync(userData);
        } catch (error) {
          return null;
        }
      },
    },
    quiz: {
      data: quizData,
      isLoading: isQuizLoading,
      error: quizError instanceof Error ? quizError : null,
      saveAnswers: async (answers: Record<number, number>, completed: boolean) => {
        try {
          return await saveQuizMutation.mutateAsync({ answers, completed });
        } catch (error) {
          return null;
        }
      },
    },
    report: {
      data: reportData,
      isLoading: isReportLoading,
      error: reportError instanceof Error ? reportError : null,
      create: async (data: { quizId: number, compatibilityProfile: any, isPaid: boolean }) => {
        try {
          return await createReportMutation.mutateAsync(data);
        } catch (error) {
          return null;
        }
      },
      updatePayment: async (reportId: number, isPaid: boolean) => {
        try {
          return await updateReportPaymentMutation.mutateAsync({ reportId, isPaid });
        } catch (error) {
          return null;
        }
      },
    },
    blogPosts: {
      data: blogPostsData,
      isLoading: isBlogPostsLoading,
      error: blogPostsError instanceof Error ? blogPostsError : null,
      getBySlug: getBlogPostBySlug,
      getById: getBlogPostById,
    },
  }), [
    profileData, isProfileLoading, profileError, updateProfileMutation,
    quizData, isQuizLoading, quizError, saveQuizMutation,
    reportData, isReportLoading, reportError, createReportMutation, updateReportPaymentMutation,
    blogPostsData, isBlogPostsLoading, blogPostsError
  ]);
  
  return (
    <SupabaseDbContext.Provider value={contextValue}>
      {children}
    </SupabaseDbContext.Provider>
  );
};

export const useSupabaseDb = () => {
  const context = useContext(SupabaseDbContext);
  if (!context) {
    throw new Error('useSupabaseDb must be used within a SupabaseDbProvider');
  }
  return context;
};