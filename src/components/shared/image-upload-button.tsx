import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { cn } from "@/libs/utils";
import { TrashIcon, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "../ui/use-toast";

interface ImageUploadButtonProps {
  onFileChange: (selectedFile: File | null) => void;
}

const ImageUploadButton = ({ onFileChange }: ImageUploadButtonProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clean up the object URL when the component unmounts or when a new file is selected
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleClick = () => {
    if (!file) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setFile(selectedFile);
      onFileChange(selectedFile);
    } else {
      toast({
        className: "bg-red-500 text-white border-none font-raleway",
        title: "File must image",
      });
      setPreview(null);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();

    setFile(null);
    setPreview(null);
    onFileChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragging,
  } = useDragAndDrop(handleFile);

  return (
    <div
      id="drop-point"
      className={`w-full h-20 border border-gray-400 border-dashed relative rounded-xl flex flex-col transition-all duration-300 items-center justify-center overflow-hidden p-3 ${
        file ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {preview ? (
        <>
          <div
            id="select-image-block"
            className="bg-gray-50 font-raleway justify-between px-2 flex items-center h-20 w-full rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-x-2 items-center">
              <img
                src={preview}
                alt=""
                className="w-8 h-8 rounded-md object-cover"
              />
              <p className="text-sm">{file?.name}</p>
            </div>
            <button onClick={handleRemove}>
              <TrashIcon className="w-4 h-4 mr-2 text-slate-400" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center font-raleway gap-x-2">
          {isDragging ? (
            <></>
          ) : (
            <>
              <UploadIcon className="w-4 h-4 text-primary text-white" />
              <p className="text-sm text-center text-primary-foreground">
                Drag and drop an image here, or click to select
              </p>
            </>
          )}
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 bg-black/20 bg-opacity-70 flex items-center justify-center transition-all duration-300 ease-out"
        )}
        style={{
          opacity: isDragging ? 1 : 0,
          pointerEvents: isDragging ? "auto" : "none",
          transform: isDragging ? "scale(1)" : "scale(0.95)",
        }}
      >
        <div className=" p-4 rounded-lg text-white shadow-md font-raleway text-sm">
          <p className="text-sm font-semibold">Lepaskan file di sini</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadButton;
