import { UserAttributes } from '../user.type'; 

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

export {};