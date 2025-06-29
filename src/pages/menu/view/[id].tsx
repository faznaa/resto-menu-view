import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import MenuItemsList from '@/components/MenuItems';
import { MENU_EXAMPLE } from '@/consts/menuItemsExample';

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export default function Menu() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/menu/${id}` : null, fetcher);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="bg-gray-50  ">
      <div className=" bg-gray-800 ">
        {data?.menu?.restaurant?.phoneNumber && (
          <a
            href={`wa.me/+91${data?.menu?.restaurant?.phoneNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-green-600"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>
        )}
        {data?.menu?.restaurant?.website && (
          <a href={data?.menu?.restaurant?.website} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGlobe} className="w-6 h-6 fill-green-600" color="white" />
          </a>
        )}
        {data?.menu?.restaurant?.location?.url && (
          <a href={data?.menu?.restaurant?.location?.url} target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="w-6 h-6 fill-green-600"
              color="white"
            />
          </a>
        )}

        <div className="mx-auto w-full text-center py-24 sm:py-32">
          <div className="flex justify-start gap-x-4"></div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {data?.menu?.restaurant?.name}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {data?.menu?.restaurant?.description}
          </p>
        </div>
      </div>

      <MenuItemsList items={MENU_EXAMPLE} />
    </div>
  );
}
