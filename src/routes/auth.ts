import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { signIn, signUp } from '../services/auth';
import { signInSchema, signUpSchema } from '../validation';
import verifyToken from '../middlewares/verify_token';

const router = express.Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  const user = req.user!;
  res.send({ ...user });
});

router.post('/signup', async (req: Request, res: Response) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const {
    firstName, lastName, password, email,
  } = req.body;
  try {
    const user = await signUp({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(200).send({ ...user });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

router.post('/signin', async (req: Request, res: Response) => {
  const { error } = signInSchema.validate(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  const { email, password } = req.body;
  try {
    const user = await signIn({ email, password });
    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

    res.status(200).send({
      token: jwtToken,
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

export default router;
