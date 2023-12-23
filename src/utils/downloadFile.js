import axios from "./axios";
import { errorToast } from "../components/ToastProvider";

const axiosDownloadFile = (
  url,
  fileName,
  setDownloadProgress,
  setDisableButton
) => {
  return axios({
    url,
    method: "GET",
    responseType: "blob",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    onDownloadProgress: (progressEvent) => {
      setDisableButton(true);
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) {
        setDownloadProgress(percent);
      }
    },
  })
    .then((response) => {
      const href = window.URL.createObjectURL(response.data);

      const anchorElement = document.createElement("a");

      anchorElement.href = href;
      anchorElement.download = fileName;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    })
    .catch((error) => {
      console.log("error: ", error);
      errorToast({
        message: "File does not exist or Can't download this file",
      });
    })
    .finally(() => setDisableButton(false));
};

export default axiosDownloadFile;
