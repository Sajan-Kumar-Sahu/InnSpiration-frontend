import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios-instance';
import { Button } from '@/components/ui/button';
import AddHotelDialog from './components/AddHotelDialog';
import EditHotelDialog from './components/EditHotelDialog';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const hotelRes = await axiosInstance.get('/admin/hotels');
      const hotelList = hotelRes.data;

      const hotelsWithStats = await Promise.all(
        hotelList.map(async (hotel) => {
          try {
            const statsRes = await axiosInstance.get(`/admin/hotels/${hotel.id}/reports`);
            return {
              ...hotel,
              bookingCount: statsRes.data.bookingCount,
              totalRevenue: statsRes.data.totalRevenue,
              avgRevenue: statsRes.data.avgRevenue,
            };
          } catch (err) {
            console.error(`Error fetching stats for hotel ${hotel.id}:`, err);
            return {
              ...hotel,
              bookingCount: 'N/A',
              totalRevenue: 'N/A',
              avgRevenue: 'N/A',
            };
          }
        })
      );

      setHotels(hotelsWithStats);
    } catch (err) {
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleEditClick = (hotel) => {
    setSelectedHotel(hotel);
    setEditDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6 text-lg">Loading hotels...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel List</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Hotel</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="p-3">Hotel Name</th>
              <th className="p-3">City</th>
              <th className="p-3">Location</th>
              <th className="p-3">Bookings</th>
              <th className="p-3">Total Revenue (₹)</th>
              <th className="p-3">Avg Revenue (₹)</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">{hotel.name}</td>
                <td className="p-3">{hotel.city}</td>
                <td className="p-3">{hotel.contactInfo?.address}</td>
                <td className="p-3">{hotel.bookingCount}</td>
                <td className="p-3">{hotel.totalRevenue}</td>
                <td className="p-3">{hotel.avgRevenue}</td>
                <td className="p-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEditClick(hotel)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddHotelDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onHotelAdded={fetchHotels}
      />

      {selectedHotel && (
        <EditHotelDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          hotel={selectedHotel}
          onHotelUpdated={fetchHotels}
        />
      )}
    </div>
  );
};

export default HotelList;
