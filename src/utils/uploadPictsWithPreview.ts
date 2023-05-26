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
    const files = [...e.target.files];

    files.map((file) => {
      file["preview"] = URL.createObjectURL(file);
      const image = new Image();
      image.src = file["preview"];
      image.onload = () => {
        const MAX_WIDTH = 768;
        const width = image.naturalWidth;
        const height = image.naturalHeight;

        const ratio = width / MAX_WIDTH;
        const canvas = document.createElement("canvas");
        canvas.width = width > MAX_WIDTH ? MAX_WIDTH : width;
        canvas.height = width > MAX_WIDTH ? height / ratio : height;

        file["width"] = width > MAX_WIDTH ? canvas.width : width;
        file["height"] = width > MAX_WIDTH ? canvas.height : height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL();
      };
    });

    dispatch({ type: "SAVE_PICTURES", payload: files });
  }
};
