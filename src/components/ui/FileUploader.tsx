// components/ui/FileUploader.tsx
"use client";

import React from "react";

type FileUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({ files, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onChange(selectedFiles);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full rounded border border-gray-300 p-2"
      />
      {files?.length > 0 && (
        <ul className="list-disc ml-5 text-sm">
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
