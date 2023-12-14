import axios from "./axios";

import { CLOUD_NAME, CLOUD_PRESET_NAME, UPLOAD_FOLDER } from "../config";
import { toast } from "sonner";

const uploader = async (data) => {
  const files = data;
  let uploaded = [];

  if (!files.length) return;

  for (let file of files) {
    const formData = new FormData();
    const fileType = file.type;

    formData.append("file", file.file);
    formData.append("upload_preset", CLOUD_PRESET_NAME);
    formData.append("cloud_name", CLOUD_NAME);
    formData.append("folder", UPLOAD_FOLDER);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${
          fileType === "image" ? "image" : "raw"
        }/upload`,
        formData
      );

      uploaded.push({
        file: res.data,
        type: fileType,
      });
    } catch (err) {
      toast.error(err.error.message || err.message || err);
      console.log(err);
    }
  }

  return uploaded;
};

export default uploader;
