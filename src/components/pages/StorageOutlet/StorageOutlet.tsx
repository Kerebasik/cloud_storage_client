import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserItemStorage } from 'src/services/http/getUserItemStorage';
import { IFile } from 'src/models/IFile';
import { AxiosResponse } from 'axios';
import EmptyFolder from 'src/assets/emptyFolderV2.png';
import derIcon from 'src/assets/dirIcons.png';
import fileIcon from 'src/assets/fileIcon.png';

import './StorageOutlet.style.scss';
import { dateParser } from '../../../services/timeParser';
import dayjs from 'dayjs';
import getSearchFile from '../../../services/http/getSearchFile';
import { LocationState } from "../../../interfaces/states";
import { toast } from "react-toastify";

interface ItemProps {
  item: IFile;
}

interface Option {
  value: string;
  label: string;
}

const sortSelectButtons: Option[] = [
  { value: '', label: '' },
  { value: 'type', label: 'Type' },
  { value: 'name', label: 'Name' },
  { value: 'date', label: 'Date' },
];

const ItemInStorage: FC<ItemProps> = ({ item }) => {
  const navigator = useNavigate();

  const handleNavigate = () => {
    navigator(`/user/storage/${item._id}`, { state: {id:item._id, name:item.name} });
  };

  return (
    <div className={'storageOutlet__item'} onClick={handleNavigate}>
      <img src={item.type === 'dir' ? derIcon : fileIcon} alt={'icon'} />
      <p>{item.name}</p>
      <div>
        <button>Download</button>
        <button>Delete</button>
      </div>
      <p>{dateParser(item.date)}</p>
    </div>
  );
};

const StorageOutlet: FC = () => {
  const { storageId } = useParams();
  const [storage, setStorage] = useState<IFile[]>();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const location = useLocation() as LocationState;

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchFile(searchText, location.state.id).then(
        (res: AxiosResponse<IFile[]>) => {
          setStorage(res.data);
        },
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchText, location]);

  useEffect(() => {
    getUserItemStorage(`${storageId}`, `${selectedOption}`)
      .then((res: AxiosResponse<IFile[]>) => {
        setStorage(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        navigate('/user/storage');
      });
    return () => {
      setStorage(undefined);
    };
  }, [storageId, selectedOption, navigate]);

  useEffect(() => {
    if (location.state === null) {
      navigate('/user/storage');
    }
  }, [location, navigate]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleNavigateOnUpload = () => {
    navigate('/user/storage/upload', { state: { id:location.state.id, name:location.state.name } });
  };

  return (
    <div className={'storageOutlet'}>
      <div className={'storageOutlet__panel'}>
        <p>{!!location?.state?.name ? location.state.name : ''}</p>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type={'text'}
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="fruits">Sort by: </label>
          <select id="fruits" value={selectedOption} onChange={handleSelect}>
            {sortSelectButtons.map(({ value, label }) => {
              return (
                <option key={value + dayjs()} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={handleNavigateOnUpload}>Create</button>
      </div>
      {storage?.length === 0 ? (
        <div className={'storageOutlet__empty'}>
          {' '}
          <img src={EmptyFolder} alt={'Icon empty folder'} />{' '}
        </div>
      ) : (
        storage?.map((item) => {
          return <ItemInStorage key={item._id} item={item} />;
        })
      )}
    </div>
  );
};

export default StorageOutlet;
