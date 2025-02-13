import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from 'axios';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export const cloudinaryUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file),
    formData.append('upload_preset', 'zcroou11')
    try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/toolipimages/upload`,
          formData,
        );
        return res.data.secure_url;
      } catch (error) {
        console.log(error);
    }
}
