import React from 'react';
import Icon from 'src/assets/preload';
import 'src/components/Preloader/Preloader.style.scss';

const Preloader = () => {
  return (
    <>
      <div className="preloader">
        <Icon />
      </div>
    </>
  );
};

export default Preloader;
