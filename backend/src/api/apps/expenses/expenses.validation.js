import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
    .optional()
    .allow(""),
  plannedExpenses: Joi.number().optional(),
  actualExpenses: Joi.number().optional(),
  budgetId: Joi.string(),
  isRecurring: Joi.bool(),
  isActive: Joi.bool(),
  category: Joi.array().optional(),
  financialGoal: Joi.string().optional()
});

export const updateValidationSchema = Joi.object({
  actualExpenses: Joi.number().optional()
}).unknown(true);
