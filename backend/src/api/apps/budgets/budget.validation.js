import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  plannedExpenses: Joi.number(),
  actualExpenses: Joi.number().optional(),
  plannedIncome: Joi.number().optional(),
  actualIncome: Joi.number().optional(),
  isRecurring: Joi.bool().optional(),
  isActive: Joi.bool().optional(),
  category: Joi.array().optional(),
  financialGoal: Joi.string().optional()
});

export const updateValidationSchema = Joi.object({
  name: Joi.string().optional()
}).unknown(true);
