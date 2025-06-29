'use client';
import React, { createContext, useContext } from 'react';
import useSWR from 'swr';
import axios from 'axios';

export type MenuItem = {
  name: string;
  description: string;
  price: number | string;
  vegColor: 'green' | 'red' | 'orange';
  image?: string;
};

type Location = {
  address: string;
  url: string;
};

type CreateMenuPayload = {
  restaurant: {
    name: string;
    phoneNumber: number;
    location: Location;
  };
  owner_name: string;
  color_scheme: string;
  email: string;
};

type MenuContextType = {
  restaurantId: string;
  menuData: any;
  menuItems: MenuItem[];
  createMenu: (payload: CreateMenuPayload) => Promise<void>;
  addMenuItem: (item: MenuItem) => Promise<void>;
  editMenuItem: (item: MenuItem) => Promise<void>;
  mutate: () => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const MenuProvider = ({
  restaurantId,
  children,
}: {
  restaurantId: string;
  children: React.ReactNode;
}) => {
  const { data: menuData, mutate } = useSWR(`/api/menu/${restaurantId}`, fetcher);

  const editMenuItem = async (item: any) => {
    try {
      const _item = {
        ...item,
        price: parseInt(item.price),
      };

      const res = await axios.post('/api/menu/update', {
        menu_items: [_item],
        restaurant_id: restaurantId,
      });

      if (res.status === 200) {
        console.log('Edit success');
        mutate();
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('editItem error:', error);
      alert('Something went wrong');
    }
  };

  const createMenu = async (payload: CreateMenuPayload) => {
    try {
      const res = await axios.post('/api/menu/create', payload);
      if (res.status === 200) {
        mutate();
      } else {
        alert('Failed to create menu');
      }
    } catch (error) {
      console.error('createMenu error:', error);
      alert('Something went wrong');
    }
  };

  const addMenuItem = async (item: MenuItem) => {
    try {
      const res = await axios.post('/api/menu/add', {
        menu_items: [{ ...item, price: parseInt(item.price.toString()) }],
        restaurant_id: restaurantId,
      });
      if (res.status === 200) {
        mutate();
      } else {
        alert('Failed to add menu item');
      }
    } catch (error) {
      console.error('addMenuItem error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <MenuContext.Provider
      value={{
        restaurantId,
        menuData: menuData?.data,
        menuItems: menuData?.data?.menu_items,
        createMenu,
        addMenuItem,
        editMenuItem,
        mutate,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuItem = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenuItem must be used within a MenuProvider');
  return context;
};
