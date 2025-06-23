import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const destinations = [
  {
    id: 1,
    name: 'Goa',
    description: 'Sun-kissed beaches and vibrant nightlife await you in Goa.',
    image: '/assets/Goa.jpg',
  },
  {
    id: 2,
    name: 'Manali',
    description: 'Snowy peaks and cozy stays make Manali a top pick for travelers.',
    image: '/assets/Manali.jpg',
  },
  {
    id: 3,
    name: 'Jaipur',
    description: 'Explore royal palaces and colorful streets in the Pink City.',
    image: '/assets/Jaipur.jpg',
  },
  {
    id: 4,
    name: 'Kerala',
    description: 'Backwaters, houseboats, and lush green landscapes in Kerala.',
    image: '/assets/Kerala.jpg',
  },
  {
    id: 5,
    name: 'Ladakh',
    description: 'High altitude adventures and breathtaking views await in Ladakh.',
    image: '/assets/Ladakh.jpg',
  },
  {
    id: 6,
    name: 'Darjeeling',
    description: 'Tea gardens and cool breezes in the Queen of the Hills.',
    image: '/assets/Darjeeling.jpg',
  },
  {
    id: 7,
    name: 'Rishikesh',
    description: 'Yoga capital with adventure sports and spiritual vibes.',
    image: '/assets/Rishikesh.jpg',
  },
  {
    id: 8,
    name: 'Agra',
    description: 'Home of the Taj Mahal, a must-visit historical marvel.',
    image: '/assets/taj-mahal.jpg',
  },
  {
    id: 9,
    name: 'Andaman Islands',
    description: 'Clear blue waters, coral reefs, and serene beaches.',
    image: '/assets/Andaman.jpg',
  },
  {
    id: 10,
    name: 'Munnar',
    description: 'Lakes and palaces that define royal charm.',
    image: '/assets/Munnar.jpg',
  },
];

const DestinationPage = () => {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
        Let’s Go Somewhere Amazing
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          Discover breathtaking places crafted for unforgettable memories.
        </p>

        <Slider {...settings} className="destination-slider">
          {destinations.map((place) => (
            <div key={place.id} className="px-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-200">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-left">
                  <h2 className="text-xl font-semibold text-blue-700 mb-1">
                    {place.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style>{`
        .destination-slider .slick-slide {
          opacity: 0.6;
          transform: scale(0.9);
          transition: all 0.4s ease;
        }
        .destination-slider .slick-center {
          opacity: 1;
          transform: scale(1.05);
          z-index: 10;
        }
      `}</style>
    </section>
  );
};

export default DestinationPage;
