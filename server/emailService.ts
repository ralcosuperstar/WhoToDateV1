import { randomBytes } from 'crypto';
import { User } from '@shared/schema';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Required Resend API key
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Initialize Resend client
let resendClient: Resend | null = null;
let useResend = false;
let transporter: nodemailer.Transporter;

// Initialize email service asynchronously
async function initializeTransporter() {
  // Check if Resend credentials are available
  if (RESEND_API_KEY) {
    try {
      console.log('Initializing Resend with API key (first 4 chars):', RESEND_API_KEY.substring(0, 4) + '...');
      resendClient = new Resend(RESEND_API_KEY);
      useResend = true;
      
      // Don't test with domains.list() as it requires unrestricted API key
      // We'll just log that Resend is initialized and assume it works for sending
      console.log('Resend email service initialized and ready to send emails');
      
      // For additional safety, we could test with a simple operation in the future if needed
      // But for now, we'll just trust that the API key is valid for sending emails
      
      return;
    } catch (error) {
      console.error('Failed to initialize Resend:', error);
      useResend = false;
    }
  } else {
    console.log('Resend API key not provided, falling back to Ethereal');
  }

  // Fallback to Ethereal Email for development
  try {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    console.log('Created Ethereal test account:', testAccount.user);
    console.log('Ethereal password:', testAccount.pass);

    // Create a transporter using the test account
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Failed to create Ethereal test account:', error);
    throw error;
  }
}

// Initialize immediately
initializeTransporter().catch(err => {
  console.error('Failed to initialize email service:', err);
});

// Create a verification token
export const generateVerificationToken = (): string => {
  return randomBytes(32).toString('hex');
};

// Format the expiry time for verification tokens (24 hours from now)
export const generateTokenExpiry = (): Date => {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 24);
  return expiry;
};

// Import types for storage
import { IStorage } from "./storage";

// Development helper - logs all unverified users with their verification links
export const logAllVerificationLinks = async (storage: IStorage): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    console.warn('This function should only be used in development!');
    return;
  }
  
  try {
    // Get all unverified users
    const allUsers = await storage.getAllUsers();
    const unverifiedUsers = allUsers.filter(user => !user.isVerified && user.verificationToken);
    
    if (unverifiedUsers.length === 0) {
      console.log('No unverified users found.');
      return;
    }
    
    console.log('\n======== UNVERIFIED USERS ========');
    console.log(`Found ${unverifiedUsers.length} unverified users:`);
    
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    
    for (const user of unverifiedUsers) {
      const now = new Date();
      const expiry = user.verificationTokenExpiry ? new Date(user.verificationTokenExpiry) : null;
      const isExpired = expiry ? now > expiry : true;
      
      console.log(`\nUser: ${user.username} (${user.email})`);
      console.log(`Token: ${user.verificationToken}`);
      console.log(`Expires: ${expiry ? expiry.toLocaleString() : 'No expiry set'} ${isExpired ? '(EXPIRED)' : ''}`);
      
      if (!isExpired) {
        const verificationUrl = `${baseUrl}/api/verify?token=${user.verificationToken}`;
        console.log(`Verification Link: ${verificationUrl}`);
      }
    }
    
    console.log('================================\n');
  } catch (error) {
    console.error('Error logging verification links:', error);
  }
};

