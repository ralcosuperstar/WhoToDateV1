import twilio from 'twilio';
import { User } from '@shared/schema';
import crypto from 'crypto';
import { IStorage } from './storage';

// Initialize Twilio client
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

let twilioClient: twilio.Twilio | null = null;
let twilioConfigured = false;

// Initialize Twilio client
function initTwilioClient() {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.warn('❌ Twilio credentials not provided. SMS verification will not work.');
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
  // Generate a 6-digit number
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Calculate OTP expiry (10 minutes from now)
export const generateOTPExpiry = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now
};

// Send OTP via SMS
export const sendOTPViaSMS = async (phoneNumber: string, otp: string): Promise<boolean> => {
  if (!twilioConfigured) {
    if (!initTwilioClient()) {
      console.error('Cannot send SMS: Twilio is not configured');
      return false;
    }
  }

  try {
    // Ensure phone number is in E.164 format (add +91 for India if not present)
    const formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `+91${phoneNumber.replace(/[^0-9]/g, '')}`;

    console.log(`Sending OTP to ${formattedPhone}`);

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