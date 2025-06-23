import { Routes, Route } from 'react-router';
import Sidebar from './components/Sidebar';
import DashboardHome from './DashboardHome';
import HotelList from './HotelList';
import BookingList from './BookingList';
import RoomList from './RoomList';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<DashboardHome/>} />
          <Route path="hotels" element={<HotelList/>}/>
          <Route path="bookings" element={<BookingList/>}/>
          <Route path="rooms" element={<RoomList/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;