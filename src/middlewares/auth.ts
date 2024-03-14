import { Request, Response, NextFunction } from 'express';
import response from '../helpers/response';
import { verify } from '../helpers/jwt';

interface AuthenticatedRequest extends Request {
  token?: string;
  user?: { role: string,id:string };
}

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) throw new Error("You don't have access to do that action");
    const token = authHeader.replace('Bearer ', '');
    const user = verify(token) as { role: string };
    if (user.role !== 'admin') {
      response(res, 403, "You don't have access to do that action", null, 'FORBIDDEN');
      return;
    }
    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    const caughtError = error as Error;
    response(res, 401, caughtError.message || 'Error occurred', null, 'AUTHENTICATION_ERROR');
    return;
  }
};
