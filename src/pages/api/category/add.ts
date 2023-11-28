import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import MenuItems from "@/models/menu-items";
import Categorys from "@/models/category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { categories, restaurant_id },
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
    if(!categories || !categories.length) {
        return res.status(400).json({ success: false , message: "Please provide categories" });
    }
    const _categories = await Categorys.insertMany(
        categories.map((item:any) => ({...item, restaurant_id, image_url: item?.image_url ? item.image_url : "https://cdn-icons-png.flaticon.com/512/5787/5787100.png"}))
    );
    res.status(200).json({ success: true, data: _categories });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false });
  }
}
