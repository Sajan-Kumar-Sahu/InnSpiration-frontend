import { Button } from '@/components/ui/button';
import { SERVICE_LIST } from '@/config/app.config';
import Icon from '../ui/icon';
import { Link } from 'react-router';
import { PATHS } from '@/config/path.config';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import AccountMenu from '../account-menu';

const Header = () => {
  const { authenticatedUser } = useAuthContext();

  

  return (
    <header className="bg-brand py-2">
      <div className=" overflow-auto scrollbar flex justify-between items-center">
        <div id="logo-wrapper" className='px-4 py-4'>
          <Link to="/" aria-label="Go to InnSpiration">
            <img
              width={250}
              height={25}
              src="/assets/InnSpiration.svg"
              alt="Logo of InnSpiration"
            />
          </Link>
        </div>
        <div className="px-8 py-4 container flex gap-1 justify-center items-center">
          {SERVICE_LIST.map(item => {
            const button = (
              <Button 
                key={item.id} 
                className={`bg-transparent shadow-none font-normal rounded-full hover:bg-white/10
                cursor-pointer flex items-center gap-2 px-6 h-11 
                `}
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
        <div id="auth" className="px-8 py-4 flex gap-2 justify-center items-center">

          <Link to={PATHS.ADMIN_HOME}>
          <Button>List Your Properties</Button>
          </Link>

          {authenticatedUser.user ? (
            <AccountMenu user={authenticatedUser.user} />
          ) : (
            <>
              <Button
                className="bg-white cursor-pointer border-primary text-primary rounded-sm hover:bg-white/80"
                asChild
              >
                <Link to={PATHS.SIGN_UP}>Register</Link>
              </Button>
              <Button
                className="bg-white cursor-pointer border-primary text-primary rounded-sm hover:bg-white/80"
                asChild
              >
                <Link to={PATHS.SIGN_IN}>Login</Link>
              </Button>
            </>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;
