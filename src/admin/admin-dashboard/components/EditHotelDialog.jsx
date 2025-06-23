import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios-instance';

const EditHotelDialog = ({ isOpen, onClose, hotel, onHotelUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    contactInfo: { address: '', email: '', phoneNumber: '', location: '' },
    amenities: '',
    photos: ''
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        city: hotel.city,
        contactInfo: {
          address: hotel.contactInfo?.address || '',
          email: hotel.contactInfo?.email || '',
          phoneNumber: hotel.contactInfo?.phoneNumber || '',
          location: hotel.contactInfo?.location || ''
        },
        amenities: Array.isArray(hotel.amenities) ? hotel.amenities.join(', ') : '',
        photos: Array.isArray(hotel.photos) ? hotel.photos.join(', ') : '',
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If it's a contactInfo field
    if (['address', 'email', 'phoneNumber', 'location'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        name: formData.name,
        city: formData.city,
        contactInfo: formData.contactInfo,
        amenities: formData.amenities.split(',').map((a) => a.trim()),
        photos: formData.photos.split(',').map((img) => img.trim()),
      };
  
      console.log("Updating hotel with ID:", hotel.id);
      console.log("Payload:", payload);
  
      const response = await axiosInstance.put(`/admin/hotels/${hotel.id}`, payload);
  
      console.log("Update response:", response);
  
      await onHotelUpdated();
      onClose();
    } catch (err) {
      console.error('Error updating hotel:', err.response?.data || err.message);
      alert('Failed to update hotel');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Hotel</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Hotel Name"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.contactInfo.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="text"
          name="email"
          value={formData.contactInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.contactInfo.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.contactInfo.location}
          onChange={handleChange}
          placeholder="Location (Coordinates)"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma separated)"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="text"
          name="photos"
          value={formData.photos}
          onChange={handleChange}
          placeholder="Photos (comma separated URLs)"
          className="w-full p-2 border mb-3 rounded"
        />

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditHotelDialog;
