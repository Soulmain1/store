"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselSlide {
  image: string;
  alt: string;
  badge?: string;
  badgeColor?: string;
  title: string;
  description?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  interval?: number;
}

export default function Carousel({ slides, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const showSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(slides.length - 1);
    } else if (index >= slides.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered, interval, slides.length]);

  const restartAutoplayTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, interval);
    }
  };

  return (
    <div
      id="carousel-container"
      className="relative overflow-hidden rounded-2xl shadow-xl aspect-square max-w-lg mx-auto bg-slate-950 group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0].screenX;
      }}
      onTouchEnd={(e) => {
        touchEndX.current = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        if (touchEndX.current < touchStartX.current - swipeThreshold) {
          nextSlide();
          restartAutoplayTimer();
        } else if (touchEndX.current > touchStartX.current + swipeThreshold) {
          prevSlide();
          restartAutoplayTimer();
        }
      }}
    >
      {/* Diapositivas / Slides (Solo la imagen limpia) */}
      <div className="w-full h-full relative flex items-center justify-center">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
              i === currentIndex
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Botón Anterior */}
      <button
        onClick={() => {
          prevSlide();
          restartAutoplayTimer();
        }}
        aria-label="Diapositiva anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/65 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg z-10 focus:outline-none cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={() => {
          nextSlide();
          restartAutoplayTimer();
        }}
        aria-label="Diapositiva siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/65 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg z-10 focus:outline-none cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Indicador de Pausa por Hover */}
      <div
        className={`absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-slate-300 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5 shadow ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
        Pausado
      </div>

      {/* Barra de Progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800/80 z-10">
        <div
          key={currentIndex}
          className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 ${
            isHovered ? "w-0 paused" : "animate-progress"
          }`}
          style={{ animationDuration: `${interval}ms` }}
        ></div>
      </div>

      {/* Puntos de Navegación (Dots) */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              showSlide(i);
              restartAutoplayTimer();
            }}
            className={`transition-all duration-300 rounded-full focus:outline-none cursor-pointer ${
              i === currentIndex
                ? "w-6 h-2 bg-indigo-500"
                : "w-2 h-2 bg-slate-700 hover:bg-slate-500"
            }`}
            aria-label={`Ir a diapositiva ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}