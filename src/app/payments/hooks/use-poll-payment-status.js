import API_CONFIG from '@/config/api.config';
import { BOOKING_STATUS } from '@/config/payment.config';
import axiosInstance from '@/lib/axios-instance';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function usePollPaymentStatus() {
  const { bookingId } = useParams();
  const MAX_RETRIES = 20;
  const POLLING_DELAY = 5000;

  const [retryCount, setRetryCount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(BOOKING_STATUS.PROCESSING);

  const getPaymentStatus = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_CONFIG.BOOKING.STATUS_BOOKING.URL(bookingId)
      );

      const currentStatus = data.bookingStatus;

      if (
        currentStatus === BOOKING_STATUS.CONFIRMED ||
        currentStatus === BOOKING_STATUS.CANCELLED ||
        currentStatus === BOOKING_STATUS.EXPIRED
      ) {
        setPaymentStatus(currentStatus);
        return; // stop polling on final statuses
      }

      // keep retrying if not final status
      if (retryCount < MAX_RETRIES) {
        setRetryCount((prev) => prev + 1);
      } else {
        setPaymentStatus(BOOKING_STATUS.MAX_RETRIES_EXCEEDED);
      }

    } catch (err) {
      console.error('Error while polling payment status:', err);
      // You could decide to stop polling here too, or keep going
      if (retryCount >= MAX_RETRIES) {
        setPaymentStatus(BOOKING_STATUS.ERROR);
      } else {
        setRetryCount((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getPaymentStatus();
    }, POLLING_DELAY);

    return () => clearInterval(interval);
  }, [retryCount]);

  useEffect(() => {
    getPaymentStatus(); // fire first time immediately
  }, []);

  return { paymentStatus };
}

export default usePollPaymentStatus;
