import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductCarousel = ({ folder }) => {
  const [index, setIndex] = useState(0);
  const images = [
    new URL(`../assets/${folder}/1.jpg`, import.meta.url).href,
    new URL(`../assets/${folder}/2.jpg`, import.meta.url).href,
    new URL(`../assets/${folder}/3.jpg`, import.meta.url).href,
    new URL(`../assets/${folder}/4.jpg`, import.meta.url).href,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextStep = () => setIndex((prev) => (prev + 1) % images.length);
  const prevStep = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-square group overflow-hidden rounded-2xl bg-gray-50 shadow-inner border border-gray-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover object-center pointer-events-none" 
          alt={`${folder} preview`}
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <div key={i} className={`h-1 transition-all rounded-full ${i === index ? 'w-6 bg-[#FF6B00]' : 'w-1.5 bg-black/20'}`} />
        ))}
      </div>
    </div>
  );
};