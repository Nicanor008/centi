import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const SavingsSchema = new Schema(
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

SavingsSchema.plugin(mongoosePaginate);
SavingsSchema.plugin(mongooseUniqueValidator);

const Savings = mongoose.model("Savings", SavingsSchema);
export default Savings;
