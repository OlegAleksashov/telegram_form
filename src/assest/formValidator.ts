import Joi, { ObjectSchema, ValidationResult } from "joi";

interface Vaidator<T> {
  (payload: T): ValidationResult;
}

const validator =
  <T>(scheme: ObjectSchema): Vaidator<T> =>
  (payload: T) =>
    scheme.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]/)
    .min(9)
    .max(13)
    .required(),
});

export const validateData = validator(signupSchema);
