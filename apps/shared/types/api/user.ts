// Generated Prisma Client types for User
import { Track } from './track';

export interface User {
  id: string;
  username: string;
  email: string;
  tracks?: Track[];
}
