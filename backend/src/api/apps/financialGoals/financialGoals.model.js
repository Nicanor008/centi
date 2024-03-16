import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const FinancialGoalsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    targetAmount: {
      type: Number,
      required: false
    },
    category: {
      type: Array,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    from: {
      type: String,
      required: false
    },
    to: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

FinancialGoalsSchema.plugin(mongoosePaginate);
FinancialGoalsSchema.plugin(mongooseUniqueValidator);

const FinancialGoals = mongoose.model("FinancialGoals", FinancialGoalsSchema);
export default FinancialGoals;
