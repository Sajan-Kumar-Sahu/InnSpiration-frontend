import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config';
import React from 'react';
import Icon from '../ui/icon';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <div className="bg-secondary">
      <footer className="container">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(190px,1fr))] py-4 gap-6">
          {FOOTER_SECTION.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold">{section.title}</h3>
              <ul className="flex flex-col gap-1">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-sm hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
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
    </div>
  );
};

export default Footer;
