import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { User } from '@shared/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, User as UserIcon } from 'lucide-react';
import { ensureDatabaseCompatibility } from '@/lib/databaseUtils';
import DatabaseCompatibilityCheck from './DatabaseCompatibilityCheck';

// Define the form schema with validation
const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

interface PersonalInformationFormProps {
  user: User;
  onSuccess?: () => void;
}

export const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  user,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const [dbCompatible, setDbCompatible] = useState<boolean | null>(null);
  
  // Initialize form with user data
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phoneNumber: user.phoneNumber || '',
      gender: user.gender || '',
    },
  });

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async (values: PersonalInfoValues) => {
      // First ensure database compatibility 
      if (dbCompatible !== true) {
        console.log('Attempting to fix database schema before updating profile...');
        const compatible = await ensureDatabaseCompatibility(user.id);
        if (!compatible) {
          throw new Error('Database compatibility issues must be fixed before updating profile');
        }
      }
      
      // Construct full name from first and last name
      const fullName = `${values.firstName} ${values.lastName}`.trim();
      
      // Update user data
      const response = await apiRequest('PATCH', `/api/user`, {
        ...values,
        fullName
      }) as Response;
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      // Update the user data in the cache
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
      
      toast({
        title: 'Profile Updated',
        description: 'Your personal information has been updated successfully.',
      });
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'An error occurred while updating your profile',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (values: PersonalInfoValues) => {
    updateProfileMutation.mutate(values);
  };

  const handleCompatibilityChange = (isCompatible: boolean) => {
    setDbCompatible(isCompatible);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-pink-600">
          <UserIcon className="mr-2 h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription>
          Update your personal details and how others will see you on the platform
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Database compatibility check */}
        <DatabaseCompatibilityCheck 
          userId={user.id} 
          onCompatibilityChange={handleCompatibilityChange} 
        />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Used for account verification and important notifications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Used for personalized matching and recommendations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700"
              disabled={updateProfileMutation.isPending || dbCompatible === false}
            >
              {updateProfileMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-5 text-xs text-muted-foreground">
        <p>Last updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'Never'}</p>
        <p>Profile ID: {user.id.substring(0, 8)}...</p>
      </CardFooter>
    </Card>
  );
};

export default PersonalInformationForm;