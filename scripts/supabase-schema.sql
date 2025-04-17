-- Enable Row Level Security for all tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon;

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  date_of_birth TEXT,
  gender TEXT,
  image_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_method TEXT,
  verification_token TEXT,
  verification_token_expiry TIMESTAMP WITH TIME ZONE,
  otp_code TEXT,
  otp_expiry TIMESTAMP WITH TIME ZONE,
  clerk_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_answers table
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES public.quiz_answers(id) ON DELETE SET NULL,
  compatibility_profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  report_id INTEGER REFERENCES public.reports(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  author TEXT,
  image_url TEXT,
  category TEXT,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Row Level Security Policies

-- Users table policy: Users can read and update their own data
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- Quiz answers policy: Users can only access their own quiz answers
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz answers" 
  ON public.quiz_answers FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own quiz answers" 
  ON public.quiz_answers FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz answers" 
  ON public.quiz_answers FOR UPDATE 
  USING (auth.uid() = user_id);

-- Reports policy: Users can only access their own reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports" 
  ON public.reports FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reports" 
  ON public.reports FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports" 
  ON public.reports FOR UPDATE 
  USING (auth.uid() = user_id);

-- Payments policy: Users can only access their own payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" 
  ON public.payments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own payments" 
  ON public.payments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Blog posts policy: Everyone can read published blog posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts FOR SELECT 
  USING (published = TRUE);

-- Create database triggers

-- Trigger to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_answers_updated_at
  BEFORE UPDATE ON public.quiz_answers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to sync user data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample blog posts (optional)
INSERT INTO public.blog_posts (title, slug, content, summary, author, category) 
VALUES 
('Understanding Attachment Styles', 
 'understanding-attachment-styles', 
 '## What Are Attachment Styles?

Attachment styles are patterns of how we relate to others in close relationships. They develop early in life based on our interactions with caregivers and continue to influence our relationships throughout adulthood.

## The Four Main Attachment Styles

### Secure Attachment
People with secure attachment generally had caregivers who were consistently responsive to their needs. As adults, they tend to:
- Trust others and themselves
- Communicate effectively
- Seek support when needed
- Recover relatively quickly from relationship setbacks

### Anxious Attachment
People with anxious attachment often had caregivers who were inconsistently responsive. As adults, they tend to:
- Worry about their partner''s ability to love them back
- Seek high levels of intimacy, approval, and responsiveness
- Be overly sensitive to their partner''s actions and moods
- Fear rejection and abandonment

### Avoidant Attachment
People with avoidant attachment often had caregivers who were consistently unresponsive or intrusive. As adults, they tend to:
- Value independence and self-sufficiency
- Prefer to not depend on others or have others depend on them
- Find it difficult to trust others
- Keep people at arm''s length

### Fearful-Avoidant Attachment
This is a combination of anxious and avoidant styles. People with this attachment style often:
- Have conflicting feelings about close relationships
- Both desire and fear closeness
- Struggle with emotional regulation and trust issues
- Have difficulty communicating their needs

## How Attachment Styles Impact Relationships

Your attachment style can significantly influence how you:
- Choose partners
- Handle conflicts
- Express intimacy
- Communicate needs and emotions
- Respond to breakups and separation

## Can Attachment Styles Change?

Yes! While attachment styles are often deeply ingrained, they''re not fixed traits. Through self-awareness, therapy, and healthy relationships, people can develop more secure attachment patterns over time.

## Understanding Your Partner''s Attachment Style

Learning to recognize and understand both your own and your partner''s attachment style can:
- Reduce conflict
- Improve communication
- Increase empathy
- Create stronger relationships

By recognizing these patterns, you can begin to break unhealthy cycles and build more secure connections.', 
'Attachment styles shape how we connect with others in relationships. Learn about the four main types: secure, anxious, avoidant, and fearful-avoidant, and how they impact your romantic relationships.',
'Dr. Priya Sharma',
'psychology');

INSERT INTO public.blog_posts (title, slug, content, summary, author, category) 
VALUES 
('The Science of Compatibility', 
 'science-of-compatibility', 
 '## What Makes Relationships Work?

When it comes to romantic relationships, we often talk about "chemistry" or feeling like someone is "the one." But what does science tell us about what makes couples truly compatible?

## Complementary vs. Similar Traits

Research shows that successful relationships typically have a mix of both similar and complementary traits:

### Where Similarity Helps:
- Core values and beliefs
- Long-term goals
- Communication styles
- Sense of humor
- Activity preferences

### Where Differences Can Be Complementary:
- Problem-solving approaches
- Social tendencies (introvert/extrovert balance)
- Emotional regulation strategies
- Practical skills and strengths
- Decision-making styles

## The Big Five Personality Traits and Compatibility

Psychological research often examines the "Big Five" personality traits when studying relationship satisfaction:

1. **Openness to Experience**: Couples with similar levels of curiosity and willingness to try new things often report higher satisfaction.

2. **Conscientiousness**: Having at least one highly conscientious partner can help relationships run more smoothly.

3. **Extraversion**: While opposites can attract, couples with vastly different social needs may struggle unless they develop good compromise skills.

4. **Agreeableness**: This trait is consistently linked to relationship satisfaction. Having at least one highly agreeable partner can buffer conflicts.

5. **Neuroticism**: Lower levels of neuroticism in both partners tends to predict more stable and satisfying relationships.

## Emotional Intelligence Matters

Research consistently shows that emotional intelligence—the ability to understand and manage emotions effectively—is one of the strongest predictors of relationship success. Partners who can:

- Recognize each other''s emotional states
- Respond empathetically
- Regulate their own emotions during conflict
- Communicate feelings effectively

...tend to have more satisfying and longer-lasting relationships regardless of other personality factors.

## Attachment Styles and Compatibility

Your attachment style—how you form emotional bonds—can significantly impact compatibility:

- **Secure + Secure**: Often the easiest pairing, with both partners comfortable with intimacy and independence.
- **Secure + Anxious**: Can work well if the secure partner provides reassurance and the anxious partner works on self-soothing.
- **Secure + Avoidant**: Can be successful if the secure partner respects space needs and the avoidant partner practices vulnerability.
- **Anxious + Avoidant**: Often challenging without awareness and growth, as core needs can conflict.
- **Anxious + Anxious**: May struggle with escalating anxiety and reassurance-seeking.
- **Avoidant + Avoidant**: Might have difficulty establishing emotional intimacy.

## Love Languages Matter Too

How we express and receive love can significantly impact relationship satisfaction. Partners with different love languages can thrive as long as they understand and respect each other''s preferences:

1. Words of Affirmation
2. Quality Time
3. Physical Touch
4. Acts of Service
5. Receiving Gifts

## The Bottom Line

True compatibility isn''t about finding someone exactly like you or your perfect opposite. It''s about:

- Shared core values
- Complementary strengths
- Effective communication
- Willingness to grow together
- Mutual respect for differences

The most successful couples understand their own and their partner''s patterns and work together to create a relationship that honors both people''s needs and aspirations.',
'What makes couples truly compatible? Explore the science behind successful relationships, from personality traits and attachment styles to emotional intelligence and love languages.',
'Dr. Vivek Patel',
'relationships');