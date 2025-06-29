import React from 'react';
import { useRouter } from 'next/router';

import { MenuProvider } from '@/hooks/useMenuItem';
import { MenuContent } from '@/components/Restaurants/MenuContent';

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') return null;

  return (
    <MenuProvider restaurantId={id}>
      <MenuContent />
    </MenuProvider>
  );
}
