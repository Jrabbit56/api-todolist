import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as  dotenv from "dotenv";
import { AuthService } from '../services/authService';


dotenv.config()

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, 'process.env.JWT_SECRET', (err: any, user: any) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token expired, try to refresh
        const refreshToken = req.cookies['refreshToken']; // Assume refresh token is stored in a secure httpOnly cookie
        if (refreshToken) {
          const authService = new AuthService();
          authService.refreshAccessToken(refreshToken)
            .then(newTokens => {
              if (newTokens) {
                res.setHeader('Authorization', `Bearer ${newTokens.accessToken}`);
                req.user = jwt.decode(newTokens.accessToken);
                next();
              } else {
                res.sendStatus(403);
              }
            })
            .catch(() => res.sendStatus(403));
        } else {
          res.sendStatus(403);
        }
      } else {
        return res.sendStatus(403);
      }
    } else {
      req.user = user;
      next();
    }
  });
};



