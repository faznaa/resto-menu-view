import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemsTable from '@/components/table';
import Modal from '@/components/modal';
import AddMenuItem from '@/components/addItem';
import { SAMPLE_FOOD_OPTIONS } from '@/consts/suggestions';
import { MenuItem, MenuProvider, useMenuItem } from '@/hooks/useMenuItem';
import axios from 'axios';

export function MenuContent() {
  const { restaurantId, menuData, menuItems, addMenuItem, editMenuItem, mutate } = useMenuItem();

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const initData = {
    name: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '',
    image_url: 'https://cdn-icons-png.flaticon.com/512/5787/5787100.png',
    vegColor: 'green',
  } as const;

  const [item, setItem] = useState<MenuItem>(initData);

  const handleChange = (e: any) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleAddMenu = async (food: any) => {
    try {
      await addMenuItem(food);
      setItem(initData);
      setAddOpen(false);
    } catch (err) {
      console.error(err);
      alert('Something happened');
    }
  };

  const editClick = (item_id: string) => {
    const _item = menuItems?.find((item: any) => item._id === item_id);
    if (_item) {
      setItem(_item);
      setOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 sm:px-24 sm:py-20">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Menu</h1>
          <p className="mt-2 text-sm text-gray-700">Add, Update and Delete your menu items here.</p>
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

      <div className="flex flex-wrap gap-4 gap-y-2 mt-4">
        {SAMPLE_FOOD_OPTIONS.filter((food) => !menuItems?.map((i) => i.name).includes(food.name))
          .slice(8)
          .map((food) => (
            <button
              key={food.name}
              onClick={() => handleAddMenu(food)}
              className="bg-red-50 border border-red-300 rounded-2xl px-3 text-sm text-gray-600 py-1"
            >
              {food.name}
            </button>
          ))}
      </div>

      {menuData?.menu_items && (
        <ItemsTable editClick={editClick} id={restaurantId} items={menuData.menu_items} />
      )}

      <Modal title="Edit Item" open={open} setOpen={setOpen} handleSubmit={editMenuItem}>
        {/* Same form layout as before */}
        {/* ... form input fields ... */}
        <div className="bg-white px-4 py-4">
          {/* form UI same as your original code — keep it unchanged here */}
        </div>
      </Modal>

      <Modal
        title="Add New Item"
        open={addOpen}
        setOpen={setAddOpen}
        handleSubmit={handleAddMenu}
        removeDefaultSubmitBtn={true}
      >
        <AddMenuItem
          id={restaurantId}
          handleAddMenu={handleAddMenu}
          onClose={() => setAddOpen(false)}
        />
      </Modal>
    </div>
  );
}
