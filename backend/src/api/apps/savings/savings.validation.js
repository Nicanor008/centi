import Joi from "joi";
import { schemas } from "../../helpers";

const { paginateValidationSchema, ObjectId } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

export const createValidationSchema = Joi.object({
  savingsGoalName: Joi.string().required(),
  amount: Joi.string().required(),
  maturityDate: Joi.string().required(),
  category: Joi.array().optional(),
  financialGoal: Joi.string().optional()
});

export const updateValidationSchema = Joi.object({
  field: Joi.string().optional(),
  field2: Joi.string().optional()
}).unknown(true);
