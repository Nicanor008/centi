import mongoose, { Schema } from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";
// import mongooseUniqueValidator from "mongoose-unique-validator";

const AIGeneratedBudgetSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    userBudget: { type: String, required: true },
    userDescription: { type: String, required: true },
    generatedBudget: { type: Object, required: true },
  },
  { timestamps: true }
);

// AIGeneratedBudgetSchema.plugin(mongoosePaginate);
// AIGeneratedBudgetSchema.plugin(mongooseUniqueValidator);

const AIGeneratedBudget = mongoose.model("AIGeneratedBudget", AIGeneratedBudgetSchema);

export default AIGeneratedBudget;
