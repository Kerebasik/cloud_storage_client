import axiosApiInstance from "../../http/axios";


export const uploadFilesSequentially = async (files:File[], parent:string) => {
  for (let i = 0; i < files.length; i++) {
    try {
      await axiosApiInstance.post('/files/uploadAlone', {file:files[i], parent:parent}, {
        headers:{ "Content-Type": "multipart/form-data" }
      });
    } catch (e) {
      console.error('Upload files',e)
    }
  }
};