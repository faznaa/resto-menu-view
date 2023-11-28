import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ItemsTable from '@/components/table'
import Modal from '@/components/modal'
import axios from 'axios'
import AddMenuItem from '@/components/addItem'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

export default function Menu() {
    const router = useRouter()
    const { id } = router.query
    const {
      data,
      mutate,
      error,
      isLoading,
    } = useSWR(id ? `/api/menu/${id}` : null, fetcher)
    useEffect(() => {
      
    console.log(data)
    }, [data])
    
    const editClick = (item_id:string) => {
      const _item = data?.menu_items?.find((item:any) => item._id === item_id)
      if(_item){
        setItem(_item)
        setOpen(true)
      }
    }
    const [open, setOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)

    const initData = {
      name:"",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price:"",
      image_url:"https://cdn-icons-png.flaticon.com/512/5787/5787100.png",
      vegColor:"green"
  }
  const [item,setItem] = useState(initData)
  const handleChange = (e:any) => {
      setItem({...item,[e.target.name]:e.target.value})
  }
  const handleSubmit = async() => {
    const _item = {
      ...item,
      price:parseInt(item.price) 
    }
    const _result = await axios.post('/api/menu/update',{
      menu_items : [_item],
      restaurant_id: id
  }) 
  console.log(_result)
  if(_result.status === 200){
    console.log('success')
    setItem(initData)
    setOpen(false)
    mutate()
  }else {
    alert('Something happened')
  }

  }
  return (
    <div className='min-h-screen bg-gray-200 p-6 sm:px-24 sm:py-20'>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Menu</h1>
            <p className="mt-2 text-sm text-gray-700">
              Add , Update and Delete your menu items here.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => setAddOpen(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Item
            </button>
          </div>
        </div>
        {data?.menu_items &&<ItemsTable editClick={editClick} id={id} items={data?.menu_items} />}
        <Modal title="Edit Item" open={open} setOpen={setOpen} handleSubmit={handleSubmit} >
          <div className='bg-white px-4 py-4'>
            <div className="space-y-12">
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Edit Item</h2>
                <p className="text-xl text-gray-500">Edit the details of the item to be updated.</p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      value={item.name}
                      onChange={handleChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Description
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={item.description}
                      onChange={handleChange}
                      className="max-w-lg shadow-sm block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                      defaultValue={''}
                    />
                    <p className="mt-2 text-sm text-gray-500">Write a few sentences about the item.</p>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Price
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      autoComplete="price"
                      value={item.price}
                      onChange={handleChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                  <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    Image URL
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="image_url"
                      name="image_url"
                      type="text"
                      value={item.image_url}
                      onChange={handleChange}
                      autoComplete="image_url"
                      className="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="sm:col-span-3">
              <label htmlFor="vegColor" className="block text-sm font-medium leading-6 text-gray-900">
                Food Type (Veg/Non-Veg/Egg)
              </label>
              <div className="mt-2">
                <select
                  id="vegColor"
                  name="vegColor"
                  defaultValue={item?.vegColor}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="green">Pure Veg</option>
                  <option value="orange">Egg</option>
                  <option value="red">Meat</option>
                </select>
              </div>
            </div>
                  </div>
                  
                </div>
                </div>
                </div>

        </Modal>

        <Modal title="Add New Item" open={addOpen} setOpen={setAddOpen} handleSubmit={handleSubmit} removeDefaultSubmitBtn={true}>
          <AddMenuItem id={id} onClose={()=> setAddOpen(false)}/>
        </Modal>
    </div>
  )
}
