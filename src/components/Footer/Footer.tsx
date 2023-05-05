import React, { FC } from 'react';
import './Footer.style.scss';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className={'container content'}>
        <div>© {year} All Copyrights Reserved To BitHolder</div>
      </div>
    </footer>
  );
};

export default Footer;
