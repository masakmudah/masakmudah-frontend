import { UploadIcon, X } from "lucide-react";
import { useRef, useState } from "react";

const ImageUploadButton = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];

    setFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();

    setFile(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="w-64 h-64 border  border-dashed relative rounded-lg flex flex-col transition-all duration-300 items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleClick}
      onDrop={handleDrop}
      onDrag={handleDragOver}
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {preview ? (
        <>
          <img src={preview} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-white font-raleway text-center">{file?.name}</p>
          </div>
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200 transition-colors"
            onClick={handleRemove}
          >
            <X className="w-4 h-4 text-primary" />
          </button>
        </>
      ) : (
        <>
          <UploadIcon className="w-12 h-12 text-primary mb-2 text-white" />
          <p className="text-sm text-center text-primary-foreground px-4">
            Drag and drop an image here, or click to select
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUploadButton;
