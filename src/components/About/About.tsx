import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import './About.style.scss'

const About: FC = () => {
  return (
    <div className={'about__content'}>
      <div className={'about__container'}>
        <div className={'about__title title'}>
        <h1>
          <FormattedMessage id={'about.title'} />
        </h1>
        <div>
          <p>Upload, transform and deliver content easily</p>
        </div>
        <div>

        </div>
      </div>
        <div className={'about__text text'}>

          <h3><strong>What is BitHolder?</strong></h3>
        <p>
          BitHolder is a robust set of tools and powerful
          APIs that allow you to upload, transform and deliver content easily.
          Our advanced UI integrations provide great experience to your users
          and our powerful APIs let you quickly and seamlessly manage all your
          file management needs. Filestack’s scalable infrastructure powers
          billions of uploads, transformations and downloads every month
          providing reliable performance to users anywhere in the world.

        </p>
        <p>
          BitHolder enables developers to upload and store large files,
          transform and manipulate images and other file types, and deliver that
          content with blazing speed, responsively, across any type of desktop
          or mobile device. Filestack is headquartered in San Antonio, Texas and
          is used by more than 50,000 app developers around the world.
        </p>
      </div>
      </div>
    </div>
  );
};

export default About;
