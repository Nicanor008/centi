import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  targetAmount: Joi.number().optional(),
  category: Joi.array().optional(),
  description: Joi.string().optional(),
  from: Joi.string().optional(),
  to: Joi.string().optional()
});

export const updateValidationSchema = Joi.object({
  field: Joi.string().optional(),
  field2: Joi.string().optional()
}).unknown(true);
