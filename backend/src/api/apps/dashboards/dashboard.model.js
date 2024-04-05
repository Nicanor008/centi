import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";

const DashboardSchema = new Schema(
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

DashboardSchema.plugin(mongoosePaginate);
DashboardSchema.plugin(mongooseUniqueValidator);

const Dashboard = mongoose.model("Dashboard", DashboardSchema);
export default Dashboard;
