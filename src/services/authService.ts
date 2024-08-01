import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../db/db";
import { users } from '../models/user.model';
import { eq } from 'drizzle-orm';

export class AuthService {

  async validateUser(email: string, password: string) {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (user.length === 0) {
      return null;
    }
    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid) {
      return null;
    }
    return { id: user[0].id, email: user[0].email };
  }

  generateToken(user: { id: number; email: string }) {
    return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }

  async registerUser(email: string, password: string) {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the new user
    await db.insert(users).values({
      email,
      password: hashedPassword,
    });

    // Fetch the new created user
    const newUser = await db.select({
      id: users.id,
      email: users.email
    }).from(users).where(eq(users.email, email)).limit(1);

    if (newUser.length === 0) {
      throw new Error('Failed to create user');
    }

    return newUser[0];
  }
}