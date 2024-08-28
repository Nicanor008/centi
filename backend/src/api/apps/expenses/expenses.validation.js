import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
    .optional()
    .allow(""),
  plannedExpenses: Joi.string().optional().allow(""),
  actualExpenses: Joi.string().optional().allow(""),
  budgetId: Joi.string(),
  isRecurring: Joi.bool(),
  isActive: Joi.bool(),
  category: Joi.array().optional(),
  financialGoal: Joi.string().optional()
});

export const updateValidationSchema = Joi.object({
  actualExpenses: Joi.string().optional().allow("")
}).unknown(true);
