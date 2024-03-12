import { Service } from "../../../helpers/common";
import Category from "./category.model";

class CategoryService extends Service {
  constructor() {
    super(Category);
  }
  async create(data) {
    return await Category.create(data);
  }

  // view category as per user
  async viewAllCategoriesPerUser() {
    return await Category.find();
  }
}

export default new CategoryService();
