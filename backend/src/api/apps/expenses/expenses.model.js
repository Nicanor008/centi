import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const ExpensesSchema = new Schema(
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
    isRecurring: {
      type: Boolean,
      required: false,
      default: false
    },
    budgetId: {
      type: Schema.Types.ObjectId,
      ref: "Budget",
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
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    // currencyId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Currency",
    //   required: true,
    //   default: "USD" // TODO: update to USD id value
    // },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },
    // financialGoal: {
    //   type: Schema.Types.ObjectId,
    //   ref: "FinancialGoal",
    //   required: false
    // },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  { timestamps: true }
);

ExpensesSchema.plugin(mongoosePaginate);
ExpensesSchema.plugin(mongooseUniqueValidator);

const Expenses = mongoose.model("Expenses", ExpensesSchema);
export default Expenses;
