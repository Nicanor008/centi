import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  plannedExpenses: Joi.number(),
  actualExpenses: Joi.number(),
  plannedIncome: Joi.number(),
  actualIncome: Joi.number(),
  isRecurring: Joi.bool(),
  isActive: Joi.bool(),
  category: Joi.array().optional()
});

export const updateValidationSchema = Joi.object({
  name: Joi.string().optional()
}).unknown(true);
