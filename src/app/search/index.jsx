import React from 'react';
import Filter from './filter';
import SortFilter from './filter/components/sort-filter';
import Hotels from './hotels';
import PaginationFilter from './filter/components/pagination-filter';
import useGetHotels from './hotels/hooks/use-get-hotels';
import { SEARCH_RESULT_PAGE_LIMIT } from '@/config/app.config';

const SearchPage = () => {
  const { data, pending, error, city } = useGetHotels();
  const hotels = data?.content || [];
  const totalEntries = data?.totalElements;

  console.log(data);

  return (
    <div className="container mt-6 mb-12">
      {/* Responsive Wrapper */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Filter Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <Filter />
        </div>

        {/* Hotel Listings */}
        <section className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-xl font-bold">
              {city}: {totalEntries} properties found
            </h1>
            <SortFilter />
          </div>

          <Hotels error={error} isLoading={pending} data={hotels} />

          {hotels.length > 0 && (
            <PaginationFilter
              totalEntries={totalEntries}
              limit={SEARCH_RESULT_PAGE_LIMIT}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchPage;