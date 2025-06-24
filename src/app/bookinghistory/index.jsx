import React, { useEffect, useState } from 'react';
import api from '@/lib/axios-instance'; // adjust path if needed
import API_CONFIG from '@/config/api.config';
import LoadingSpinner from '@/components/ui/loading-spinner';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api({
        method: API_CONFIG.BOOKING.BOOKING_HISTORY.METHOD,
        url: API_CONFIG.BOOKING.BOOKING_HISTORY.URL,
      });
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching booking history:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    try {
      await api.post(`/bookings/${selectedBooking.id}/cancel`);
      setCancelMessage('Booking cancelled successfully.');
      setShowConfirmDialog(false);
      fetchBookings(); // refresh the list
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setCancelMessage('Failed to cancel the booking.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Booking History</h2>

      {cancelMessage && (
        <div className="text-center text-green-600 mb-4">{cancelMessage}</div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Hotel</th>
                <th className="p-4 text-left">Check-in</th>
                <th className="p-4 text-left">Check-out</th>
                <th className="p-4 text-left">Guests</th>
                <th className="p-4 text-left">Rooms</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{booking.hotel?.name || 'N/A'}</td>
                  <td className="p-4">{booking.checkInDate}</td>
                  <td className="p-4">{booking.checkOutDate}</td>
                  <td className="p-4">{booking.guests?.length || 0}</td>
                  <td className="p-4">{booking.roomsCount}</td>
                  <td className="p-4">₹{booking.amount}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.bookingStatus === 'COMPLETED'
                          ? 'bg-green-100 text-green-700'
                          : booking.bookingStatus === 'CANCELLED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    {booking.bookingStatus === 'CONFIRMED' && (
                      <button
                        className="text-red-600 underline"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowConfirmDialog(true);
                          setCancelMessage('');
                        }}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Cancel Booking</h3>
            <p className="mb-6">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowConfirmDialog(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={handleCancelBooking}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
