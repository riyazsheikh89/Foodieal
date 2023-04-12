import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_KEY = process.env.JWT_KEY;
export const MONGODB_URL = process.env.MONGODB_URL;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// EMAIL SERVICE SETTINGS:
export const HOST = process.env.HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const HOST_EMAIL_ID = process.env.HOST_EMAIL_ID;
export const EMAIL_APP_PASS = process.env.EMAIL_APP_PASS;