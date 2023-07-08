import './ActivateAccount.style.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivateAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/user');
    }, 3000);
  });

  return (
    <>
      <div className={'activateAccount'}>
        <div className={'activateAccount__content'}>
          <div className={'activateAccount__content__text'}>
            Account Activated
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;
