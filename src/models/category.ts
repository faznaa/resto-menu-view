import mongoose, { Schema } from "mongoose";

export interface Category extends mongoose.Document {
  restaurant_id: Schema.Types.ObjectId;
  name: string;
  description: string;
  image_url: string;
}

const CategorySchema = new mongoose.Schema<Category>({
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: [true, "Please provide your restaurant id"],
    },
    name: {
        type: String,
        required: [true, "Please provide Category Name"],
        maxlength: [120, "Name cannot be more than 120 characters"],
    },
    description: {
        type: String,
        maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    image_url: {
        type: String,
    },
});
const Categorys = mongoose.models.Category || mongoose.model<Category>("Category", CategorySchema);

export default Categorys