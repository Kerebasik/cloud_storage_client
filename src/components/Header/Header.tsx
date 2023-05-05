import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import 'src/components/Header/Header.style.scss';
import { NavLinksProps } from 'src/interfaces/componentsProps';
import { useAuth } from '../../hooks/useAuth';

const links: Array<NavLinksProps> = [
  {
    path: '/',
    style: 'link',
    name: 'Home',
  },
  {
    path: '/about',
    style: 'link',
    name: 'About us',
  },
  {
    path: '/subscriptions',
    style: 'link',
    name: 'Subscriptions',
  },
];

const authLinks: Array<NavLinksProps> = [
  {
    path: '/login',
    style: 'link_login',
    name: 'Log in',
  },
  {
    path: '/signup',
    style: 'link_signup',
    name: 'Sign up',
  },
];

const NavLinks: FC<NavLinksProps> = ({ path, style, name }: NavLinksProps) => {
  return (
    <>
      <Link to={path} className={style}>
        {name}
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
                return (
                  <NavLinks
                    key={item.name}
                    path={item.path}
                    style={item.style}
                    name={item.name}
                  />
                );
              })}
            </nav>

            <div className={'authorization'}>
              {!auth ? (
                <>
                  {authLinks.map((item) => {
                    return (
                      <NavLinks
                        key={item.name}
                        name={item.name}
                        style={item.style}
                        path={item.path}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <div>
                    <Link to={'/'}>
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
