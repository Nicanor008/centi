import Joi from "joi";
import { schemas } from "../../../helpers";

const { paginateValidationSchema, ObjectId } = schemas;

export const customPaginateValidateSchema = paginateValidationSchema.keys();

// export const createValidationSchema = Joi.any({
//   name: Joi.any().required()
// }).unknown(true);

export const updateValidationSchema = Joi.object({
  name: Joi.string().optional()
}).unknown(true);
