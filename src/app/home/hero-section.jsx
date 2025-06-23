import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const HeroSection = () => {
  const navigate = useNavigate();

  const handlePlanTripClick = () => {
    navigate('/destination');
  };

  const images = [
    '/assets/Hero image 20.jpg',
    '/assets/Hero image 30.jpg',
    '/assets/Hero image 10.jpg',
    '/assets/Hero image 40.jpg',
    '/assets/Hero image 50.jpg',
    '/assets/Hero image 60.jpg',
    '/assets/Hero image 70.jpg',
    '/assets/Hero image 80.jpg'
  ];

  return (
    <section className="relative h-[300px] md:h-[400px] lg:h-[480px]">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="absolute inset-0 z-[1] w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Hero Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[2]" />

      {/* Left-Aligned Content */}
      <div className="absolute inset-0 z-[3] flex items-center">
        <div className="container text-white px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Travel has never
            <br />
            felt this cosy
          </h1>
          <p className="text-lg md:text-xl font-medium mt-2">
            Book an entire place all for yourself
          </p>
          <Button
            className="mt-6 h-12 px-6 text-base font-semibold"
            onClick={handlePlanTripClick}
          >
            Plan Your Trip
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
