import { IFile } from '../models/IFile';
import axiosApiInstance from '../http/axios';
import { AxiosResponse } from 'axios';

class FileHttpService {
  static deleteItem(item: IFile) {
    return axiosApiInstance.delete(`/files/delete?id=${item._id}`);
  }

  static createNewDir(name: string, parent: string) {
    return axiosApiInstance.post('/files', { name, parent, type: 'dir' });
  }

  static async downloadFile(file: IFile) {
    try {
      const response = await axiosApiInstance(
        `/files/download?id=${file._id}`,
        { responseType: 'blob' },
      );
      if (response.status === 200) {
        const downloadURL = window.URL.createObjectURL(
          new Blob([response.data]),
        );
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static searchFile(searchData?: string, parent?: string) {
    return axiosApiInstance
      .get(`/files/search?search=${searchData}&parent=${parent}`)
      .then((res: AxiosResponse<IFile[]>) => {
        return res.data;
      });
  }

  static async uploadFilesSequentially(files: File[], parent: string) {
    for (let i = 0; i < files.length; i++) {
      try {
        await axiosApiInstance.post(
          '/files/uploadAlone',
          { file: files[i], parent: parent },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async getUserFile(id: string) {
    try {
      const response = await axiosApiInstance(`/files/download?id=${id}`, {
        responseType: 'blob',
      });
      const downloadURL = window.URL.createObjectURL(new Blob([response.data]));
      return downloadURL;
    } catch (e) {
      console.log(e);
    }
  }
}

export { FileHttpService };
