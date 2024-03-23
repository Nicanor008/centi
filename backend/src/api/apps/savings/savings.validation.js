import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema, ObjectId } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  savingsGoalName: Joi.string().required(),
  targetAmount: Joi.number().optional(),
  currentAmount: Joi.number().optional(),
  maturityDate: Joi.string().optional(),
  category: Joi.array().optional(),
  financialGoal: Joi.string().optional()
});

export const updateValidationSchema = Joi.object({
  field: Joi.string().optional(),
  field2: Joi.string().optional()
}).unknown(true);
