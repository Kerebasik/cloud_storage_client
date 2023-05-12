import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

const User: FC = () => {
  return (
    <>
      <h1>
        <FormattedMessage id={'user.title'} />
      </h1>
    </>
  );
};

export default User;
