import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

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
