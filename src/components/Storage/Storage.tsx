import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Storage.style.scss';

const Storage: FC = () => {
  const { userId } = useParams();

  useEffect(() => {}, [userId]);

  return (
    <>
      <div>Storage {userId} </div>
    </>
  );
};

export default Storage;
