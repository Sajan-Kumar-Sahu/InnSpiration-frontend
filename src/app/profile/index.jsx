import React, { useEffect, useState } from 'react';
import api from '@/lib/axios-instance';
import LoadingSpinner from '@/components/ui/loading-spinner';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', gender: '', dateOfBirth: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [aadhaarDialog, setAadhaarDialog] = useState(false);
  const [otpDialog, setOtpDialog] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');

  // 🔥 Added error popup states
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('users/profile');
        setUser(response.data);
        setFormData({
          name: response.data.name || '',
          gender: response.data.gender || '',
          dateOfBirth: response.data.dateOfBirth || '',
        });
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await api.patch('users/profile', formData);
      setUser(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  const openAadhaarDialog = () => {
    setAadhaarDialog(true);
    setSuccessMessage('');
    setError(null);
  };

  const closeAadhaarDialog = () => {
    setAadhaarDialog(false);
  };

  const closeOtpDialog = () => {
    setOtpDialog(false);
  };

  const submitAadhaar = async () => {
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      setErrorMessage('Please enter a valid 12-digit Aadhaar number');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      setVerifying(true);
      await api.post('users/verify/send-otp', { aadhaarNumber });
      setAadhaarDialog(false);
      setOtpDialog(true);
    } catch (err) {
      setErrorMessage('Failed to send OTP');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setVerifying(false);
    }
  };

  const submitOtp = async () => {
    try {
      setVerifying(true);
  
      const response = await api.post('users/verify/verify-otp', { aadhaarNumber, otp });
  
      const verified = response?.data?.verified;
      const statusMessage = response?.data?.status;
  
      if (verified) {
        setUser(prev => ({ ...prev, isVerified: true }));
        setSuccessMessage(statusMessage || 'Your account has been verified!');
        setOtpDialog(false);
        setOtp('');
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (err) {
      setErrorMessage('OTP verification failed');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://api.dicebear.com/9.x/dylan/svg?seed=${user.name}`}
            alt={`Profile image for ${user.name}`}
            className="w-24 h-24 rounded-full shadow-md border-4 border-blue-200"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
            {user.name}
            {user.isVerified && (
              <span className="inline-flex items-center text-blue-600 text-sm bg-blue-100 px-2 py-0.5 rounded-full">
                <svg className="h-4 w-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verified
              </span>
            )}
          </h2>
          <p className="text-gray-500">{user.email}</p>

          {!user.isVerified && (
            <div className="mt-4">
              <button
                className="px-4 py-1.5 bg-yellow-500 text-white text-sm rounded-full hover:bg-yellow-600 transition"
                onClick={openAadhaarDialog}
              >
                Verify
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700 text-base">
          <div className="flex flex-col items-center text-center">
            <span className="block font-medium text-gray-600">Gender</span>
            <span className="text-lg">{user.gender || 'N/A'}</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="block font-medium text-gray-600">Date of Birth</span>
            <span className="text-lg">{user.dateOfBirth || 'N/A'}</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="block font-medium text-gray-600">Aadhar Number</span>
            <span className="text-lg">{user.aadhaarNumber || 'N/A'}</span>
          </div>
        </div>

        {successMessage && (
          <div className="mt-4 text-green-600 font-semibold text-center">{successMessage}</div>
        )}

        <div className="mt-8 text-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow"
            onClick={handleEditToggle}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing && (
          <div className="mt-6 border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="border p-2 rounded-lg w-full"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border p-2 rounded-lg w-full"
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="mt-4 text-center">
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Aadhaar Dialog */}
      {aadhaarDialog && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <button
              className="absolute top-2 right-2 text-2xl font-semibold text-gray-700 p-2"
              onClick={closeAadhaarDialog}
              style={{ zIndex: 60 }}
            >
            &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Enter Aadhaar Number</h3>

            {showError && (
              <div className="mb-3 text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm">
                {errorMessage}
              </div>
            )}

            <input
              type="text"
              maxLength={12}
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              placeholder="12-digit Aadhaar"
              className="border p-2 w-full rounded mb-4"
            />
            <button
              onClick={submitAadhaar}
              disabled={verifying}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              {verifying ? 'Sending OTP...' : 'Verify'}
            </button>
          </div>
        </div>
      )}

      {/* OTP Dialog */}
      {otpDialog && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <button
              className="absolute top-2 right-2 text-xl font-semibold text-gray-700 p-2"
              onClick={closeOtpDialog}
              style={{ zIndex: 60 }}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Enter OTP</h3>
            {showError && (
              <div className="mb-3 text-red-600 bg-red-100 border border-red-300 rounded p-2 text-sm">
                {errorMessage}
              </div>
            )}
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 w-full rounded mb-4"
            />
            <button
              onClick={submitOtp}
              disabled={verifying}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {verifying ? 'Verifying...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
