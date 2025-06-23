import React from 'react';
import { Link } from 'react-router';
import { PATHS } from '@/config/path.config';
import { Hotel, LogIn, UserPlus } from 'lucide-react';

const AdminHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-accent text-white relative">

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 py-20 gap-12">
        {/* Left content */}
        <div className="max-w-2xl">
          <h1 className="text-5xl text-black font-bold leading-tight mb-6">
            Empower Your Hotel Business
          </h1>
          <p className="text-lg text-black mb-6">
            Welcome to <span className="font-semibold text-black">InnSpiration Admin Portal</span> — the all-in-one platform to manage listings, bookings, guest experiences, and analytics with ease.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Manage multiple hotel branches from a single dashboard</li>
            <li>Track bookings, cancellations & payments</li>
            <li>Provide real-time availability to your guests</li>
            <li>Boost your hotel's visibility and occupancy rate</li>
          </ul>
        </div>

        {/* Right login/register card */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Hotel className="w-10 h-10 text-blue-600 mb-2" />
            <h2 className="text-2xl font-bold text-center">Admin Access</h2>
            <p className="text-sm text-gray-500 text-center">
              Sign in or register to start managing your hotel properties.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Link
              to={PATHS.ADMIN_SIGN_IN}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <LogIn className="w-5 h-5" />
              Admin Login
            </Link>
            <Link
              to={PATHS.ADMIN_SIGN_UP}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-200"
            >
              <UserPlus className="w-5 h-5" />
              Admin Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
