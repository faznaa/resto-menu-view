import { fetcher } from '@/lib/fetcher';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import QRCode from 'qrcode';
import { Button } from '../Button';
import Modal from '../modal';
import { Input } from '../Input';
import QRImageWithDownload from '../QR/QRImageqithDownload';
import DisplayRestoList from './DisplayRestoList';

export default function ViewRestaurants() {
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email;

  const {
    data: resData,
    isLoading,
    mutate,
  } = useSWR(email ? `/api/restaurant/${email}` : null, fetcher);

  const restaurantInitData = {
    name: '',
    description: 'Lorem ipsum gracia uno des',
    phoneNumber: '',
    website: '',
    location_address: '',
    location_url: '',
  };

  const [inputData, setInputData] = useState(restaurantInitData);
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState({} as Record<string, string>);

  const handleSubmit = async () => {
    const _result = await axios.post('/api/menu/create', {
      restaurant: {
        ...inputData,
        phoneNumber: parseInt(inputData.phoneNumber),
        location: {
          address: inputData.location_address,
          url: inputData.location_url,
        },
      },
      owner_name: '',
      color_scheme: 'schema1',
      email: session?.user?.email,
    });

    if (_result.status === 200) {
      setInputData(restaurantInitData);
      setOpen(false);
      mutate();
    } else {
      alert('Something happened');
    }
  };

  const handleChange = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const generateQR = async (id: string) => {
    QRCode.toDataURL(
      `https://beautiful-gaufre-fffa52.netlify.app/menu/view/${id}`,
      {
        width: 300,
        margin: 2,
        color: {
          dark: '#335383ff',
          light: '#eeeeeeff',
        },
      },
      (err, url) => {
        if (!err) {
          setQr((prev) => ({ ...prev, [id]: url }));
        }
      },
    );
  };

  useEffect(() => {
    if (resData) {
      resData.forEach((r: any) => {
        if (!qr[r._id]) generateQR(r._id);
      });
    }
  }, [resData]);
  if (!session) return <div>Invalid Permissions</div>;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Your Restaurants</h1>
            <Button onClick={() => setOpen(true)}> New Restaurant</Button>
          </div>
          <DisplayRestoList resData={resData} qr={qr} loading={isLoading} />
        </div>

        <div className="hidden lg:block">
          <img
            src="/images/food1.jpg"
            alt="Food banner"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} handleSubmit={handleSubmit}>
        <Input
          label="Restaurant Name"
          id="name"
          name="name"
          value={inputData.name}
          onChange={handleChange}
        />
        <Input
          label="Description"
          id="description"
          name="description"
          value={inputData.description}
          onChange={handleChange}
        />
        <Input
          label="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
          value={inputData.phoneNumber}
          onChange={handleChange}
        />
        <Input
          label="Website"
          id="website"
          name="website"
          value={inputData.website}
          onChange={handleChange}
        />
        <Input
          label="Location Address"
          id="location_address"
          name="location_address"
          value={inputData.location_address}
          onChange={handleChange}
        />
        <Input
          label="Location URL"
          id="location_url"
          name="location_url"
          value={inputData.location_url}
          onChange={handleChange}
        />
      </Modal>
    </main>
  );
}
