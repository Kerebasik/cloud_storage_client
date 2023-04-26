import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.style.scss';

const Header: FC = () => {
  const userIsAuth = localStorage.getItem('token') || false;

  return (
    <>
      <header>
        <div className="container">
          <div className="content">
            <div className={'logo'}>
              <img src={require('src/assets/bitLogo.png')} alt={'logo'} />
            </div>

            <nav className={'navbar'}>
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/about" className="link">
                About us
              </Link>
              <Link to="/about" className="link">
                About
              </Link>
            </nav>

            <div className={'authorization'}>
              {!!userIsAuth ? (
                <>
                  <Link to="/login" className="link">
                    Log in
                  </Link>

                  <Link to="/signup" className="link">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <div className="avatar">
                    <img src="" alt= "user avatar"/>
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
