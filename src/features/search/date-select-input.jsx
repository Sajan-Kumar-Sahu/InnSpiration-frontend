import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import dayjs from 'dayjs';
import React from 'react';
import useIsMobile from './hooks/useIsMobile';

const DateSelectInput = ({ form }) => {

  const isMobile = useIsMobile();
  return (
    <Popover>
      <FormField
        control={form.control}
        name="bookingDates"
        render={({ field }) => (
          <>
            <PopoverTrigger asChild>
              <FormItem className="h-12 w-full flex items-center px-4 rounded-md bg-background border border-gray-300 focus-within:ring-2 focus-within:ring-yellow-500">
                <FormControl>
                  <div role="button" className="w-full h-full flex items-center gap-2">
                    <Icon icon="calendar" size="24" className="text-muted-foreground shrink-0" />
                    <div className="flex-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <p>{field?.value?.from ? dayjs(field.value.from).format('ddd D MMM') : 'Check-in date'}</p>
                      <span>-</span>
                      <p>{field?.value?.to ? dayjs(field.value.to).format('ddd D MMM') : 'Check-out date'}</p>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            </PopoverTrigger>

            <PopoverContent
              sideOffset={1}
              align="start"
              className="w-full max-w-[640px] overflow-visible"
              onOpenAutoFocus={e => e.preventDefault()}
            >
              <Calendar
                required
                mode="range"
                min={2}
                selected={field.value}
                numberOfMonths={isMobile ? 1 : 2}
                fromMonth={new Date()}
                disabled={(date) => dayjs().isAfter(dayjs(date), 'date')}
                onSelect={(value) => field.onChange(value)}
              />
            </PopoverContent>
          </>
        )}
      />
    </Popover>
  );
};

export default DateSelectInput;
