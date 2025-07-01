import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SERVICE_LIST } from '@/config/app.config';
import Icon from '../ui/icon';
import { Link } from 'react-router';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import AccountMenu from '../account-menu';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { authenticatedUser } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand py-2 shadow-md">
      <div className="container flex justify-between items-center px-4 py-3 relative">
        {/* Logo */}
        <Link to="/" aria-label="Go to InnSpiration">
          <img
            width={180}
            height={25}
            src="/assets/InnSpiration.svg"
            alt="Logo of InnSpiration"
            className="h-10"
          />
        </Link>

        {/* Desktop Nav */}
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

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex gap-2 items-center">
          <Link to={PATHS.ADMIN_HOME}>
            <Button>List Your Properties</Button>
          </Link>
          {authenticatedUser.user ? (
            <AccountMenu user={authenticatedUser.user} />
          ) : (
            <>
              <Button
                className="bg-white border text-primary hover:bg-white/80"
                asChild
              >
                <Link to={PATHS.SIGN_UP}>Register</Link>
              </Button>
              <Button
                className="bg-white border text-primary hover:bg-white/80"
                asChild
              >
                <Link to={PATHS.SIGN_IN}>Login</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-brand border-t border-white/20 p-4 flex flex-col gap-3 z-50 lg:hidden">
            {SERVICE_LIST.map(item => (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => setIsMenuOpen(false)}
                className="text-white flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded"
              >
                <Icon icon={item.icon} />
                {item.title}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-2">
              <Link to={PATHS.ADMIN_HOME}>
                <Button className="w-full">List Your Properties</Button>
              </Link>

              {authenticatedUser.user ? (
                <AccountMenu user={authenticatedUser.user} />
              ) : (
                <>
                  <Button
                    className="w-full bg-white text-primary hover:bg-white/80"
                    asChild
                  >
                    <Link to={PATHS.SIGN_UP}>Register</Link>
                  </Button>
                  <Button
                    className="w-full bg-white text-primary hover:bg-white/80"
                    asChild
                  >
                    <Link to={PATHS.SIGN_IN}>Login</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
