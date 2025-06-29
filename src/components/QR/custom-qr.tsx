import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { Form } from 'react-final-form';
import { CustomField } from '@/components/Input/CustomField';
import { QRCodeCard } from './QRCodeCard';
import ColorPicker from './ColorPicker';
import { useRestaurant } from '@/hooks/useRestaurant';

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export default function CustomQR() {
  const router = useRouter();
  const { id } = router.query;
  const { currRes } = useRestaurant(id);
  console.log('currR', currRes);
  const [qr, setQr] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
          setQr(url);
        }
      },
    );
  };

  useEffect(() => {
    if (id) generateQR(id as string);
  }, [id]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    await new Promise((res) => setTimeout(res, 100)); // wait for layout
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      backgroundColor: null,
    });
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'qr-card.png';
    link.click();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Form
        onSubmit={() => {}}
        initialValues={{
          title: currRes?.restaurant?.name,
          subtitle: 'Table #1',
          bottomText: 'Order Here',
        }}
        render={({ handleSubmit, values }: any) => (
          <form onSubmit={handleSubmit}>
            <QRCodeCard
              ref={cardRef}
              title={values.title}
              subtitle={values.subtitle}
              variant={values?.variant}
              bottomText={values.bottomText}
              qr={qr}
            />

            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                Download Full Card
              </button>
            </div>

            <div className="max-w-md mx-auto mt-6 bg-white shadow-md rounded p-4">
              <CustomField name="title" label="Restaurant Name" />
              <CustomField name="subtitle" label="Table Number" />
              <CustomField name="bottomText" label="Bottom Text (e.g. Order Here)" />
              <ColorPicker />
            </div>
          </form>
        )}
      />
    </div>
  );
}
