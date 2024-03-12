import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },
  },
  { timestamps: true }
);

CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(mongooseUniqueValidator);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
