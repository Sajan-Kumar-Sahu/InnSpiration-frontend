import { Link, useLocation } from 'react-router'; // Make sure it's 'react-router-dom'
import { LayoutDashboard, Building2, Book, BedDouble } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard />, exact: true },
    { to: '/admin/dashboard/hotels', label: 'Hotels', icon: <Building2 /> },
    { to: '/admin/dashboard/bookings', label: 'Bookings', icon: <Book /> },
    { to: '/admin/dashboard/rooms', label: 'Rooms', icon: <BedDouble /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = link.exact
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
