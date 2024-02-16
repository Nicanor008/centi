import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const BudgetItemsSchema = new Schema(
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

BudgetItemsSchema.plugin(mongoosePaginate);
BudgetItemsSchema.plugin(mongooseUniqueValidator);

const BudgetItems = mongoose.model("BudgetItems", BudgetItemsSchema);
export default BudgetItems;
