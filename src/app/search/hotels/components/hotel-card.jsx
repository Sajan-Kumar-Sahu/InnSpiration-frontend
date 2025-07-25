import Icon from '@/components/ui/icon';
import React from 'react';
import { Link } from 'react-router';
import useHotelNavigation from '../hooks/use-hotel-nevigation';

const hotelInfo = {
  description:
    'A boutique resort with an Indo-Portuguese architecture, the Ronil Goa offers lively holidays filled with recreational activities.',
  details: {
    type: 'Entire Homestay',
    bedrooms: 1,
    guests: 4,
    policies: ['Free Cancellation', 'Book with ₹0 Payment'],
  },
  rating: {
    score: 4.8,
    text: 'Excellent',
    reviews: 8,
  },
};

const HotelImages = ({ photos }) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const imageHoverHandler = (imageIndex) => {
    setActiveImageIndex(imageIndex);
  };
  return (
    <div className="flex flex-col gap-1 w-full sm:w-60 shrink-0">
      <div className="w-full">
        <img
          height={138}
          width={240}
          className="rounded-sm max-h-[138px] w-full object-cover"
          src={photos[activeImageIndex]}
          alt={'Hotel Images'}
        />
      </div>
      <div className="grid grid-cols-4 gap-1 w-full sm:w-60">
        {photos.slice(1).map((image, index) => (
          <div className="relative overflow-hidden rounded-sm" key={index}>
            <img
              height={50}
              width={60}
              className="h-12 object-cover w-full"
              src={image}
              alt="Hotel Images"
              onMouseEnter={() => imageHoverHandler(index + 1)}
            />
            {index === photos.length - 2 && (
              <span className="text-[10px] flex pointer-events-none items-center justify-center font-semibold text-white absolute inset-0 backdrop-blur-sm">
                View All
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HotelCard = ({ name, photos, city, id, amenities, price }) => {
  const navigationUrl = useHotelNavigation(id);
  return (
    <Link className="block w-full" to={navigationUrl}>
      <article className="flex flex-col md:flex-row w-full transition-colors border rounded-lg hover:border-primary overflow-hidden">
        <div className="flex flex-col sm:flex-row flex-1 gap-4 p-4 w-full">
          <HotelImages photos={photos} />
          <div className="space-y-3 flex-1">
            <div className="space-y-0.5">
              <h2 className="inline text-xl font-bold">
                {name} &nbsp;
                {new Array(3).fill(0).map((_, index) => (
                  <Icon
                    key={index}
                    icon="star"
                    size="12"
                    className="inline mb-2 text-yellow-500"
                  />
                ))}
              </h2>
              <p className="text-sm font-semibold text-primary">{city}</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-muted-foreground text-sm">
              <span className="font-semibold">{hotelInfo.details.type}</span> |
              <span>{`${hotelInfo.details.bedrooms} Bedroom`}</span> |
              <span>{`Sleep ${hotelInfo.details.guests} Guests`}</span>
            </div>
            <ul className="space-y-1">
              {amenities.slice(0, 2).map((policy, index) => (
                <li key={index} className="flex items-center gap-1 text-sm text-green-700">
                  <Icon icon="check" size="16" />
                  {policy}
                </li>
              ))}
            </ul>
            <div className="flex justify-between gap-2 items-center">
              <p className="text-sm line-clamp-1 flex-1">{hotelInfo.description}</p>
              <span className="text-xs font-medium text-primary shrink-0">View More</span>
            </div>
          </div>
        </div>

        {/* ✅ Responsive Right Side Panel */}
        <div className="flex flex-col md:flex-col justify-between gap-2 p-4 border-t md:border-t-0 md:border-l w-full md:w-48 shrink-0">
          <div>
            <div className="flex gap-1.5 items-center">
              <p className="text-base font-bold text-brand">{hotelInfo.rating.text}</p>
              <span className="inline-block px-1 py-0.5 text-sm font-bold text-white rounded bg-brand">
                {hotelInfo.rating.score}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              ({`${hotelInfo.rating.reviews} Ratings`})
            </p>
          </div>
          <div className="text-end md:text-left">
            <p className="text-2xl font-bold">{`₹ ${price.toLocaleString()}`}</p>
            <p className="text-sm text-muted-foreground">{`+ ₹0 taxes & fees`}</p>
            <p className="text-sm text-muted-foreground">Per Night</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default React.memo(HotelCard);
