import React from 'react';
import { Dialog } from '@headlessui/react';
import { DishType } from '.';
import { CURRENCY } from '.';
import { getRandomItem } from '@/lib/random';
import { dishImages } from '@/consts/images';

export default function DishModal({
  isOpen,
  onClose,
  dish,
}: {
  isOpen: boolean;
  onClose: () => void;
  dish: (DishType[number] & { image_url: string }) | null;
}) {
  if (!dish) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-semibold text-gray-900 flex items-center justify-between">
            {dish.name}
            <span
              className={`ml-2 w-3 h-3 rounded-full ${dish.veg ? 'bg-green-600' : 'bg-red-600'}`}
              title={dish.veg ? 'Veg' : 'Non-Veg'}
            ></span>
          </Dialog.Title>

          <img
            src={dish?.image_url || dishImages[0]}
            alt={dish.name}
            className="w-full h-48 object-cover rounded bg-gray-100"
          />

          <p className="text-gray-600 text-sm whitespace-pre-line">{dish.description}</p>

          {/* Ingredients */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">🧂 Ingredients:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              {dish.ingredients?.map((ingredient: string, idx: number) => (
                <li key={idx}>{ingredient}</li>
              )) || <li>Onion, Tomato, Spices</li>}
            </ul>
          </div>

          {/* Allergen Info */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">⚠️ Allergens:</h4>
            <p className="text-sm text-gray-600">{dish.allergens || 'Contains dairy and gluten'}</p>
          </div>

          {/* Calorie Info */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">🔥 Calories:</span>
            <span className="text-sm font-medium text-gray-800">{dish.calories || 320} kcal</span>
          </div>

          {/* Customization Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">🛠️ Customizations:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              {(dish.customizations || ['Extra Cheese', 'Less Spicy', 'Add Olives']).map(
                (option, idx) => (
                  <li key={idx}>{option}</li>
                ),
              )}
            </ul>
          </div>

          {/* Price */}
          <p className="text-right font-semibold text-gray-800">
            Price: {CURRENCY}
            {dish.price}
          </p>

          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
