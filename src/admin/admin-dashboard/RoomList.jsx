import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios-instance';
import AddRoomDialog from './components/AddRoomDialog';
import LoadingSpinner from '@/components/ui/loading-spinner'; // 👈 Spinner import added

const RoomList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRoomDialog, setShowAddRoomDialog] = useState(false);

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

  const fetchRooms = async () => {
    if (!selectedHotel) return;
    setLoading(true);
    try {
      const roomsRes = await axiosInstance.get(`/admin/hotels/${selectedHotel}/rooms`);
      setRooms(roomsRes.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [selectedHotel]);

  const openAddRoomDialog = () => {
    if (!selectedHotel) {
      alert('Please select a hotel first!');
    } else {
      setShowAddRoomDialog(true);
    }
  };

  const closeAddRoomDialog = () => {
    setShowAddRoomDialog(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Rooms</h1>

      {/* Dropdown and Add Room Button */}
      <div className="mb-6 flex justify-between items-end">
        <div className="w-1/2">
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

        <button
          onClick={openAddRoomDialog}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Room
        </button>
      </div>

      <AddRoomDialog
        isOpen={showAddRoomDialog}
        onClose={closeAddRoomDialog}
        hotelId={selectedHotel}
        onRoomAdded={fetchRooms}
      />

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="p-3">Room ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Total Count</th>
                <th className="p-3">Room Capacity</th>
                <th className="p-3">Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-3 text-center">
                    No rooms available for this hotel.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="border-b hover:bg-gray-50 text-sm">
                    <td className="p-3">{room.id}</td>
                    <td className="p-3">{room.type}</td>
                    <td className="p-3">{room.totalCount}</td>
                    <td className="p-3">{room.capacity}</td>
                    <td className="p-3">{room.basePrice}</td>
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

export default RoomList;