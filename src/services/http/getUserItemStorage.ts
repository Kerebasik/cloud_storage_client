import axiosApiInstance from '../../http/axios';

export function getUserItemStorage(parent: string, sort?: string) {
  return axiosApiInstance.get(`/files?sort=${sort}&parent=${parent}`);
}
