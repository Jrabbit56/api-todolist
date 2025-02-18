import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { LoginRequest, RegisterRequest ,LogoutRequest} from '../types/users/auth';
import jwt from 'jsonwebtoken';

export const blackListToken: string [] = []

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    const { email, password } = req.body;

    console.log(email,password);
    
  
    try {
      const user = await this.authService.validateUser(email, password);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate token
      const token = this.authService.generateToken(user);
  
      // Send token and user.id in response
      res.json({ token, userId: user.id });
      // res.status(200).json({
      //   accessToken: Token.generateToken(user),//  send access token to front end
      //   // refreshToken: Token.generateToken(user, '7d'),
      // });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  };
  
  register = async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await this.authService.registerUser(email, password);
      const token = this.authService.generateToken(user);
      res.status(201).json({ 
        message: 'User registered successfully',
        user: { id: user.id, email: user.email },
        token 
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        res.status(409).json({ message: 'User already exists' });
      } else {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
      }
    }
  }


  logout = async (req: Request<{}, {}, LogoutRequest>, res: Response) => {
    
      const token = req.headers.authorization?.split(' ')[1];
      console.log(token);
      
      if (!token) {
        return res.status(400).json({ message: 'No token provided' });
      }

      blackListToken.push(token)
      return res.status(200).json({ message: 'Logged out successfully' });
    
  }



}