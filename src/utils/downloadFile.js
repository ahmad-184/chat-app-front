import axios from "./axios";

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
      console.log(response);
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
    })
    .finally(() => setDisableButton(false));
};

export default axiosDownloadFile;
