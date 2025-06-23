import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios-instance';

const AddHotelDialog = ({ isOpen, onClose, onHotelAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    photos:['','','',''],
    amenities:[],
    contactInfo: {
      address: '',
      phoneNumber: '',
      email: '',
      location: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amenities') {
        // Toggle amenity selection
        setFormData((prevData) => ({
          ...prevData,
          amenities: prevData.amenities.includes(value)
            ? prevData.amenities.filter((item) => item !== value)
            : [...prevData.amenities, value],
        }));
      } else if (name.includes('photos')) {
        const index = parseInt(name.split('-')[1]);
        setFormData((prevData) => {
          const newPhotos = [...prevData.photos];
          newPhotos[index] = value;
          return { ...prevData, photos: newPhotos };
        });
      } else if (name in formData.contactInfo) {
        // Handle contactInfo fields like address, phoneNumber, etc.
        setFormData((prevData) => ({
          ...prevData,
          contactInfo: {
            ...prevData.contactInfo,
            [name]: value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post('/admin/hotels', formData);
      onHotelAdded(); // refetch hotel list
      onClose();
    } catch (err) {
      console.error('Error creating hotel:', err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">Add New Hotel</Dialog.Title>
          <div className="space-y-4">
             {/* Hotel Name */}
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="name">Hotel Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="photos">Photos (URLs)</label>
            {formData.photos.map((photo, index) => (
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

          {/* Amenities */}
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
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.contactInfo.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.contactInfo.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="location">Location (Coordinates)</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.contactInfo.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Create Hotel</Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddHotelDialog;
