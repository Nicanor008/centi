import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const InvestmentSchema = new Schema(
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

InvestmentSchema.plugin(mongoosePaginate);
InvestmentSchema.plugin(mongooseUniqueValidator);

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment;
