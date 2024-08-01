import { bearerSplitter } from '../utils/bearerSplitter';
import { Request, Response, NextFunction } from 'express';
import Token from '../utils/token';
import { blackListToken } from '../controller/authController';

export function authGuard(req: Request, res: Response, next: NextFunction) {
  
  // Check if token is blacklisted
  if(blackListToken.includes(bearerSplitter(req.headers.authorization || ''))){
    res.status(401).json({ message: 'Unauthorized' });
  }
  
  const isAuthenticated = Token.verifyToken(
    bearerSplitter(req.headers.authorization || '')
  );

  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}