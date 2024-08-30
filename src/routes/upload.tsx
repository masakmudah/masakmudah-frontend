import { useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export function UploadRoute() {
  const [fileUrl, setfileUrl] = useState<String | null>(null);

  if (fileUrl != null) {
    console.log("fileURL " + fileUrl);
  }
  return (
    <div>
      <FileUploaderRegular
        sourceList="local, url, camera, dropbox"
        classNameUploader="uc-light"
        pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
        onFileUploadSuccess={(response) => {
          setfileUrl(response.fileInfo.cdnUrl);
        }}
      />
    </div>
  );
}
