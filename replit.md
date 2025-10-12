# Overview

WhoToDate is a relationship compatibility assessment platform designed for Indian singles. The application provides users with a comprehensive personality and compatibility analysis through a scientifically-based quiz. Users receive detailed reports about their personality traits, attachment styles, emotional intelligence, and relationship compatibility patterns. The platform includes features for user authentication, quiz completion, report generation, payment processing, and a blog for relationship advice.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack**: React with TypeScript, Vite build system, Wouter for routing, and TailwindCSS with shadcn/ui components for styling.

**Key Design Decisions**:
- **Component Library**: Uses Radix UI primitives with custom theming via shadcn/ui, providing accessible and customizable UI components
- **State Management**: React Query (TanStack Query) for server state management with built-in caching
- **Routing**: Wouter (lightweight alternative to React Router) for client-side navigation
- **Styling**: TailwindCSS with custom theme configuration, supporting both light and dark modes with configurable color schemes
- **Forms**: React Hook Form with Zod validation for type-safe form handling

**Architecture Pattern**: Page-based architecture with route protection, centralized API client, and context-based authentication state management.

## Backend Architecture

**Technology Stack**: Express.js server with TypeScript, Drizzle ORM for database operations, and modular service architecture.

**Key Design Decisions**:
- **Service Layer Pattern**: Business logic encapsulated in dedicated service classes (UserService, QuizService, ReportService, BlogService)
- **Storage Abstraction**: IStorage interface allowing flexible database implementations (currently SupabaseStorage)
- **Middleware Chain**: Request logging, error handling, authentication checks, and validation middleware
- **Caching Strategy**: NodeCache for in-memory caching of frequently accessed data (users, reports, blog posts) with configurable TTLs
- **Error Handling**: Centralized async error handler with standardized error responses

**API Design**: RESTful API with `/api` prefix, using modular route registration for scalability.

## Authentication System

**Migration in Progress**: Transitioning from Clerk to Supabase Auth.

**Current Implementation**:
- **Primary Method**: Supabase Auth with JWT tokens and session management
- **User Identification**: UUID-based user IDs from Supabase Auth (migrating from integer IDs)
- **Legacy Support**: Maintains `clerk_id` field for backward compatibility
- **Verification Methods**: Email verification tokens and SMS OTP (via Twilio)
- **Session Management**: Express sessions with both memory store (development) and PostgreSQL store (production)

**Key Features**:
- Direct Supabase client integration on frontend via FixedSupabaseContext
- Email/password authentication with email verification
- Password reset functionality
- Protected route middleware for authenticated access

## Data Storage

**Primary Database**: PostgreSQL hosted on Supabase

**Database Access Patterns**:
- **Drizzle ORM**: Type-safe database queries with schema definitions in `shared/schema.ts`
- **Direct Supabase Client**: Admin operations using service role key
- **Connection Pooling**: PgBouncer session pooler for PostgreSQL connections

**Schema Structure**:
- **users**: UUID primary key (Supabase Auth), profile information, verification status
- **quiz_answers**: User quiz responses stored as JSONB, completion tracking
- **reports**: Generated compatibility reports with payment status
- **payments**: Stripe payment tracking linked to reports
- **blog_posts**: Content management for blog articles

**Migration Strategy**: Active migration from integer-based user IDs to UUID strings to align with Supabase Auth. Legacy `clerk_id` field maintained for compatibility.

## Third-Party Integrations

**Analytics & Tracking**:
- Google Analytics 4 for user behavior tracking
- Meta Pixel for conversion tracking
- Custom analytics initialization with environment-based configuration

**Payment Processing**:
- Stripe integration for report purchases
- Payment status tracking in database
- Webhook handling for payment confirmations

**Communication Services**:
- **Email**: Resend API for transactional emails with Nodemailer fallback for development
- **SMS**: Twilio for OTP-based phone verification
- SendGrid integration (legacy, being phased out)

**Authentication**:
- Supabase Auth as primary authentication provider
- Clerk (legacy, being deprecated)

**Database & Hosting**:
- Supabase for PostgreSQL database and authentication
- Neon serverless PostgreSQL (alternative connection method)

**Development Tools**:
- Vite for build tooling and HMR
- Replit-specific plugins for development environment integration

## External Dependencies

**Core Services**:
- **Supabase** (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`): Authentication and PostgreSQL database
- **Stripe** (`STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`): Payment processing
- **Resend** (`RESEND_API_KEY`): Transactional email delivery
- **Twilio** (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`): SMS verification

**Analytics**:
- Google Analytics (`VITE_GA_MEASUREMENT_ID`)
- Meta Pixel (`VITE_META_PIXEL_ID`)

**Database Connection**:
- PostgreSQL connection via `DATABASE_URL`
- Supabase-specific pooler configuration with IPv4 addressing

**Session Management**:
- `SESSION_SECRET` for Express session encryption

**Environment-Specific Configuration**: All sensitive credentials managed via environment variables with development fallbacks for local testing.