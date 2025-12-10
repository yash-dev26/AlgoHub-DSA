import dotenv from 'dotenv';
dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
}