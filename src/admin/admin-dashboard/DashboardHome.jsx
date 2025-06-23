import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios-instance';
import { Hotel, CalendarCheck, IndianRupee, TrendingUp } from 'lucide-react';
import WidgetCard from './components/Widgetcard';
import { Button } from '@/components/ui/button';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRevenue: 0,
  });

  const [adminName, setAdminName] = useState('');
  const [inactiveHotels, setInactiveHotels] = useState([]);

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const res = await axiosInstance.get('/users/profile');
        setAdminName(res.data.name);
      } catch (err) {
        console.error('Error fetching admin profile:', err);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/admin/hotels');
        const hotels = response.data;

        let totalBookings = 0;
        let totalRevenue = 0;

        // Get reports and filter inactive
        await Promise.all(
          hotels.map(async (hotel) => {
            try {
              const res = await axiosInstance.get(`/admin/hotels/${hotel.id}/reports`);
              totalBookings += res.data.bookingCount;
              totalRevenue += res.data.totalRevenue;
            } catch (err) {
              console.error(`Error fetching report for hotel ${hotel.id}:`, err);
            }
          })
        );

        const avgRevenue = hotels.length > 0 ? totalRevenue / hotels.length : 0;

        setStats({
          totalHotels: hotels.length,
          totalBookings,
          totalRevenue: totalRevenue.toFixed(2),
          averageRevenue: avgRevenue.toFixed(2),
        });

        // Filter inactive hotels
        const inactive = hotels.filter(h => !h.active);
        setInactiveHotels(inactive);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchAdminName();
    fetchStats();
  }, []);

  const handleActivate = async (hotelId) => {
    try {
      await axiosInstance.patch(`/admin/hotels/${hotelId}/activate`);
      // Refresh list after activation
      setInactiveHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
      alert('Hotel activated successfully!');
    } catch (err) {
      console.error('Error activating hotel:', err);
      alert('Failed to activate hotel.');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome back{adminName ? `, ${adminName}` : ''}! 👋
        </h2>
        <p className="text-gray-500">
          Here’s a quick summary of your hotel network’s performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mb-10">
        <WidgetCard
          title="Total Hotels"
          value={stats.totalHotels}
          icon={Hotel}
          color="text-blue-600"
        />
        <WidgetCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={CalendarCheck}
          color="text-green-600"
        />
        <WidgetCard
          title="Total Revenue (₹)"
          value={stats.totalRevenue}
          icon={IndianRupee}
          color="text-purple-600"
        />
        <WidgetCard
          title="Average Revenue (₹)"
          value={stats.averageRevenue}
          icon={TrendingUp}
          color="text-yellow-600"
        />
      </div>

      {inactiveHotels.length > 0 && (
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-red-600">Inactive Hotels</h3>
          <ul className="space-y-4">
            {inactiveHotels.map((hotel) => (
              <li key={hotel.id} className="flex justify-between items-center border p-4 rounded">
                <div>
                  <h4 className="text-md font-semibold">{hotel.name}</h4>
                  <p className="text-sm text-gray-600">{hotel.city}</p>
                </div>
                <Button onClick={() => handleActivate(hotel.id)}>Activate Hotel</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
