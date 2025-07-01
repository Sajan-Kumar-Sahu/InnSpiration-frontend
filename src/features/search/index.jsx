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
          className="flex flex-col sm:flex-row flex-wrap gap-2 p-2 bg-yellow-500 items-center rounded-md min-h-[70px]"
        >
          <LocationInput form={form} />
          <DateSelectInput form={form} />
          <OccupancyInput form={form} />
          <Button type="submit" className="w-full sm:w-auto text-lg h-12">
            Search
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Search;