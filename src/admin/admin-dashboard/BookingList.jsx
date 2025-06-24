import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios-instance';
import LoadingSpinner from '@/components/ui/loading-spinner'; // 👈 added

const BookingList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hotels for the dropdown
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelRes = await axiosInstance.get('/admin/hotels');
        setHotels(hotelRes.data);
      } catch (err) {
        console.error('Error fetching hotels:', err);
      }
    };
    fetchHotels();
  }, []);

  // Fetch bookings when a hotel is selected
  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedHotel) return;
      setLoading(true);
      try {
        const bookingsRes = await axiosInstance.get(`/admin/hotels/${selectedHotel}/bookings`);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [selectedHotel]);

  // Handle cancel booking
  const handleCancelBooking = async (bookingId) => {
    try {
      await axiosInstance.post(`/bookings/${bookingId}/cancel`);
      alert('Booking cancelled successfully!');
      const updatedBookings = await axiosInstance.get(`/admin/hotels/${selectedHotel}/bookings`);
      setBookings(updatedBookings.data);
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      alert('Failed to cancel booking.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <div className="mb-6">
        <label htmlFor="hotel" className="block text-sm font-semibold text-gray-700">
          Select Hotel:
        </label>
        <select
          id="hotel"
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select a Hotel --</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name} - {hotel.city}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-center">
            <thead>
              <tr className="bg-gray-100 text-sm font-semibold text-gray-600">
                <th className="p-3 text-center align-middle">Booking ID</th>
                <th className="p-3 text-center align-middle">Room Type</th>
                <th className="p-3 text-center align-middle">Check-in Date</th>
                <th className="p-3 text-center align-middle">Check-out Date</th>
                <th className="p-3 text-center align-middle">Amount (₹)</th>
                <th className="p-3 text-center align-middle">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center align-middle">
                    No bookings found for this hotel.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50 text-sm text-center align-middle">
                    <td className="p-3 align-middle">{booking.id}</td>
                    <td className="p-3 align-middle">{booking.room.type}</td>
                    <td className="p-3 align-middle">{booking.checkInDate}</td>
                    <td className="p-3 align-middle">{booking.checkOutDate}</td>
                    <td className="p-3 align-middle">{booking.amount}</td>
                    <td className="p-3 align-middle">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Cancel Booking
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingList;