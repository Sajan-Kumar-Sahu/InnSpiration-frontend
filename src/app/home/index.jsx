import React from 'react';
import HeroSection from './hero-section';
import TrendingDestination from './trending-destination';
import Search from '@/features/search';

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="-mt-10 sm:-mt-12 relative z-[2] px-2">
        <Search />
      </div>
      <div className="mt-6 sm:mt-10">
        <TrendingDestination />
      </div>
    </>
  );
};

export default Home;