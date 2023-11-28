import mongoose, { Schema } from "mongoose";

export interface Menu extends mongoose.Document {
  email: string;
  owner_name: string;
  color_scheme: string;
  isActive: boolean;
  restaurant: {
    name: string;
    phone_number: string;
    website: string;
    image_url: string;
    location: {
      address: string;
      url: string;
    };
  };
}

const MenuSchema = new mongoose.Schema<Menu>({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    maxlength: [120, "Name cannot be more than 120 characters"],
  },
  owner_name: {
    type: String,
    maxlength: [100, "Owner's Name cannot be more than 100 characters"],
  },
  restaurant: {
    type: Schema.Types.Mixed,
  },
  color_scheme: {
    type: String,
    default: "schema1",
    enum: ["schema1", "schema2", "schema3"],
  },
  isActive: {
    type: Boolean,
    default: false,
  }
});
const Menus = mongoose.models.Menu || mongoose.model<Menu>("Menu", MenuSchema);

export default Menus