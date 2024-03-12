import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  plannedExpenses: Joi.number().optional(),
  actualExpenses: Joi.number().optional(),
  budgetId: Joi.string(),
  isRecurring: Joi.bool(),
  isActive: Joi.bool()
});

export const updateValidationSchema = Joi.object({
  field: Joi.string().optional(),
  field2: Joi.string().optional()
}).unknown(true);
