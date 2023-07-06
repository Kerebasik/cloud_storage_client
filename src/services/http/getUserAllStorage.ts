import axiosApiInstance from '../../http/axios';

export function getUserAllStorage() {
  return axiosApiInstance.get('/files');
}
