import axiosApiInstance from "../http/axios";
import { IUser } from "../models/IUser";
import { IFile } from "../models/IFile";
import { toast } from "react-toastify";
import { ISubscription } from "../models/ISubscription";

class UserHttpService {
  static getUser(){
    return axiosApiInstance.post<IUser>('/auth')
  }

  static getUsersAllStorage(){
    return axiosApiInstance.get<IFile[]>('/files');
  }

  static getUserAvatar(avatar:string){
    return fetch(`${process.env.REACT_APP_API_URL}/${avatar}`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  static getUserItemStorage(parent: string, sort?: string){
    return axiosApiInstance.get(`/files?sort=${sort}&parent=${parent}`);
  }

  static setUserAvatar(file: File){
    const formData = new FormData();
    formData.append('file', file);
    return axiosApiInstance.post('/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static upgradeSubscription(subscription:ISubscription){
    return axiosApiInstance.post('/payment',{subscriptionId:subscription._id})
  }
}

export {UserHttpService}