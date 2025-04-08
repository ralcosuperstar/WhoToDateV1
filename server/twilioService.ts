import twilio from 'twilio';
import { User } from '@shared/schema';
import crypto from 'crypto';
import { IStorage } from './storage';

// Initialize Twilio client
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const DEV_MODE = process.env.NODE_ENV !== 'production';

// Store OTPs in memory for development mode only
type OTPStore = Record<string, string>;
const devOTPStore: OTPStore = {};

let twilioClient: twilio.Twilio | null = null;
let twilioConfigured = false;

// Initialize Twilio client
function initTwilioClient() {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.warn('❌ Twilio credentials not provided. SMS verification will use dev mode.');
    return false;
  }

  try {
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    twilioConfigured = true;
    console.log('✅ Twilio client initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Twilio client:', error);
    twilioConfigured = false;
    return false;
  }
}

// Generate a random 6-digit OTP code
export const generateOTP = (): string => {
  // For testing consistency, use a fixed OTP in development mode
  if (DEV_MODE) {
    return "123456";
  }
  
  // Generate a 6-digit number for production
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Calculate OTP expiry (10 minutes from now)
export const generateOTPExpiry = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now
};

// Send OTP via SMS
export const sendOTPViaSMS = async (phoneNumber: string, otp: string): Promise<boolean> => {
  // Ensure phone number is in E.164 format (add +91 for India if not present)
  const formattedPhone = phoneNumber.startsWith('+') 
    ? phoneNumber 
    : `+91${phoneNumber.replace(/[^0-9]/g, '')}`;

  console.log(`Sending OTP to ${formattedPhone}`);
  
  // Store OTP in memory for development
  if (DEV_MODE) {
    devOTPStore[formattedPhone] = otp;
    console.log(`✅ DEV MODE: OTP for ${formattedPhone} is ${otp}`);
    return true;
  }

  // For production, use Twilio
  if (!twilioConfigured) {
    if (!initTwilioClient()) {
      console.error('Cannot send SMS: Twilio is not configured');
      return false;
    }
  }

  try {
    // Send the message via Twilio
    if (twilioClient) {
      const message = await twilioClient.messages.create({
        body: `Your WhoToDate verification code is: ${otp}. It will expire in 10 minutes.`,
        from: TWILIO_PHONE_NUMBER,
        to: formattedPhone
      });

      console.log(`✅ SMS sent successfully, SID: ${message.sid}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

// Verify OTP
export const verifyOTP = async (db: IStorage, userId: number, otp: string): Promise<boolean> => {
  try {
    // Get the user
    const user = await db.getUser(userId);
    
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return false;
    }

    // In development mode, accept hardcoded OTP for faster testing
    if (DEV_MODE && otp === "123456") {
      console.log("✅ DEV MODE: Accepting hardcoded OTP");
      await db.verifyUser(userId);
      return true;
    }

    // Check if user's phone number is in devOTPStore
    if (DEV_MODE && user.phoneNumber) {
      const formattedPhone = user.phoneNumber.startsWith('+') 
        ? user.phoneNumber 
        : `+91${user.phoneNumber.replace(/[^0-9]/g, '')}`;
      
      // If dev OTP matches, accept it
      if (devOTPStore[formattedPhone] && devOTPStore[formattedPhone] === otp) {
        console.log(`✅ DEV MODE: Matched stored OTP for ${formattedPhone}`);
        await db.verifyUser(userId);
        return true;
      }
    }

    // Standard OTP validation for production
    // Check if OTP exists and is valid
    if (!user.otpCode || user.otpCode !== otp) {
      console.error('Invalid OTP code');
      return false;
    }

    // Check if OTP is expired
    const now = new Date();
    if (!user.otpExpiry || new Date(user.otpExpiry) < now) {
      console.error('OTP has expired');
      return false;
    }

    // Verify the user
    await db.verifyUser(userId);
    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
};

// Initialize the Twilio client when this module is imported
initTwilioClient();