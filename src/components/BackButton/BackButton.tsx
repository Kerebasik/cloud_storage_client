import { useNavigate } from 'react-router-dom';
import './BackButton.style.scss';

const BackButton = ({ children }: any) => {
  const navigator = useNavigate();

  const handleToBack = () => {
    navigator(-1);
  };

  return (
    <>
      {children}
      <div className={'backButton_container'}>
        <button onClick={handleToBack}>Back</button>
      </div>
    </>
  );
};

export default BackButton;
