import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Menu from "@/models/menu";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { email, owner_name, restaurant, color_scheme },
    method
  } = req;

  await dbConnect();
  try {
    if(method!== "POST") {
      return res.status(400).json({ success: false });
  }
    if(!restaurant?.image_url) {
      restaurant.image_url = "https://cdn5.vectorstock.com/i/1000x1000/22/79/restaurant-menu-cover-vector-5022279.jpg"
    }
    const menu = await Menu.create({
      email,
      owner_name,
      restaurant,
      color_scheme,
    });
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
