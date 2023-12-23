import axios from "./axios";

import { CLOUD_NAME, CLOUD_PRESET_NAME, UPLOAD_FOLDER } from "../config";
import { toast } from "sonner";

const uploader = async (data, setUploadProgress) => {
  const files = data;
  let uploaded = [];

  if (!files.length) return [];

  for (let file of files) {
    const formData = new FormData();
    const fileType = file.type;
    const isImage = Boolean(fileType === "image");
    const isVideo = Boolean(fileType === "video");
    const isAudio = Boolean(fileType === "audio");
    const isPdf = Boolean(fileType === "pdf");

    formData.append("file", file.file);
    formData.append("upload_preset", CLOUD_PRESET_NAME);
    formData.append("cloud_name", CLOUD_NAME);
    formData.append("folder", UPLOAD_FOLDER);
    formData.append("public_id", file.file.name);
    if (isPdf) {
      formData.append("tags", "fl_attachment");
    }

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${
          isImage
            ? "image"
            : isVideo
            ? "video"
            : isPdf
            ? "image"
            : isAudio
            ? "raw"
            : "raw"
        }/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            if (percent < 100) {
              setUploadProgress(percent);
            }
          },
        }
      );

      setUploadProgress(0);
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
