import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import MenuItems from "@/models/menu-items";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { menu_items, restaurant_id },
    method
  } = req;

  await dbConnect();
  try {
    if(method!== "POST") {
        return res.status(400).json({ success: false });
    }
    if(!restaurant_id) {
        return res.status(400).json({ success: false , message: "Please provide restaurant ID" });
    }
    if(!menu_items || !menu_items.length) {
        return res.status(400).json({ success: false , message: "Please provide menu items" });
    }
    const menu = await MenuItems.insertMany(
        menu_items.map((item:any) => ({...item, restaurant_id, image_url: item?.image_url ? item.image_url : "https://cdn-icons-png.flaticon.com/512/5787/5787100.png"}))
    );
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false });
  }
}
