import React from 'react';
import { Button } from '../Button';
import { useRouter } from 'next/router';
import QRImageWithDownload from '../QR/QRImageqithDownload';
import Loader from '../Loader';

export default function DisplayRestoList({ resData, qr, loading }: any) {
  const router = useRouter();
  if (loading) return <Loader />;
  return (
    <div className="space-y-6">
      {resData?.length > 0 ? (
        resData.map((restaurant: any) => (
          <div
            key={restaurant._id}
            className="bg-white shadow rounded-lg p-5 space-y-4 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {restaurant?.restaurant?.name}
                </h2>
                <p className="text-sm text-gray-500">{restaurant?.restaurant?.phone_number}</p>
                <p className="text-sm text-gray-500">{restaurant?.restaurant?.website}</p>
              </div>
              {/* <img
                    src={qr[restaurant._id]}
                    alt="QR Code"
                    className="w-20 h-20 object-contain"
                  /> */}
              <QRImageWithDownload src={qr[restaurant._id]} filename={`qr-${restaurant._id}.png`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button onClick={() => router.push(`/menu/edit/${restaurant._id}`)}>
                View Menu Items
              </Button>
              <Button onClick={() => router.push(`/menu/view/${restaurant._id}`)}>
                View Public Link
              </Button>
              <Button onClick={() => router.push(`/menu/custom-qr/${restaurant._id}`)}>
                View Custom QR
              </Button>
              {/* <Button href={qr[restaurant._id]}>Download QR</Button> */}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">No restaurants found.</p>
        </div>
      )}
    </div>
  );
}
