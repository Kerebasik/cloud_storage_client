import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import createNewDir from '../../../services/http/createNewDir';
import { toast } from 'react-toastify';
import './UploadStorage.style.scss';
import DropzoneComponent from "../../Dropzone/Dropzone";
import { uploadFilesSequentially } from "../../../services/http/uploadFiles";
import { LocationState } from "../../../interfaces/states";

interface RadioButton {
  name: string;
  value: string;
  description: string;
}

const radioButtonsGroup: RadioButton[] = [
  {
    name: 'radio',
    value: 'dir',
    description: 'Directory',
  },
  {
    name: 'radio',
    value: 'file',
    description: 'File',
  },
];

interface FormProps{
  name:string,
  files: File[]
}

const UploadStorage = () => {
  const { handleSubmit,reset, watch, control, formState:{errors} } = useForm<FormProps>({defaultValues:{name:""}});
  const [radio, setRadio] = useState<string>('dir');
  const location = useLocation() as LocationState;
  const navigate = useNavigate();
  const files = watch('files')
  const name = watch('name');

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) =>
    setRadio(event.target.value);

  const handleOnSubmit: SubmitHandler<FormProps> = () => {
    createNewDir(name, location.state.id)
      .catch((error) => {
        toast.error(error.response.data.message);
      }).finally(()=>{
        navigate(-1);
    });
  };

  const handleUploadFiles =()=>{
    uploadFilesSequentially(files, location.state.id).then(()=>{
      navigate(-1)
    }).catch((error)=>{
      toast.error(error.response.data.message);
    }).finally(()=>{
      reset()
    })
  }


  return (
    <>
      <form onSubmit={handleSubmit( radio==='dir' ? handleOnSubmit : handleUploadFiles)}>
        <div className={'uploadStorage'}>
          <div className={'uploadStorage__content'}>
            <div className={'uploadStorage__title'}>
              <p>Storage selected: {location.state.name}</p>
            </div>
            <div className={'uploadStorage__switch'}>
              <p>Create:</p>
              {radioButtonsGroup.map((item) => (
                <label key={item.value}>
                  <input
                    type="radio"
                    name={item.name}
                    value={item.value}
                    checked={radio === item.value}
                    onChange={handleRadioChange}
                  />
                  {item.description}
                </label>
              ))}
            </div>
            <div>
              {radio === 'dir' && (
                <div className={'uploadStorage__directory'}>
                  <Controller
                    control={control}
                    name={'name'}
                    rules={{
                      required: {
                        value: radio==='dir',
                        message: 'Name is required',
                      },
                      maxLength: {
                        value: 20,
                        message: 'Max size for name is 20 charters',
                      },
                    }}
                    render={({field:{value, onChange}})=>(
                      <label>
                        Directory`s Name:
                        <input
                          type={'text'}
                          value={value}
                          onChange={onChange}
                        />
                        <p className={'uploadStorage__errorAlert'}>
                          {!!errors?.name?.message && errors.name.message}
                        </p>
                      </label>
                    )}
                  />

                </div>
              )}
              {radio === 'file' &&
                <div className={'uploadStorage__dropzone'}>
                  <Controller
                    control={control}
                    name='files'
                    rules={{
                      required: {
                        value: radio==='file',
                        message: 'Files is required',
                      }, }
                    }
                    render={({field:{onChange}})=>
                      (
                        <>
                          <DropzoneComponent handleOnDrop={onChange} />
                          <p className={'uploadStorage__errorAlert'}>
                            {!!errors?.name?.message && errors.name.message}
                          </p>
                        </>
                      )
                    }
                   />
                </div>
              }
            </div>
            <div className={'uploadStorage__submitButton'}>
              <button type={'submit'}>Create</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadStorage;
