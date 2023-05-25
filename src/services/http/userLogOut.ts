import axiosApiInstance from '../../http/axios';

export function userLogOut() {
  return axiosApiInstance.get('/auth/logout');
}
