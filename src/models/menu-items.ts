import mongoose, { Schema } from "mongoose";

type FoodVegColor = "green" | "orange" | "red";

export interface Item extends mongoose.Document {
  restaurant_id: Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image_url: string;
  currency: string;
  isVeg: boolean;
  vegColor: FoodVegColor;
  category_id: Schema.Types.ObjectId;
}

const MenuItemsSchema = new mongoose.Schema<Item>({
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
    required: [true, "Please provide your restaurant id"],
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
    required: [true, "Please provide Food Item Name"],
    maxlength: [120, "Name cannot be more than 120 characters"],
  },
  description: {
    type: String,
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide Food Item Price"],
  },
  image_url: {
    type: String,
    required: [true, "Please provide Food Item Image URL"],
  },
  currency: {
    type: String,
    default: "INR",
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
  vegColor: {
    type: String,
    default: "green",
    enum: ["green", "orange", "red"],
  },
});

const MenuItems =
  mongoose.models.Item || mongoose.model<Item>("Item", MenuItemsSchema);
export default MenuItems;
