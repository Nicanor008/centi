import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const BudgetSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    plannedExpenses: {
      type: String,
      required: false
    },
    actualExpenses: {
      type: String,
      required: false
    },
    plannedIncome: {
      type: String,
      required: false
    },
    actualIncome: {
      type: String,
      required: false
    },
    isRecurring: {
      type: Boolean,
      required: false,
      default: false
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    },
    category: {
      type: Array,
      required: false
    },
    financialGoal: {
      type: Schema.Types.ObjectId,
      ref: "FinancialGoal",
      required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
    // TODO: Add reminderMeOn: ["date1", "date2", "date3"]
  },
  { timestamps: true }
);

BudgetSchema.plugin(mongoosePaginate);
BudgetSchema.plugin(mongooseUniqueValidator);

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;
