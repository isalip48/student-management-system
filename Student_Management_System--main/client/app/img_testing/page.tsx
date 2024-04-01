'use client';

import { Button } from '@nextui-org/react';
// import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

export default function Upload() {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const [imageIds, setImageIds] = useState([]);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e: any) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage: any) => {
    console.log(base64EncodedImage);
    try {
      const res = await fetch('http://localhost:5030/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-type': 'application/json' },
      });
      const img = await res.json();
      localStorage.setItem('imgId', img.public_id)
    } catch (error) {
      console.error(error);
    }
  };

  const loadImages = async () => {
    try {
      const res = await fetch('http://localhost:5030/api/upload/images');
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          id="img-upload"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <Button type="submit">Upload</Button>
      </form>

      {previewSource && (
        <img src={previewSource} alt="img" width="300" height="300" />
      )}

      <div>
        <h1 className="title">Cloudinary Gallery</h1>
        <div className="gallery">
          {imageIds &&
            imageIds.map((imageId, index) => (
              <Image
                key={index}
                cloudName="dypvbk20u"
                publicId={imageId}
                width="300"
                crop="scale"
                alt="img"
              />
            ))}
        </div>
      </div>
    </div>
  );
}