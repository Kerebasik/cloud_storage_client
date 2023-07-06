import axiosApiInstance from '../../http/axios';

const getSearchFile = (searchData?: string, parent?: string) => {
  return axiosApiInstance.get(
    `/files/search?search=${searchData}&parent=${parent}`,
  );
};

export default getSearchFile;
