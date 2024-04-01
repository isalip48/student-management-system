'use client';

import {
  Avatar,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Nav from '@/components/nav';
import NavAdmin from '@/components/navAdmin';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@/components/icons/plusIcon';
import { CameraIcon } from '@/components/icons/CameraIcon';

export default function AddStudent() {
  const router = useRouter();

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState('');

  // role checking
  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(localStorage.getItem('isLog') || 'false');

  if (!isLog) {
    router.replace('http://localhost:3000/auth/signin');
  }

  if (isLog && !isAdmin) {
    router.replace('http://localhost:3000/notfound');
  }

  // image upload configs
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewSource(reader.result as string);
      }
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
      localStorage.setItem('imgId', img.public_id);
    } catch (error) {
      console.error(error);
    }
  };

  // end of image upload configs

  const [formData, setFormData] = useState({
    image: '',
    firstName: '',
    lastName: '',
    nicNo: '',
    dob: '',
    regNo: '',
    kduEmail: '',
    phoneNo: '',
    stuAddress: '',
    degree: '',
    intake: '',
    semester: '',
    modules: [],
  });

  const [degree, setDegree] = useState('');
  const [modules, setModules] = useState<{ modCode: string; modName: string }[]>([]);

  const degList = [
    { key: 'IT', deg: 'IT' },
    { key: 'SE', deg: 'SE' },
    { key: 'DS', deg: 'DS' },
    { key: 'CS', deg: 'CS' },
    { key: 'IM', deg: 'IM' },
  ];

  useEffect(() => {
    if (degree) {
      // Fetch modules for the selected degree
      axios
        .get(`http://localhost:5030/api/course/${degree}`)
        .then((response) => {
          setModules(response.data);
          console.log('Success fetching modules: ', response.data);
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }
  }, [degree]); // Fetch modules  the degree changes

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    try {
      // Copying form data
      let user = { ...formData };
  
      // Creating student data object
      const studentData = {
        image: localStorage.getItem('imgId'),
        firstName: user.firstName,
        lastName: user.lastName,
        nicNo: user.nicNo,
        dob: user.dob,
        regNo: user.regNo,
        kduEmail: user.kduEmail,
        phoneNo: user.phoneNo,
        stuAddress: user.stuAddress,
        degreeProgram: degree,
        intake: user.intake,
        semester: user.semester,
        courses: (modules as { modCode: string }[]).map((module) => module.modCode),

      };
  
      // Sending student data to the server
      const response = await axios.post(
        'http://localhost:5030/api/student/',
        studentData
      );
  
      console.log('Form data sent successfully:', response.data);
      alert('Student added successfully');
      localStorage.setItem('imgId', '');
  
      // Resetting form data after successful submission
      setFormData({
        image: '',
        firstName: '',
        lastName: '',
        nicNo: '',
        dob: '',
        regNo: '',
        kduEmail: '',
        phoneNo: '',
        stuAddress: '',
        degree: '',
        intake: '',
        semester: '',
        modules: [],
      });
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <NavAdmin />
      <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
        <div>
          <h1 className="text-lg font-bold">Add Student</h1>
        </div>
        <div className="mx-2 lg:mx-[4rem]">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col gap-6">
              {/* top section */}
              <div className="relative w-full flex flex-col lg:flex-row gap-5 lg:gap-10 justify-between items-center">
                <div className="relative w-full lg:w-[50%] flex justify-center flex-col gap-4 items-center">
                  <div className="relative mb-2">
                    {previewSource ? (
                      <Avatar
                        src={previewSource}
                        className="w-40 h-40 text-large"
                      />
                    ) : (
                      <div className="relative w-full">
                        <Avatar
                          src="/assets/avatar.svg"
                          className="w-40 h-40 text-large"
                        />
                      </div>
                    )}
                    <Button
                      isIconOnly
                      color="warning"
                      variant="faded"
                      aria-label="Take a photo"
                      className="absolute bottom-8 right-0 cursor-pointer"
                    >
                      <label htmlFor="img-upload">
                        
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
                        onChange={handleChange}
                        value={formData.firstName}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Last Name"
                        isRequired
                        variant="bordered"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
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
                        onChange={handleChange}
                        value={formData.nicNo}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="date"
                        label="Student DOB"
                        isRequired
                        variant="bordered"
                        name="dob"
                        onChange={handleChange}
                        value={formData.dob}
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
                        onChange={handleChange}
                        value={formData.regNo}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* bottom section */}
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Input
                      type="email"
                      label="KDU Email"
                      isRequired
                      variant="bordered"
                      name="kduEmail"
                      onChange={handleChange}
                      value={formData.kduEmail}
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="Number"
                      label="Phone Number"
                      isRequired
                      variant="bordered"
                      name="phoneNo"
                      onChange={handleChange}
                      value={formData.phoneNo}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Input
                      type="text"
                      label="Student Address"
                      isRequired
                      variant="bordered"
                      name="stuAddress"
                      onChange={handleChange}
                      value={formData.stuAddress}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Select
                      label="Degree program"
                      className="w-full"
                      variant="bordered"
                      isRequired
                      name="degree"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                    >
                      {degList.map((item) => (
                        <SelectItem key={item.key} value={item.deg}>
                          {item.deg}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="w-full lg:w-[50%]">
                    <Select
                      label="Intake"
                      className="w-full"
                      variant="bordered"
                      isRequired
                      value={formData.intake}
                      onChange={(e) =>
                        setFormData({ ...formData, intake: e.target.value })
                      }
                    >
                      <SelectItem key="Intake 01" value="Intake 01">
                        Intake 39
                      </SelectItem>
                      <SelectItem key="Intake 02" value="Intake 02">
                        Intake 40
                      </SelectItem>
                      <SelectItem key="Intake 03" value="Intake 03">
                        Intake 41
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="w-full lg:w-[2  5%]">
                    <Select
                      label="Semester"
                      className="w-full"
                      variant="bordered"
                      isRequired
                      value={formData.semester}
                      onChange={(e) =>
                        setFormData({ ...formData, semester: e.target.value })
                      }
                    >
                      <SelectItem key="Semester 01" value="Semester 01">
                        Semester 01
                      </SelectItem>
                       <SelectItem key="2" value="Semester 02">
                        Semester 02
                      </SelectItem>
                      <SelectItem key="3" value="Semester 03">
                        Semester 03
                      </SelectItem> 
                    </Select>
                  </div>
                </div>

                <div className="w-full flex flex-wrap gap-5">
                  {modules.map((module, index) => (
                    <div key={index} className="bg-gray-200 rounded-md p-4">
                      <Input
                        label="Module Code"
                        className="w-full"
                        variant="bordered"
                        value={module.modCode}
                        readOnly
                      />
                      <Input
                        label="Module Name"
                        className="w-full"
                        variant="bordered"
                        value={module.modName}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="my-4 flex flex-col lg:flex-row gap-4 justify-center lg:justify-end">
              <Button type="reset" size="md">
                Reset
              </Button>
              <Button type="submit" color="primary" size="md">
                Add Student
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
