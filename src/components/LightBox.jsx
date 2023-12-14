import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export const filterFiles = (files) => {
  const filteredFiles = files.filter(
    (item) => item.type === "image" || item.type === "video"
  );

  const data = filteredFiles.map((file) => {
    const fileType = file.type;
    if (fileType !== "image" && fileType !== "video") return;
    if (fileType === "image")
      return { src: file.fileData || file.file.url, type: file.type };
    if (fileType === "video")
      return {
        type: file.type,
        sources: [
          {
            src: file.fileData || file.file.url,
            type: file.fileData ? file.file.type : "video/mp4",
          },
        ],
        download: file.fileData,
      };
  });

  return data;
};

const LightBox = ({ slides, open, close, ...props }) => {
  return (
    <Lightbox
      plugins={[Video, Download, Zoom]}
      slides={slides}
      open={open}
      close={close}
      {...props}
    />
  );
};

export default LightBox;
