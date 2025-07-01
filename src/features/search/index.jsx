import { Form } from '@/components/ui/form';
import React from 'react';
import LocationInput from './location-input';
import DateSelectInput from './date-select-input';
import OccupancyInput from './occupancy-input';
import { Button } from '@/components/ui/button';
import useSearchForm from './use-search-form';

const Search = () => {
  const { form, searchSubmitHandler } = useSearchForm();

  return (
    <section className="container">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(searchSubmitHandler)}
          className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap gap-2 items-stretch sm:items-center bg-white border border-yellow-500 rounded-xl shadow-sm p-4 sm:p-2"
        >
          <div className="w-full sm:w-auto flex-1">
            <LocationInput form={form} />
          </div>
          <div className="w-full sm:w-auto flex-1">
            <DateSelectInput form={form} />
          </div>
          <div className="w-full sm:w-auto flex-1">
            <OccupancyInput form={form} />
          </div>
          <Button
            type="submit"
            className="w-full sm:w-auto text-lg h-12 sm:h-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            Search
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Search;
