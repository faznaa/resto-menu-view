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
    if(!menu_items || !menu_items.length) {
        return res.status(400).json({ success: false , message: "Please provide menu items" });
    }

    const menu = await Promise.all(menu_items.map(async (item:any) => {
        const {
            _id, ...rest
        } = item
        const menu = await MenuItems.findOneAndUpdate(
            { _id: item._id },
            rest
            );
        return menu;
    }))
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false });
  }
}
