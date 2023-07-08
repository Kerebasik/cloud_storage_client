import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IFile } from 'src/models/IFile';
import EmptyFolder from 'src/assets/emptyFolderV2.png';
import derIcon from 'src/assets/dirIcons.png';
import fileIcon from 'src/assets/fileIcon.png';

import './StorageOutlet.style.scss';
import { dateParser } from '../../../services/timeParser';
import dayjs from 'dayjs';
import { LocationState } from '../../../interfaces/states';
import { toast } from 'react-toastify';
import { UserHttpService } from '../../../services/userHttpService';
import { FileHttpService } from '../../../services/fileHttpService';

interface ItemProps {
  item: IFile;
  onChangeStorage: Function;
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

const ItemInStorage: FC<ItemProps> = ({ item, onChangeStorage }) => {
  const navigator = useNavigate();

  const handleNavigate = () => {
    navigator(`/user/storage/${item._id}`, {
      state: { id: item._id, name: item.name, type: item.type },
    });
  };

  const handleDownloadButtonClick = () => {
    FileHttpService.downloadFile(item).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const handleDeleteButtonClick = () => {
    FileHttpService.deleteItem(item).then(() => {
      onChangeStorage(item._id);
    });
  };

  return (
    <div className={'storageOutlet__item'}>
      <img src={item.type === 'dir' ? derIcon : fileIcon} alt={'icon'} />
      <p className={'storageOutlet__item__title'} onClick={handleNavigate}>
        {item.name}
      </p>
      <div className={'storageOutlet__item__buttons'}>
        {item.type !== 'dir' && (
          <button onClick={handleDownloadButtonClick}>Download</button>
        )}
        <button onClick={handleDeleteButtonClick}>Delete</button>
      </div>
      <p className="storageOutlet__item__date">{dateParser(item.date)}</p>
    </div>
  );
};

const StorageOutlet: FC = () => {
  const { storageId } = useParams();
  const [storage, setStorage] = useState<IFile[]>();
  const navigate = useNavigate();
  const [image, setImage] = useState(fileIcon);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const location = useLocation() as LocationState;

  const removeItemById = (propertyValue: string) => {
    setStorage(storage?.filter((item: IFile) => item._id !== propertyValue));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      FileHttpService.searchFile(searchText, location.state.id).then((res) => {
        setStorage(res);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchText, location]);

  useEffect(() => {
    if (location.state?.type !== 'dir') {
      FileHttpService.getUserFile(location.state?.id).then((blob) => {
        setImage(blob);
      });
    } else {
      UserHttpService.getUserItemStorage(`${storageId}`, `${selectedOption}`)
        .then((res) => {
          setStorage(res);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          navigate('/user/storage');
        });
    }

    return () => {
      setStorage(undefined);
    };
  }, [storageId, selectedOption, navigate, location]);

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
    navigate('/user/storage/upload', {
      state: { id: location.state.id, name: location.state.name },
    });
  };

  return (
    <div className={'storageOutlet'}>
      <div className={'storageOutlet__panel'}>
        <p className={'storageOutlet__name'}>
          {!!location?.state?.name ? location.state.name : ''}
        </p>
        <div className={'storageOutlet__search'}>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type={'text'}
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
        <div className={'storageOutlet__sort'}>
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
        <button
          className={'storageOutlet__create'}
          onClick={handleNavigateOnUpload}>
          Create
        </button>
      </div>
      {location.state?.type !== 'dir' ? (
        <div className={'storageOutlet__image'}>
          <img src={image} alt={'file'} />
        </div>
      ) : storage?.length === 0 ? (
        <div className={'storageOutlet__empty'}>
          {' '}
          <img src={EmptyFolder} alt={'Icon empty folder'} />{' '}
        </div>
      ) : (
        storage?.map((item) => {
          return (
            <ItemInStorage
              onChangeStorage={removeItemById}
              key={item._id}
              item={item}
            />
          );
        })
      )}
    </div>
  );
};

export default StorageOutlet;
