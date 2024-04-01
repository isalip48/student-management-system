'use client';

import { useState } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddCourse() {
  const router = useRouter();

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

  const [formData, setFormData] = useState({
    degree: '',
    semester: '',
    modCode: '',
    modName: '',
  });

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:5030/api/course/',
      formData
    );
    if (response.status === 200) {
      console.log('Course added successfully!');
      alert('course added successfully!');
    } else {
      console.error('Failed to add course');
    }
  } catch (error) {
    console.error('Error adding course:', error);
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  const semList = [
    { key: 'Y1S1', sem: 'Semester 01' },
    { key: 'Y1S2', sem: 'Semester 02' },
    { key: 'Y2S1', sem: 'Semester 03' },
    { key: 'Y2S2', sem: 'Semester 04' },
    { key: 'Y3S1', sem: 'Semester 05' },
    { key: 'Y3S2', sem: 'Semester 06' },
    { key: 'Y4S1', sem: 'Semester 07' },
    { key: 'Y4S2', sem: 'Semseter 08' },
  ];

  const degList = [
    { key: 'IT', deg: 'IT' },
    { key: 'SE', deg: 'SE' },
    { key: 'DS', deg: 'CE' },
    { key: 'CS', deg: 'CS' },
    { key: 'IM', deg: 'DBA' },
  ];

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
        <div>
          <h1 className="text-lg font-bold">Add Course</h1>
        </div>
        <div className="mx-2 lg:mx-[4rem]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="w-full flex flex-col gap-4">
                <Select
                  label="Degree program"
                  className="w-full"
                  variant="bordered"
                  isRequired
                  name="degree"
                  onChange={handleChange}
                  value={formData.degree}
                >
                  {degList.map((item) => (
                    <SelectItem key={item.key} value={item.deg}>
                      {item.deg}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Semester"
                  className="w-full"
                  variant="bordered"
                  isRequired
                  name="semester"
                  onChange={handleChange}
                  value={formData.semester}
                >
                  {semList.map((item) => (
                    <SelectItem key={item.key} value={item.sem}>
                      {item.sem}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  type="text"
                  label="Module Code"
                  isRequired
                  variant="bordered"
                  name="modCode"
                  onChange={handleChange}
                  value={formData.modCode}
                />
                <Input
                  type="text"
                  label="Module Name"
                  isRequired
                  variant="bordered"
                  name="modName"
                  onChange={handleChange}
                  value={formData.modName}
                />
              </div>
            </div>
            <div className="my-4 flex flex-col lg:flex-row gap-4 justify-center lg:justify-end">
              <Button type="reset" size="md">
                Reset
              </Button>
              <Button type="submit" color="primary" size="md">
                Add Courses
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
