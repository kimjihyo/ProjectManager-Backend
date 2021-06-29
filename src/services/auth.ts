import bcrypt from 'bcrypt';
import User from '../models/user';

type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type SignInParams = {
  email: string;
  password: string;
}

const hash = async (code: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(code, salt);
  return hashed;
};

export const signUp = async ({
  firstName, lastName, email, password,
}: SignUpParams): Promise<User> => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error('A user with the email address already exists');
  }
  const dbUser = new User({
    firstName,
    lastName,
    email,
    password: await hash(password),
  });

  dbUser.save();

  return {
    id: dbUser._id,
    firstName,
    lastName,
    email,
    joinedAt: dbUser.joinedAt,
    role: dbUser.role,
  };
};

export const signIn = async ({ email, password }: SignInParams): Promise<User> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('A user with the email address does not exist');
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    throw new Error('Incorrect Password');
  }
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    joinedAt: user.joinedAt,
    role: user.role,
  };
};

export const getUserInfoById = async (uid: string): Promise<User | null> => {
  const user = await User.findById(uid);
  if (user) {
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      joinedAt: user.joinedAt,
      role: user.role,
    };
  }
  return null;
};
