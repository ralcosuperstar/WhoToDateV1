import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { User } from '@shared/schema';

// Create a testing transporter for development that uses Ethereal Email
// This creates a temporary test account for development
const createDevTransporter = async () => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  console.log('Created Ethereal test account:', testAccount.user);
  console.log('Ethereal password:', testAccount.pass);

  // Create a transporter using the test account
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

// In production environment, we can use actual SMTP settings
const createProdTransporter = () => {
  // Use actual SMTP settings for production
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Boolean(process.env.SMTP_SECURE) || false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
};

// Initialize transporter
let transporter: nodemailer.Transporter;

// Initialize the transporter asynchronously
async function initializeTransporter() {
  if (process.env.NODE_ENV === 'production') {
    transporter = createProdTransporter();
  } else {
    transporter = await createDevTransporter();
  }
  return transporter;
}

// Initialize immediately
initializeTransporter().catch(err => {
  console.error('Failed to initialize email transporter:', err);
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

// Send verification email
export const sendVerificationEmail = async (user: User, token: string): Promise<boolean> => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const verificationUrl = `${baseUrl}/api/verify?token=${token}`;
  
  try {
    // Make sure the transporter is initialized
    if (!transporter) {
      await initializeTransporter();
    }
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"WhoToDate" <noreply@whotodate.com>',
      to: user.email,
      subject: 'Verify your email address',
      text: `Welcome to WhoToDate! Please verify your email address by clicking the following link: ${verificationUrl}`,
      html: `
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
      `
    });
    
    // For development, log the preview URL provided by Ethereal
    if (process.env.NODE_ENV !== 'production' && info.messageId) {
      console.log('Email verification preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Send a welcome email after verification
export const sendWelcomeEmail = async (user: User): Promise<boolean> => {
  try {
    // Make sure the transporter is initialized
    if (!transporter) {
      await initializeTransporter();
    }
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"WhoToDate" <noreply@whotodate.com>',
      to: user.email,
      subject: 'Welcome to WhoToDate!',
      text: `Thank you for verifying your email address. You can now log in and start using WhoToDate.`,
      html: `
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
              <a href="${process.env.BASE_URL || 'http://localhost:5000'}/dashboard" style="background-color: #e91e63; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
            </div>
            <p>We're excited to help you find your perfect match!</p>
          </div>
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
            <p>&copy; ${new Date().getFullYear()} WhoToDate. All rights reserved.</p>
          </div>
        </div>
      `
    });
    
    // For development, log the preview URL provided by Ethereal
    if (process.env.NODE_ENV !== 'production' && info.messageId) {
      console.log('Welcome email preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};