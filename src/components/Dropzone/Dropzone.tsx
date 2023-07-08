import Dropzone from 'react-dropzone';
import './Dropzone.style.scss';
import { FC } from 'react';

interface DropzoneComponentProps {
  handleOnDrop: any;
}

const DropzoneComponent: FC<DropzoneComponentProps> = ({ handleOnDrop }) => {
  return (
    <>
      <Dropzone onDrop={handleOnDrop}>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div
            {...getRootProps({
              className: 'dropzone',
              onDrop: (event) => {
                event.stopPropagation();
              },
            })}>
            <div>
              <input {...getInputProps()} />
              {acceptedFiles.length === 0 ? (
                <p>Drag 'n' drop some files here, or click to select files</p>
              ) : (
                <div className={'dropzone__fileList'}>
                  {acceptedFiles.map((value) => (
                    <p key={value.name}>{value.name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default DropzoneComponent;
