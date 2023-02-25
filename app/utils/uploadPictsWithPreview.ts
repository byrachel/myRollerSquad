export const fileSize = (size: number) => {
  if (size === 0) return "0 Bytes";
  const ko = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const ratio = Math.floor(Math.log(size) / Math.log(ko));
  return `${parseFloat((size / Math.pow(ko, ratio)).toFixed(2))} ${
    sizes[ratio]
  }`;
};

export const uploadPictsWithPreview = (e: any, dispatch: any) => {
  if (e.target.files && e.target.files.length > 0) {
    let files = [...e.target.files];

    files.map(file => {
      file["preview"] = URL.createObjectURL(file);
      let image = new Image();
      image.src = file["preview"];
      image.onload = () => {
        file["width"] = image.naturalWidth;
        file["height"] = image.naturalHeight;
      };
    });

    dispatch({ type: "SAVE_PICTURES", payload: files });
  }
};
