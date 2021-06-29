export {};

declare global {
  export type User = {
    id: string;
    firstName: string;
    lastName: string;
    joinedAt: Date;
    email: string;
    role: string;
  };

  namespace Express {
    interface Request {
      user?: User
    }
  }
}
