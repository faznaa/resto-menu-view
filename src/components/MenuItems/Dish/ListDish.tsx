import { Disclosure } from '@headlessui/react';
import { DishType } from '.';
import { DUMMY_DATA } from '@/components/addItem';
import { CURRENCY } from '.';

export const ListDish = ({ foodItems }: { foodItems: DishType }) => (
  <div>
    {foodItems?.map((item: any) => (
      <Disclosure key={item.name}>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <div
                key={item._id}
                className="relative flex items-center mb-2 space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
              >
                <div className={`flex-shrink-0 flex `}>
                  <img
                    className={`h-10 w-10 rounded-md bg-gray-100 mt-0 `}
                    src={item.image_url || DUMMY_DATA?.image_url}
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 text-left">{item.name}</p>
                    <p className={`text-sm text-wrap  text-gray-500 text-left`}>
                      {item.description}
                    </p>
                  </a>
                </div>
                <div className="flex-shrink-0 flex flex-col justify-start items-end">
                  <div
                    className={`w-4 h-4 rounded-full bg-${
                      item.vegColor !== 'orange' ? item.vegColor : 'yellow'
                    }-500`}
                  ></div>
                  <p className="text-sm font-medium text-gray-900">{`${CURRENCY} ${item.price}`}</p>
                </div>
                {open ? '' : ''}
              </div>
            </Disclosure.Button>
            {/* <Disclosure.Panel></Disclosure.Panel> */}
          </>
        )}
      </Disclosure>
    ))}
  </div>
);
