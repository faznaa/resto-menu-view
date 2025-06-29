import React from 'react';
import { MenuItemType } from '..';
import { DUMMY_DATA } from '../../addItem';
import { Disclosure } from '@headlessui/react';
import { ListDish } from './ListDish';
import { CardDish } from './CardDish';

export type DishVariant = 'card' | 'list';
export const CURRENCY = '₹';

export type DishType = MenuItemType['items'];

export default function Dish({
  items,
  variant = 'card',
}: {
  items: MenuItemType['items'];
  variant: DishVariant;
}) {
  if (variant === 'list') return <ListDish foodItems={items} />;
  return <CardDish foodItems={items} />;
}
