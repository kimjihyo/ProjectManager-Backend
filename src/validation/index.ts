import Joi from 'joi';

export const signUpSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
});

export const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
