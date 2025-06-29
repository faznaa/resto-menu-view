import React from 'react';

type QRVariant = 'yellow' | 'blue' | 'green' | 'red' | 'pink';

const variantBackgrounds: Record<QRVariant, string> = {
  yellow: 'bg-yellow-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  pink: 'bg-pink-500',
};

export const QRCodeCard = React.forwardRef(
  (
    {
      title,
      subtitle,
      bottomText,
      qr,
      variant = 'yellow',
    }: {
      title: string;
      subtitle: string;
      bottomText: string;
      qr: string | null;
      variant?: QRVariant;
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const bgClass = variantBackgrounds[variant] ?? variantBackgrounds.yellow;

    return (
      <div ref={ref} className="relative w-96 h-96 overflow-hidden shadow-lg mx-auto">
        {/* Variant-colored top background */}
        <div className={`absolute top-0 left-0 w-full h-1/2 ${bgClass} z-0`} />

        <div className="relative z-10 w-full h-full bg-white/60 backdrop-blur-md p-6 flex flex-col justify-between">
          <div>
            <h2
              className="text-gray-900 text-center text-2xl font-semibold mb-2 tracking-wide leading-snug whitespace-pre-line font-sans"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {title}
            </h2>

            <h3
              style={{ fontFamily: 'Arial, sans-serif' }}
              className="text-gray-700 text-center text-lg mb-6"
            >
              {subtitle}
            </h3>
          </div>

          <div className="relative w-48 h-48 mx-auto">
            {qr && <img src={qr} alt="QR Code" className="w-40 h-40 mt-4 m-auto object-contain" />}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-black rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-black rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black rounded-br-sm" />
          </div>

          <h2
            style={{ fontFamily: 'Arial, sans-serif' }}
            className="text-gray-800 text-center text-xl font-medium mt-6"
          >
            {bottomText}
          </h2>
        </div>
      </div>
    );
  },
);

QRCodeCard.displayName = 'QRCodeCard';
