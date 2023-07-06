import { useForm, SubmitHandler } from 'react-hook-form';
import axiosApiInstance from '../../../http/axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { userSlice } from '../../../store/reducers/userSlice';
import { AxiosResponse } from 'axios';
import { IFile } from '../../../models/IFile';

import './CreateStorage.style.scss';

const CreateStorage = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { addNewDir } = userSlice.actions;
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });

  const name = watch('name');

  const handleOnSubmit: SubmitHandler<{ name: string }> = () => {
    axiosApiInstance
      .post('/files', { name, type: 'dir' })
      .then((res: AxiosResponse<IFile>) => {
        dispatch(addNewDir(res.data._id));
        navigator('/user/storage');
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <>
      <div className={'createDirForStorage'}>
        <div className={'createDirForStorage__form'}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <label>Name: </label>
            <div>
              <input
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Max size for name is 20 charters',
                  },
                })}
                type={'text'}
              />
              <p className={'createDirForStorage__form__errorAlert'}>
                {!!errors?.name?.message && errors.name.message}
              </p>
            </div>

            <button type={'submit'} formNoValidate>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStorage;
