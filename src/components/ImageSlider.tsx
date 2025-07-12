
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Download, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Image {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags?: string[];
}

interface ImageSliderProps {
  images: Image[];
  initialIndex?: number;
  onClose?: () => void;
  isFullscreen?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  initialIndex = 0,
  onClose,
  isFullscreen = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(nextImage, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape' && onClose) onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, onClose]);

  const currentImage = images[currentIndex];

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col'
    : 'relative w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden';

  return (
    <div className={containerClasses}>
      {/* Header Controls */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold truncate">{currentImage?.title}</h3>
          <span className="text-sm text-slate-300">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:bg-slate-700"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsZoomed(!isZoomed)}
            className="text-white hover:bg-slate-700"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-slate-700"
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-slate-700"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative flex-1 flex items-center justify-center bg-slate-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevImage}
          className="absolute left-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className={`relative transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
          <img
            src={`https://images.unsplash.com/${currentImage?.url}?w=1200&h=800&fit=crop`}
            alt={currentImage?.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextImage}
          className="absolute right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Info */}
      {currentImage?.description && (
        <div className="p-4 bg-white border-t">
          <p className="text-slate-600 text-sm leading-relaxed">{currentImage.description}</p>
          {currentImage.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {currentImage.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="p-4 bg-slate-100 border-t">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex
                    ? 'border-blue-500 scale-105'
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img
                  src={`https://images.unsplash.com/${image.url}?w=100&h=100&fit=crop`}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
