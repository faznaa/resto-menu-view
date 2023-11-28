import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Menu from '@/models/menu'
import MenuItems from '@/models/menu-items'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const menu_items = await MenuItems.find({ restaurant_id: id }).exec()
        const menu = await Menu.findById(id).exec()
        const result = {
            menu_items,
            menu
        }
        if (!result) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: result })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

 
    default:
      res.status(400).json({ success: false })
      break
  }
}