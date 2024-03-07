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
      type: Number,
      required: false
    },
    actualExpenses: {
      type: Number,
      required: false
    },
    plannedIncome: {
      type: Number,
      required: false
    },
    actualIncome: {
      type: Number,
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
    }
    // TODO: Add reminderMeOn: ["date1", "date2", "date3"]
  },
  { timestamps: true }
);

BudgetSchema.plugin(mongoosePaginate);
BudgetSchema.plugin(mongooseUniqueValidator);

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;
