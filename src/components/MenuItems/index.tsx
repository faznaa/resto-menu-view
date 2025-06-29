import { MENU_EXAMPLE } from '@/consts/menuItemsExample';
import { Disclosure, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { DUMMY_DATA } from '../addItem';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Dish from './Dish';

export type MenuItemType = (typeof MENU_EXAMPLE)[0];

export default function MenuItemsList({ items }: { items: MenuItemType[] }) {
  const currency = 'INR';

  return (
    <div className="px-4 grid grid-cols-1 max-w-3xl  m-auto gap-4 sm:gap-6 overflow-hidden">
      {items?.map(({ category, items: foodItems }) => (
        <Disclosure key={category.label} defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between items-center w-full px-1 py-2 text-left font-medium">
                {category.label}
                <ChevronDownIcon
                  className={`w-6 h-6 transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition-[max-height,opacity] duration-300 ease-out"
                enterFrom="max-h-0 opacity-0"
                enterTo="max-h-[1000px] opacity-100"
                leave="transition-[max-height,opacity] duration-200 ease-in"
                leaveFrom="max-h-[1000px] opacity-100"
                leaveTo="max-h-0 opacity-0"
              >
                <Disclosure.Panel static>
                  <div className="overflow-hidden">
                    <Dish variant="card" items={foodItems} />
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
