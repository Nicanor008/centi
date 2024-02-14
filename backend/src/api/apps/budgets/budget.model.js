import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const BudgetSchema = new Schema(
  {
    field: {
      type: String,
      required: true
    },
    field2: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

BudgetSchema.plugin(mongoosePaginate);
BudgetSchema.plugin(mongooseUniqueValidator);

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;
