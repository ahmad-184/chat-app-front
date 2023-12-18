const getPhotoUrl = (
  url,
  img_width,
  img_quality = "40",
  placeholder_width = "50",
  placeholder_quality = "10"
) => {
  const imgUrl =
    url?.replace(
      "upload",
      `upload/q_${img_quality},dpr_1.0${img_width ? `,w_${img_width}` : ""}`
    ) || "";
  const placeholder =
    url?.replace(
      "upload",
      `upload/q_${placeholder_quality},dpr_1.0,${
        placeholder_width ? `,w_${placeholder_width}` : ""
      }`
    ) || "";

  return {
    url: imgUrl,
    placeholder,
  };
};

export default getPhotoUrl;
