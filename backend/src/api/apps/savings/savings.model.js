import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const SavingsSchema = new Schema(
  {
    savingsGoalName: {
      type: String,
      required: true
    },
    targetAmount: {
      type: Number,
      required: false
    },
    currentAmount: {
      type: Number,
      required: false,
      default: 0
    },
    maturityDate: {
      type: String, // TODO: Should be date
      required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: Array,
      required: false
    },
    financialGoal: {
      type: Schema.Types.ObjectId,
      ref: "FinancialGoal",
      required: false
    }
    // solo/group
  },
  { timestamps: true }
);

SavingsSchema.plugin(mongoosePaginate);
SavingsSchema.plugin(mongooseUniqueValidator);

const Savings = mongoose.model("Savings", SavingsSchema);
export default Savings;
