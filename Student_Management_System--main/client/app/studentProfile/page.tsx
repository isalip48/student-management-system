'use client';
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';
import Nav from '@/components/nav';
import { useRouter } from 'next/navigation';
import { CameraIcon } from '@/components/icons/CameraIcon';
import { Image } from 'cloudinary-react';

export default function Profile() {
  const router = useRouter();

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState('');
  const [currentImg, setCurrentImg] = useState('');

  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(localStorage.getItem('isLog') || 'false');

  if (!isLog) {
    router.replace('http://localhost:3000/auth/signin');
  }

  if (isLog && isAdmin) {
    router.replace('http://localhost:3000/notfound');
  }

  // image upload configs

  const loadImages = async () => {
    try {
      const currentImgID = localStorage.getItem('CurrentUserImg');
      const res = await fetch(
        `http://localhost:5030/api/upload/images/${currentImgID}`
      );
      const data = await res.json();
      console.log(data);
      setCurrentImg(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

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
      localStorage.setItem(
        'CurrentUserImg',
        img.public_id.replace('dev_setups/', '')
      );
      localStorage.setItem('imgId', img.public_id);
    } catch (error) {
      console.error(error);
    }
  };

  const imgID = localStorage.getItem('imgId');
  console.log(imgID);

  // end of profile config

  const [profileData, setProfileData] = useState({
    image: '',
    regNo: '',
    firstName: '',
    lastName: '',
    nicNo: '',
    dob: '',
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const regNo = localStorage.getItem('regNo');
        const response = await axios.get(
          `http://localhost:5030/api/student/${regNo}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    getProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const utcDate = new Date(profileData.dob);
  const localDate = utcDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...profileData,
        image: localStorage.getItem('imgId'),
      };
      await axios.post(
        `http://localhost:5030/api/student/${profileData.regNo}`,
        dataToSend
      );
      alert('Profile updated successfully!');
      console.log(dataToSend);
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <Nav />
      <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-xl rounded-2xl bg-[#fff]">
        <div>
          <h1 className="text-lg font-bold">Edit Profile</h1>
        </div>
        <div className="mx-2 lg:mx-[4rem]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="relative w-full flex flex-col lg:flex-row gap-5 lg:gap-10 justify-between items-center">
                {/* profile img */}
                <div className="relative w-full lg:w-[50%] flex justify-center flex-col gap-4 items-center">
                  <div className="relative mb-2">
                    {previewSource ? (
                      <div className="overflow-hidden rounded-full">
                        <img
                          src={previewSource}
                          width="200"
                          alt="222"
                          className="rounded-full"
                          object-fit="contain"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full">
                        {currentImg && (
                          <Image
                            cloudName="dypvbk20u"
                            publicId={currentImg}
                            width="200"
                            height="200"
                            crop="scale"
                            alt="img"
                            className="rounded-full"
                          />
                        )}
                      </div>
                    )}
                    <Button
                      isIconOnly
                      color="warning"
                      variant="faded"
                      aria-label="Take a photo"
                      className="absolute bottom-8 right-0 cursor-pointer"
                    >
                      <label for="img-upload">
                        <CameraIcon />
                      </label>
                    </Button>
                  </div>
                  <input
                    type="file"
                    id="img-upload"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    hidden
                  />
                  {previewSource && (
                    <Button
                      type="button"
                      onClick={handleSubmitFile}
                      color="primary"
                    >
                      Upload profile
                    </Button>
                  )}
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="w-full">
                      <Input
                        type="text"
                        label="First Name"
                        isRequired
                        variant="bordered"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Last Name"
                        isRequired
                        variant="bordered"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Student NIC Number"
                        isRequired
                        variant="bordered"
                        name="nicNo"
                        value={profileData.nicNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Student DOB"
                        isRequired
                        variant="bordered"
                        name="dob"
                        value={localDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Registration Number"
                        isRequired
                        variant="bordered"
                        name="regNo"
                        value={profileData.regNo}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4 flex flex-col lg:flex-row gap-4 justify-center lg:justify-end">
              <Button type="reset" size="md">
                Reset
              </Button>
              <Button type="submit" color="primary" size="md">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
