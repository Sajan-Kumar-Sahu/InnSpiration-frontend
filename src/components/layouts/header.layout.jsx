import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SERVICE_LIST } from '@/config/app.config';
import Icon from '../ui/icon';
import { Link, useNavigate } from 'react-router';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import AccountMenu from '../account-menu';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { authenticatedUser } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const MobileNavLink = ({ to, children }) => (
    <div
      onClick={() => {
        setIsMenuOpen(false);
        navigate(to);
      }}
      className="text-white py-2 px-3 hover:bg-white/10 rounded block cursor-pointer"
    >
      {children}
    </div>
  );

  const handleLogout = () => {
    setIsMenuOpen(false);
    navigate('/logout');
  };

  return (
    <header className="bg-brand py-2 shadow-md">
      <div className="container flex justify-between items-center px-4 py-3 relative">
        <Link to="/" aria-label="Go to InnSpiration">
          <img
            width={180}
            height={25}
            src="/assets/InnSpiration.svg"
            alt="Logo of InnSpiration"
            className="h-10"
          />
        </Link>

        <div className="hidden lg:flex gap-4 items-center">
          {SERVICE_LIST.map(item => {
            const button = (
              <Button
                key={item.id}
                className="bg-transparent shadow-none font-normal rounded-full hover:bg-white/10 flex items-center gap-2 px-5 h-10"
              >
                <Icon icon={item.icon} />
                {item.title}
              </Button>
            );
            return item.link ? (
              <Link key={item.id} to={item.link}>
                {button}
              </Link>
            ) : (
              button
            );
          })}
        </div>

        <div className="hidden lg:flex gap-2 items-center">
          <Link to={PATHS.ADMIN_HOME}>
            <Button>List Your Properties</Button>
          </Link>
          {authenticatedUser.user ? (
            <AccountMenu user={authenticatedUser.user} />
          ) : (
            <>
              <Button className="bg-white border text-primary hover:bg-white/80" asChild>
                <Link to={PATHS.SIGN_UP}>Register</Link>
              </Button>
              <Button className="bg-white border text-primary hover:bg-white/80" asChild>
                <Link to={PATHS.SIGN_IN}>Login</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-white z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div
          className={`absolute top-full left-0 w-full bg-brand border-t border-white/20 p-4 flex flex-col gap-2 z-40 lg:hidden transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
        >
          {authenticatedUser.user && (
            <div className="flex items-start gap-3 border-b border-white/20 pb-3 mb-2">
              <img
                src={authenticatedUser.user.avatar || '/assets/default-avatar.png'}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-white">
                <p className="font-semibold text-base">{authenticatedUser.user.fullName || 'Guest User'}</p>
                <p className="text-sm text-muted-foreground">{authenticatedUser.user.email}</p>
              </div>
            </div>
          )}

          {authenticatedUser.user && (
            <>
              <MobileNavLink to="/profile">My Profile</MobileNavLink>
              <MobileNavLink to="/bookings">My Bookings</MobileNavLink>
            </>
          )}

          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/destination">Destinations</MobileNavLink>
          <MobileNavLink to="/our-story">Our Story</MobileNavLink>
          <MobileNavLink to="/contact">Contact Us</MobileNavLink>

          <MobileNavLink to={PATHS.ADMIN_HOME}>
            <Button className="w-full">List Your Properties</Button>
          </MobileNavLink>

          {authenticatedUser.user ? (
            <div onClick={handleLogout} className="text-white py-2 px-3 hover:bg-white/10 rounded cursor-pointer">
              Logout
            </div>
          ) : (
            <>
              <MobileNavLink to={PATHS.SIGN_UP}>
                <Button className="w-full bg-white text-primary hover:bg-white/80">
                  Register
                </Button>
              </MobileNavLink>
              <MobileNavLink to={PATHS.SIGN_IN}>
                <Button className="w-full bg-white text-primary hover:bg-white/80">
                  Login
                </Button>
              </MobileNavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
