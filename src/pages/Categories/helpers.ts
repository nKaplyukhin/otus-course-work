import { ICategoryForm } from "interfaces/form";
import { uploadImage } from "utils/fetch";

export const getBodyFromData = async (data: Partial<ICategoryForm>, token: string) => {
  const newData: typeof data = {
    name: data.name,
  };

  if (data.file?.length && token) {
    const { url } = await uploadImage(data.file, token);

    if (url) {
      newData.photo = url;
    }
  }
  return newData;
};