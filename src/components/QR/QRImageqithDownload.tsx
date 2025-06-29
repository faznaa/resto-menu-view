import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QRImageWithDownload({ src, filename }: any) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename || 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative inline-block group cursor-pointer w-20 h-20">
      <img src={src} alt="QR Code" className="w-20 h-20 object-contain" />

      <div
        onClick={handleDownload}
        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded"
        title="Download QR Code"
      >
        <FontAwesomeIcon icon={faDownload} className="text-white text-2xl" />
      </div>
    </div>
  );
}

export default QRImageWithDownload;
