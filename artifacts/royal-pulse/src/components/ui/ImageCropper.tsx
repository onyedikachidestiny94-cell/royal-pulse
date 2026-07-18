import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check } from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  onCropDone: (croppedBlob: Blob) => void;
  onCancel: () => void;
  aspect?: number;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas is empty'));
    }, 'image/jpeg', 0.92);
  });
}

export default function ImageCropper({ imageSrc, onCropDone, onCancel, aspect = 16 / 9 }: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);
  const [selectedAspect, setSelectedAspect] = useState(aspect);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropDone(blob);
    } finally {
      setProcessing(false);
    }
  };

  const aspectOptions = [
    { label: '16:9', value: 16 / 9 },
    { label: '4:3', value: 4 / 3 },
    { label: '1:1', value: 1 },
    { label: '3:4', value: 3 / 4 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h2 className="font-bold text-white text-lg">Crop & Adjust Image</h2>
          <button onClick={onCancel} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crop Area */}
        <div className="relative w-full bg-black" style={{ height: '340px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={selectedAspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: { borderRadius: 0 },
              cropAreaStyle: { border: '2px solid #e11d48' },
            }}
          />
        </div>

        {/* Controls */}
        <div className="px-5 py-4 space-y-4 bg-zinc-950">
          {/* Aspect Ratio */}
          <div>
            <p className="text-zinc-400 text-xs mb-2 uppercase tracking-wider">Aspect Ratio</p>
            <div className="flex gap-2">
              {aspectOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setSelectedAspect(opt.value)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    selectedAspect === opt.value
                      ? 'bg-primary text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom */}
          <div>
            <p className="text-zinc-400 text-xs mb-2 uppercase tracking-wider">Zoom</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <button
                onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <span className="text-zinc-400 text-sm w-10 text-right">{zoom.toFixed(1)}x</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onCancel}
              className="flex-1 border border-zinc-700 text-zinc-300 hover:text-white h-11 rounded-md transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              disabled={processing}
              className="flex-1 bg-primary hover:bg-primary/90 text-white h-11 rounded-md transition-colors text-sm font-bold flex items-center justify-center gap-2"
            >
              {processing ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              ) : (
                <>
                  <Check className="w-4 h-4" /> Apply Crop
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
