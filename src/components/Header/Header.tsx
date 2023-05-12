import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import 'src/components/Header/Header.style.scss';
import { HeaderItem, NavLinksProps } from 'src/interfaces/componentsProps';
import { useAuth } from 'src/hooks/useAuth';
import { FormattedMessage } from 'react-intl';

const links: Array<HeaderItem> = [
  {
    path: '/',
    style: 'link',
    name: 'Home',
    id: 'header.home',
  },
  {
    path: '/subscriptions',
    style: 'link',
    name: 'Subscriptions',
    id: 'header.subscriptions',
  },
  {
    path: '/about',
    style: 'link',
    name: 'About us',
    id: 'header.about',
  },
];

const authLinks: Array<HeaderItem> = [
  {
    path: '/login',
    style: 'link__login',
    name: 'Log in',
    id: 'header.login',
  },
];

const NavLinks: FC<NavLinksProps> = ({ item }) => {
  return (
    <>
      <Link to={item.path} className={item.style}>
        <FormattedMessage id={`${item.id}`} />
      </Link>
    </>
  );
};

const Header: FC = () => {
  const { auth } = useAuth();
  return (
    <>
      <header>
        <div className="container">
          <div className="content">
            <div className={'logo'}>
              <img src={require('src/assets/bitLogo.png')} alt={'logo'} />
            </div>

            <nav className={'navbar'}>
              {links.map((item) => {
                return <NavLinks key={item.name} item={item} />;
              })}
            </nav>

            <div className={'authorization'}>
              {!auth ? (
                <>
                  {authLinks.map((item) => {
                    return <NavLinks key={item.name} item={item} />;
                  })}
                </>
              ) : (
                <>
                  <div>
                    <Link to={'/user'}>
                      <img
                        className="avatar"
                        src={require('src/assets/userIcon.png')}
                        alt="user avatar"
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
