import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
    .optional()
    .allow(""),
  plannedExpenses: Joi.number(),
  actualExpenses: Joi.number().optional().allow(0),
  plannedIncome: Joi.number().optional().allow(0),
  actualIncome: Joi.number().optional().allow(0),
  isRecurring: Joi.bool().optional(),
  isActive: Joi.bool().optional(),
  category: Joi.array().optional(),
  financialGoal: Joi.string().optional().allow("")
});

export const updateValidationSchema = Joi.object({
  actualExpenses: Joi.number().required(),
  name: Joi.string().optional()
}).unknown(true);
