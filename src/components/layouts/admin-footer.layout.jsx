import dayjs from 'dayjs';
import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="">
            <div className="bg-brand">
              <div className="flex items-center justify-center gap-4 p-4 mx-auto sm:flex-row max-w-7xl">
                <div>
                  <p className="text-sm text-center text-white">
                     &copy;{' '}
                    {`${dayjs().year()} InnSpiration™`}
                  </p>
                </div>
              </div>
            </div>
    </footer>
  );
};

export default AdminFooter;
