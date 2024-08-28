import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
    .optional()
    .allow(""),
  plannedExpenses: Joi.string(),
  actualExpenses: Joi.string().optional().allow(""),
  plannedIncome: Joi.string().optional().allow(""),
  actualIncome: Joi.string().optional().allow(""),
  isRecurring: Joi.bool().optional(),
  isActive: Joi.bool().optional(),
  category: Joi.array().optional(),
  financialGoal: Joi.string().optional().allow("")
});

export const updateValidationSchema = Joi.object({
  actualExpenses: Joi.number().required(),
  name: Joi.string().optional()
}).unknown(true);
