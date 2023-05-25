import axiosApiInstance from '../../http/axios';

export function setUserAvatar(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return axiosApiInstance.post('/user/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