// Send verification email
export const sendVerificationEmail = async (user: User, token: string): Promise<boolean> => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const verificationUrl = `${baseUrl}/api/verify?token=${token}`;
  const from = process.env.EMAIL_FROM || 'WhoToDate <onboarding@resend.dev>';
  
  // Email HTML content
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #e91e63;">WhoToDate</h1>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h2>Welcome to WhoToDate!</h2>
        <p>Thank you for registering. To verify your email address, please click the button below:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${verificationUrl}" style="background-color: #e91e63; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
        </div>
        <p>Or copy and paste this URL into your browser:</p>
        <p style="background: #eeeeee; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 14px;">${verificationUrl}</p>
        <p>This verification link will expire in 24 hours.</p>
        <p>If you did not create an account, please ignore this email.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
        <p>&copy; ${new Date().getFullYear()} WhoToDate. All rights reserved.</p>
      </div>
    </div>
  `;
  
  // Email text content (fallback for non-HTML email clients)
  const text = `Welcome to WhoToDate! Please verify your email address by clicking the following link: ${verificationUrl}`;
  
  try {
    // Check if we're in development environment (no need for actual email sending)
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    // Development mode - just provide a direct verification link
    if (isDevelopment) {
      console.log('DEVELOPMENT MODE: Email would be sent to', user.email);
      console.log('======== VERIFICATION LINK ========');
      console.log(verificationUrl);
      console.log('==================================');
      
      // Try to use Ethereal for a preview if available
      try {
        if (!transporter) {
          await initializeTransporter();
        }
        
        const info = await transporter.sendMail({
          from: from,
          to: user.email,
          subject: 'Verify your email address',
          text: text,
          html: html
        });
        
        if (info.messageId) {
          console.log('Email preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
      } catch (error: any) {
        console.log('Could not send Ethereal preview email:', error.message);
      }
      
      return true;
    }
    
    // Production mode - send real emails via Resend
    if (useResend && resendClient) {
      console.log(`Sending verification email via Resend to: ${user.email}`);
      
      try {
        const result = await resendClient.emails.send({
          from: from,
          to: user.email,
          subject: 'Verify your email address',
          text: text,
          html: html
        });
        
        if (result.error) {
          console.error('Resend API Error:', result.error);
          throw new Error(result.error.message || 'Unknown Resend error');
        }
        
        console.log('Verification email sent successfully via Resend:', result.data?.id || 'Success');
        return true;
      } catch (error) {
        console.error('Resend API Error:', error);
        throw error; // Re-throw to be caught by the outer try-catch
      }
    } 
    else {
      // We're in production but Resend is not available - this is a critical error
      throw new Error('Email service not properly configured for production use');
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
    
    // In development, we still consider this a success since we've logged the verification link
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    
    return false;
  }
};

// Send a welcome email after verification
export const sendWelcomeEmail = async (user: User): Promise<boolean> => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const from = process.env.EMAIL_FROM || 'WhoToDate <onboarding@resend.dev>';
  
  // Email HTML content
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #e91e63;">WhoToDate</h1>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h2>Welcome to WhoToDate!</h2>
        <p>Thank you for verifying your email address.</p>
        <p>Your account is now fully activated. You can now:</p>
        <ul style="margin: 15px 0;">
          <li>Take our compatibility assessment</li>
          <li>Receive your personalized compatibility profile</li>
          <li>Discover your relationship style</li>
        </ul>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${baseUrl}/dashboard" style="background-color: #e91e63; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
        </div>
        <p>We're excited to help you find your perfect match!</p>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
        <p>&copy; ${new Date().getFullYear()} WhoToDate. All rights reserved.</p>
      </div>
    </div>
  `;
  
  // Email text content (fallback for non-HTML email clients)
  const text = `Thank you for verifying your email address. You can now log in and start using WhoToDate.`;
  
  try {
    // Check if we're in development environment
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    // Development mode - just log welcome message (no need to send email)
    if (isDevelopment) {
      console.log('DEVELOPMENT MODE: Welcome email would be sent to', user.email);
      console.log('======== WELCOME EMAIL CONTENT ========');
      console.log(`Subject: Welcome to WhoToDate!`);
      console.log(`Dashboard Link: ${baseUrl}/dashboard`);
      console.log('======================================');
      
      // Try to use Ethereal for a preview if available
      try {
        if (!transporter) {
          await initializeTransporter();
        }
        
        const info = await transporter.sendMail({
          from: from,
          to: user.email,
          subject: 'Welcome to WhoToDate!',
          text: text,
          html: html
        });
        
        if (info.messageId) {
          console.log('Welcome email preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
      } catch (error: any) {
        console.log('Could not send Ethereal preview welcome email:', error.message);
      }
      
      return true;
    }
    
    // Production mode - send real emails via Resend
    if (useResend && resendClient) {
      console.log(`Sending welcome email via Resend to: ${user.email}`);
      
      try {
        const result = await resendClient.emails.send({
          from: from,
          to: user.email,
          subject: 'Welcome to WhoToDate!',
          text: text,
          html: html
        });
        
        if (result.error) {
          console.error('Resend API Error for welcome email:', result.error);
          throw new Error(result.error.message || 'Unknown Resend error');
        }
        
        console.log('Welcome email sent successfully via Resend:', result.data?.id || 'Success');
        return true;
      } catch (error) {
        console.error('Resend API Error for welcome email:', error);
        throw error; // Re-throw to be caught by the outer try-catch
      }
    } 
    else {
      // We're in production but Resend is not available - this is a critical error
      throw new Error('Email service not properly configured for production use');
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
    
    // In development, we still consider this a success since we've logged the welcome message
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    
    return false;
  }
};