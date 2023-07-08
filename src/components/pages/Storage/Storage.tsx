import { FC, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { IFile } from 'src/models/IFile';
import { useAppSelector } from 'src/hooks/redux';
import { useNavigate } from 'react-router-dom';
import './Storage.style.scss';
import { UserHttpService } from '../../../services/userHttpService';

interface MenuLinkStorageProps {
  item: IFile;
  link: string;
}

const MenuLinkStorage: FC<MenuLinkStorageProps> = ({ item, link }) => {
  const LinkOnClickHandler = () => {
    window.scroll(0, 0);
  };

  const stateToLink = {
    id: item._id,
    name: item.name,
  };

  return (
    <div className={'menu__link'}>
      <NavLink onClick={LinkOnClickHandler} to={`${link}`} state={stateToLink}>
        {item.name}
      </NavLink>
    </div>
  );
};

const Storage: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [userStorages, setUserStorages] = useState<IFile[]>();
  const navigator = useNavigate();

  useEffect(() => {
    UserHttpService.getUsersAllStorage().then((res) => {
      setUserStorages(res);
    });
  }, [user?.files]);

  const handleCreateStorage = () => {
    navigator('/user/storage/create');
  };

  return (
    <>
      <div className={'storage text'}>
        <div className={'storage__menu'}>
          <button onClick={handleCreateStorage}>Create storage</button>
          <div className={'delimiter'}></div>
          <div className={'storage__menu__navigate'}>
            {userStorages?.map((item) => {
              return (
                <MenuLinkStorage key={item._id} item={item} link={item._id} />
              );
            })}
          </div>
        </div>
        <div className={'storage__outlet'}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Storage;
