import axiosApiInstance from '../../http/axios';

export const getUser = () => {
  return axiosApiInstance.post('/auth').then((response) => {
    return response.data;
  });
};
