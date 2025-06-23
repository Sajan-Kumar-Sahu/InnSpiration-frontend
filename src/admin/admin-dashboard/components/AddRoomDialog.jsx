import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axiosInstance from '@/lib/axios-instance';
import { Button } from '@/components/ui/button';

const AddRoomDialog = ({ isOpen, onClose, hotelId, onRoomAdded }) => {
  const [roomData, setRoomData] = useState({
    type: '',
    basePrice: '',
    capacity: '',
    amenities: [],
    totalCount: '',
    photos: ['', '', ''], // Placeholder for photo URL input
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amenities') {
      setRoomData((prevData) => ({
        ...prevData,
        amenities: prevData.amenities.includes(value)
          ? prevData.amenities.filter((item) => item !== value)
          : [...prevData.amenities, value],
      }));
    } else if (name.includes('photos')) {
      const index = parseInt(name.split('-')[1]);
      setRoomData((prevData) => {
        const newPhotos = [...prevData.photos];
        newPhotos[index] = value;
        return { ...prevData, photos: newPhotos };
      });
    } else {
      setRoomData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreateRoom = async () => {
    try {
      const payload = {
        ...roomData,
        basePrice: parseFloat(roomData.basePrice),
        capacity: parseInt(roomData.capacity),
        totalCount: parseInt(roomData.totalCount),
        amenities: Array.isArray(roomData.amenities)
          ? roomData.amenities.join(',').split(',').map(a => a.trim())
          : roomData.amenities.split(',').map(a => a.trim()),
        photos: Array.isArray(roomData.photos)
          ? roomData.photos.join(',').split(',').map(p => p.trim())
          : roomData.photos.split(',').map(p => p.trim()),
      };
  
      await axiosInstance.post(`/admin/hotels/${hotelId}/rooms`, payload);

      setRoomData({
        type: '',
        basePrice: '',
        capacity: '',
        amenities: [],
        totalCount: '',
        photos: ['','','']
      });
  
  
      await onRoomAdded(); // ✅ Refresh room list
      onClose(); // ✅ Close the dialog after refresh
    } catch (err) {
      console.error('Error creating room:', err);
      alert('Failed to create room');
    }
  };
  
  
  
    

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">Add New Room</Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="type">Room Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={roomData.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="basePrice">Base Price</label>
              <input
                type="text"
                id="basePrice"
                name="basePrice"
                value={roomData.basePrice}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="capacity">Capacity</label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={roomData.capacity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Amenities</label>
              <div className="flex space-x-4">
                {['Lake View', 'Pool Area', 'Family compatible'].map((amenity) => (
                  <div key={amenity}>
                    <input
                      type="checkbox"
                      id={amenity}
                      name="amenities"
                      value={amenity}
                      checked={roomData.amenities.includes(amenity)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor={amenity}>{amenity}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="totalCount">Total Count</label>
              <input
                type="text"
                id="totalCount"
                name="totalCount"
                value={roomData.totalCount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="photos">Photos (URLs)</label>
              {roomData.photos.map((photo, index) => (
                <input
                  key={index}
                  type="text"
                  name={`photos-${index}`}
                  value={photo}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder={`Photo URL ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleCreateRoom}>Create Room</Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddRoomDialog;
