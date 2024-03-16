import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const BudgetItemsSchema = new Schema(
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
      type: Number,
      required: false
    },
    actualExpenses: {
      type: Number,
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

BudgetItemsSchema.plugin(mongoosePaginate);
BudgetItemsSchema.plugin(mongooseUniqueValidator);

const BudgetItems = mongoose.model("BudgetItems", BudgetItemsSchema);
export default BudgetItems;
