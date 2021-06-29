import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUserInfoById } from '../services/auth';

interface AuthToken {
  id: string
}

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<undefined> => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).send({ message: 'Access Denied' });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await getUserInfoById((verified as AuthToken).id);
    if (!user) {
      throw new Error('Invalid Token');
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
  }
};

export default verifyToken;
