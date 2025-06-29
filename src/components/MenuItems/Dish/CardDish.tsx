import React, { useState } from 'react';
import { DishType } from '.';
import { CURRENCY } from '.';
import { getRandomItem } from '@/lib/random';
import { dishImages } from '@/consts/images';
import DishModal from './DishModal';

export const CardDish = ({ foodItems }: { foodItems: DishType }) => {
  const [selectedDish, setSelectedDish] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (dish: any) => {
    setSelectedDish(dish);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {foodItems?.map((item: any, idx: number) => (
          <div key={idx} className="cursor-pointer" onClick={() => openModal(item)}>
            <div className="w-auto h-auto aspect-[3/2] rounded-md overflow-hidden">
              <img
                className="rounded-md object-cover h-full w-full bg-gray-100"
                src={item.image_url || getRandomItem(dishImages)}
                alt={item.name}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-900 font-semibold">{item.name}</p>
                <p className="text-sm font-medium text-gray-800">{`${CURRENCY}${item.price}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DishModal isOpen={isOpen} onClose={() => setIsOpen(false)} dish={selectedDish} />
    </>
  );
};
