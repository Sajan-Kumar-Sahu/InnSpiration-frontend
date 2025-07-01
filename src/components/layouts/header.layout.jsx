// Header.jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SERVICE_LIST } from '@/config/app.config';
import Icon from '../ui/icon';
import { Link } from 'react-router';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import AccountMenu from '../account-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useLogoutHandler from '@/app/auth/hooks/use-logout';

const Header = () => {
  const { authenticatedUser } = useAuthContext();
  const { logoutHandler, pending } = useLogoutHandler();
  const [open, setOpen] = useState(false);

  const isMobile = window.innerWidth < 768;

  return (
    <header className="bg-brand py-2">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="px-4 py-4">
          <Link to="/" aria-label="Go to InnSpiration">
            <img
              width={250}
              height={25}
              src="/assets/InnSpiration.svg"
              alt="Logo of InnSpiration"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex px-8 py-4 gap-1 justify-center items-center">
          {SERVICE_LIST.map(item => {
            const button = (
              <Button 
                key={item.id} 
                className="bg-transparent shadow-none font-normal rounded-full hover:bg-white/10 flex items-center gap-2 px-6 h-11"
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

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex px-8 py-4 gap-2 justify-center items-center">
          <Link to={PATHS.ADMIN_HOME}>
            <Button>List Your Properties</Button>
          </Link>
          {authenticatedUser.user ? (
            <AccountMenu user={authenticatedUser.user} />
          ) : (
            <>
              <Button className="bg-white border-primary text-primary hover:bg-white/80" asChild>
                <Link to={PATHS.SIGN_UP}>Register</Link>
              </Button>
              <Button className="bg-white border-primary text-primary hover:bg-white/80" asChild>
                <Link to={PATHS.SIGN_IN}>Login</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon icon="menu" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 sm:w-80 bg-white text-black">
              <div className="px-4 pt-6 pb-4">
                {authenticatedUser.user && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`https://api.dicebear.com/9.x/dylan/svg?seed=${authenticatedUser.user.name}`}
                        alt="Avatar"
                      />
                      <div>
                        <p className="font-medium">{authenticatedUser.user.name}</p>
                        <p className="text-xs text-muted-foreground">{authenticatedUser.user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link to={PATHS.PROFILE} onClick={() => setOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Icon icon="user" size={18} />
                          <span className="ml-2">My Profile</span>
                        </Button>
                      </Link>
                      <Link to={PATHS.BOOKING_HISTORY} onClick={() => setOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <Icon icon="bookingHistory" size={18} />
                          <span className="ml-2">My Bookings</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <Link to="/" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Home
                    </Button>
                  </Link>
                  <Link to={PATHS.DESTINATIONS} onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Destinations
                    </Button>
                  </Link>
                  <Link to={PATHS.ABOUT_US} onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Our Story
                    </Button>
                  </Link>
                  <Link to={PATHS.CONTACT} onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Contact Us
                    </Button>
                  </Link>
                  <Link to={PATHS.ADMIN_HOME} onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      List Your Properties
                    </Button>
                  </Link>
                </div>

                {/* Logout */}
                {authenticatedUser.user && (
                  <div className="mt-4">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        logoutHandler();
                        setOpen(false);
                      }}
                      disabled={pending}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
