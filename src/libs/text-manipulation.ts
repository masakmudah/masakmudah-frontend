export const resizeUploadcareImage = (
  url: string,
  width: number = 400,
  height: number = 400
): string => {
  if (url.startsWith("https://ucarecdn.com/")) {
    return `${url}-/preview/${width}x${height}/`;
  }
  // Tambahkan penanganan untuk URL non-Uploadcare
  console.warn("URL bukan dari Uploadcare:", url);
  return url;
};
