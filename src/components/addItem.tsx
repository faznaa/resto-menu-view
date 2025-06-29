/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Input = ({ label, ...props }:any) => (
  <div className="flex flex-col mb-4">
    <label className="mb-2 font-bold text-md text-left text-gray-900" htmlFor={props.id}>
      {label}
    </label>
    <input
      className="border py-2 px-3 text-gray-900"
      {...props}
    />
  </div>
)

const Button = ({ children, ...props }: any) => (
  <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    {...props}
  >
    {children}
  </button>
);

export const DUMMY_DATA = {
  name: '',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  price: '',
  image_url: 'https://familystylefood.com/wp-content/uploads/2023/06/Chicken-Pesto-Pasta.jpg',
  vegColor: 'green',
};
export default function AddMenuItem({ id, handleAddMenu, onClose }: any) {
  const [item, setItem] = useState(DUMMY_DATA);
  const handleChange = (e: any) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const cancel = () => {
    setItem(DUMMY_DATA);
    onClose();
  };

  return (
    <div className="bg-white px-4 py-4">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-sm leading-6 text-gray-600"></p>
          <Input type="text" label="Name" name="name" value={item?.name} onChange={handleChange} />
          <Input
            type="textarea"
            label="Description"
            name="description"
            value={item?.description}
            onChange={handleChange}
          />
          <Input label="Price" name="price" value={item?.price} onChange={handleChange} />
          <Input
            label="Image URL"
            name="image_url"
            value={item?.image_url}
            onChange={handleChange}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="vegColor"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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

      <div className="mt-6 flex w-full items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={cancel}
          className="rounded-md w-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleAddMenu(item)}
          className="rounded-md w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}
