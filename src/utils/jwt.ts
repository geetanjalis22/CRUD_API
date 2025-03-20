//For Authentication
/*import jwt, { Secret, SignOptions } from 'jsonwebtoken';
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secure-secret';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '30d';

export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};*/
// src/utils/jwt.ts
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// Load private and public keys
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

const signOptions: SignOptions = {
  algorithm: 'RS256',
  expiresIn: (process.env.JWT_EXPIRES_IN || '30d') as '30d' | '2h' | '1d'


};

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, PRIVATE_KEY, signOptions);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, PUBLIC_KEY);
};

