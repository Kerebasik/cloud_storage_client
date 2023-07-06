import { toast } from "react-toastify";

export function getUserAvatar(avatar: string) {
  return fetch(`${process.env.REACT_APP_API_URL}/${avatar}`)
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    .catch((error) => {
      toast.error(error.response.data.message);
      return null;
    });
}
