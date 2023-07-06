import axiosApiInstance from '../../http/axios';

const CreateNewDir = (name: string, parent: string) => {
  return axiosApiInstance.post('/files', { name, parent, type: 'dir' });
};

export default CreateNewDir;
