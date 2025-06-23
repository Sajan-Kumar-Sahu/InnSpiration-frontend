import React from 'react';
import { Link } from 'react-router';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import useLogoutHandler from '@/app/auth/hooks/use-logout';

const AdminHeader = () => {
  const { authenticatedUser } = useAuthContext();
  const { logoutHandler, pending } = useLogoutHandler();

  // Always check this way so React can detect changes
  const isLoggedIn = !!authenticatedUser?.isAuthenticated;

  return (
    <header className="bg-brand text-white px-7 py-4 shadow-md flex justify-between items-center">
      <div id="logo-wrapper" className='px-0'>
          <Link to="/admin" aria-label="Go to InnSpiration">
            <img
              width={200}
              height={25}
              src="/assets/InnSpiration.svg"
              alt="Logo of InnSpiration"
            />
          </Link>
        </div>
      <nav className="flex gap-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={logoutHandler}
              disabled={pending}
              className="bg-white cursor-pointer border border-primary text-primary font-semibold text-base px-4 py-2 rounded-md hover:bg-white/80 disabled:opacity-50 transition-all duration-200"
            >
              {pending ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
          <Link to={PATHS.LANDING} className="hover:underline">
              Home
            </Link>
            <text>|</text>
            <Link to={PATHS.ADMIN_SIGN_IN} className="hover:underline">
              Login
            </Link>
            <text>|</text>
            <Link to={PATHS.ADMIN_SIGN_UP} className="hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default AdminHeader;
