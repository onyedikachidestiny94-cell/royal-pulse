import { useEffect } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
  className?: string;
}

export function AdSenseAd({
  slot,
  format = 'horizontal',
  responsive = true,
  className = '',
}: AdSenseAdProps) {
  useEffect(() => {
    // Push ads configuration to Google AdSense
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const getAdStyle = () => {
    switch (format) {
      case 'horizontal':
        return 'ins-728x90';
      case 'vertical':
        return 'ins-300x250';
      case 'rectangle':
        return 'ins-300x250';
      default:
        return 'ins-728x90';
    }
  };

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className={`adsbygoogle ${getAdStyle()}`}
        data-ad-client="ca-pub-6511395787886377"
        data-ad-slot={slot}
        data-ad-format={responsive ? 'auto' : format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        style={{
          display: 'block',
          textAlign: 'center',
          margin: '0 auto',
        }}
      />
    </div>
  );
}

// Declare global window type for AdSense
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}
