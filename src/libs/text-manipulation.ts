export const resizeUploadcareImage = (
  url: string,
  width: number = 400,
  height: number = 400
): string => {
  if (url.startsWith("https://ucarecdn.com/")) {
    const getUUID = url.split("/")[3];
    const URL = `https://ucarecdn.com/${getUUID}`;
    const result = `${URL}/-/preview/${width}x${height}/`;
    // return `${url}-/preview/${width}x${height}/`;
    return result;
  }
  // Tambahkan penanganan untuk URL non-Uploadcare
  // console.warn("URL bukan dari Uploadcare:", url);
  return url;
};
