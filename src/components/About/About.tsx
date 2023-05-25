import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import './About.style.scss';
import { Link } from 'react-router-dom';

const About: FC = () => {
  return (
    <div className={'about__content'}>
      <div className={'about__container'}>
        <div className={'about__title'}>
          <h1 className={'title'}>
            <FormattedMessage id={'about.title'} />
          </h1>
          <div className={'about__title__text text'}>
            <p>
              <FormattedMessage id={'about.subtitle'} />
            </p>
          </div>
          <div className={'auth'}>
            <div className={'auth__buttons'}>
              <button className={'login__button text'}>
                <Link className={'link'} to={'/subscriptions'}>
                  <FormattedMessage id={'about.button.plans'} />
                </Link>
              </button>
              <button className={'signup__button text'}>
                <Link className={'link'} to={'/signup'}>
                  <FormattedMessage id={'about.button.signup'} />
                </Link>
              </button>
            </div>
            <div className={'auth__banner'}></div>
          </div>
        </div>
        <div className={'about__text text'}>
          <h3>
            <strong>
              <FormattedMessage id={'about.text.title'} />
            </strong>
          </h3>
          <p>
            <FormattedMessage id={'about.text.firstParagraph'} />
          </p>
          <p>
            <FormattedMessage
              id={'about.text.secondParagraph'}></FormattedMessage>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
