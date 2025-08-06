import React, { useRef, useState } from 'react';

/**
 * Allows selecting a single image via drag & drop or file picker.
 * Displays a preview of the chosen image.
 */
export default function ImageUploader({ onImageSelected }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFiles = (files) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      onImageSelected(file);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`border-2 border-dashed rounded p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => fileInputRef.current?.click()}
    >
      {preview ? (
        <img src={preview} alt="preview" className="mx-auto max-h-64" />
      ) : (
        <p>
          Drag & Drop an image here or <span className="text-indigo-600 underline">click to browse</span>
        </p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

