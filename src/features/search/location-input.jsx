import { Button } from '@/components/ui/button';
import { FormControl, FormField } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DESTINATIONS } from '@/config/app.config';
import React, { useState } from 'react';

const LocationInput = ({ form }) => {
  const city = form.watch('city');
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const citySelectHandler = (e, index) => {
    e.preventDefault();
    const selectedDestination = DESTINATIONS[index];
    form.setValue('city', selectedDestination?.city || '');
    setIsPopOverOpen(false);
  };

  const handleKeyDown = (e) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center w-full h-12 gap-2 px-4 rounded-md bg-background border border-gray-300 focus-within:ring-2 focus-within:ring-yellow-500">
          <Icon icon="bed" size="24" className="text-muted-foreground shrink-0" />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormControl>
                <Input
                  className="flex-1 h-full px-2 text-sm border-0 focus:outline-none focus:ring-0 placeholder:text-foreground"
                  placeholder="Where are you going?"
                  {...field}
                  autoComplete="off"
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
            )}
          />
          {city && (
            <div role="button" onClick={() => form.setValue('city', '')}>
              <Icon icon="close" size="18" className="text-muted-foreground shrink-0" />
            </div>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent sideOffset={1} align="start" className="w-[420px]" onOpenAutoFocus={e => e.preventDefault()}>
        <div className="p-3">
          <p className="text-sm font-semibold">Popular destination nearby</p>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {DESTINATIONS.map((destination, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors duration-200 border-b border-border"
              onClick={(e) => citySelectHandler(e, index)}
            >
              <Icon icon="location" />
              <div>
                <p className="text-sm font-semibold">{destination.city}</p>
                <p className="text-sm text-muted-foreground">{destination.country}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationInput;
