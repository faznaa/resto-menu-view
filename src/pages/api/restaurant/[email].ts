import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Menu from '@/models/menu'
import MenuItems from '@/models/menu-items'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { email },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const menu = await Menu.find({ email }).exec()
        console.log(menu)
        if (!menu) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: menu })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

 
    default:
      res.status(400).json({ success: false })
      break
  }
}