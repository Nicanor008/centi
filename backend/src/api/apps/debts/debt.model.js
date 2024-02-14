import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const DebtSchema = new Schema(
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

DebtSchema.plugin(mongoosePaginate);
DebtSchema.plugin(mongooseUniqueValidator);

const Debt = mongoose.model("Debt", DebtSchema);
export default Debt;
