'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input, Select, SelectItem } from '@nextui-org/react';
import axios from 'axios';
import NavAdmin from '@/components/navAdmin';
import { useRouter } from 'next/navigation';

const AlterCourses = () => {

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


  const [regNo, setRegNo] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [kduEmail, setKduEmail] = useState('');
  const [stuAddress, setStuAddress] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [degreeProgram, setDegreeProgram] = useState('');
  const [intake, setIntake] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Extract query parameters from window.location.search
    const params = new URLSearchParams(window.location.search);
    const state = {
      regNo: params.get('regNo'),
      firstName: params.get('firstName'),
      lastName: params.get('lastName'),
      nicNo: params.get('nicNo'),
      kduEmail: params.get('kduEmail'),
      stuAddress: params.get('stuAddress'),
      dob: params.get('dob'),
      phoneNo: params.get('phoneNo'),
      degreeProgram: params.get('degreeProgram'),
      intake: params.get('intake'),
      semester: params.get('semester'),
      courses: params.get('courses')
    };

    // Update state values with the values from query.state
    setRegNo(state.regNo || '');
    setNicNo(state.nicNo || '');
    setFirstName(state.firstName || '');
    setLastName(state.lastName || '');
    setKduEmail(state.kduEmail || '');
    setStuAddress(state.stuAddress || '');
    setDob(state.dob || '');
    setPhoneNo(state.phoneNo || '');
    setDegreeProgram(state.degreeProgram || '');
    setIntake(state.intake || '');
    setSelectedSemester(state.semester || '');
  }, []);

  useEffect(() => {
    // Fetch modules based on the selected semester and degree program
    if (selectedSemester && degreeProgram) {
      axios
        .get(`http://localhost:5030/api/course/all/${degreeProgram}?semester=${selectedSemester}`)
        .then((response) => {
          setModules(response.data);
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }
  }, [selectedSemester, degreeProgram]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API to update student data
      await axios.post(`http://localhost:5030/api/student/${regNo}`, {
        regNo,
        nicNo,
        firstName,
        lastName,
        kduEmail,
        stuAddress,
        dob,
        phoneNo,
        degreeProgram,
        intake,
        semester: selectedSemester,
        courses: modules.map((module) => module.modCode)
      });

      // Handle success
      console.log('Student data updated successfully!');
      alert('Student course data updated successfully!');
    } catch (error) {
      // Handle error
      console.error('Error updating student data:', error);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <NavAdmin />
      <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
        <div>
          <h1 className="text-lg font-bold">Alter Student Course Details</h1>
        </div>
        <div className="mx-2 lg:mx-[4rem]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* top section */}
              <div className="relative w-full flex flex-col lg:flex-row gap-5 lg:gap-10 justify-between items-center">
                <div className="w-full lg:w-[50%] flex justify-center flex-col gap-4 items-center">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                    className="w-40 h-40 text-large"
                  />
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Last Name"
                        isRequired
                        variant="bordered"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        value={nicNo}
                        onChange={(e) => setNicNo(e.target.value)}
                        
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Student DOB"
                        isRequired
                        variant="bordered"
                        name="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      disabled

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
                        value={regNo}
                        disabled
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
                      value={kduEmail}
                      onChange={(e) => setKduEmail(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      label="Phone Number"
                      isRequired
                      variant="bordered"
                      name="phoneNo"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
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
                      value={stuAddress}
                      onChange={(e) => setStuAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Input
                      type="text"
                      label="Student Degree Program"
                      isRequired
                      variant="bordered"
                      name="degreeProgram"
                      value={degreeProgram}
                      onChange={(e) => setDegreeProgram(e.target.value)}
                      disabled
                    />
                  </div>

                  <div className="w-full">
                    <Input
                      type="text"
                      label="Intake"
                      isRequired
                      variant="bordered"
                      name="intake"
                      value={intake}
                      onChange={(e) => setIntake(e.target.value)}
                      disabled

                    />
                  </div>
                 
                  <div className="w-full lg:w-[25%]">
                    <Select
                      label="Semester"
                      className="w-full"
                      variant="bordered"
                      isRequired
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                      <SelectItem key="Y1S1" value="Y1S1">
                        Y1,Sem 1
                      </SelectItem>
                      <SelectItem key="Y1S2" value="Y1S2">
                        Y1,Sem 2
                      </SelectItem>
                      <SelectItem key="Y2S1" value="Y2S1">
                        Y2, Sem 1
                      </SelectItem>
                      <SelectItem key="Y2S2" value="Y2S2">
                        Y2,Sem 2
                      </SelectItem>
                      <SelectItem key="Y3S1" value="Y3S1">
                        Y3, Sem 1
                      </SelectItem>
                      <SelectItem key="Y3S2" value="Y3S2">
                        Y3, Sem 2
                      </SelectItem>
                      <SelectItem key="Y4S1" value="Y4S1">
                        Y4,Sem 1
                      </SelectItem>
                      <SelectItem key="Y4S2" value="Y4S2">
                        Y4,Sem 2
                      </SelectItem>
                    </Select>
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <div className="flex flex-wrap gap-5">
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
              </div>
            </div>
            <div className="my-4 flex flex-col lg:flex-row gap-4 justify-center lg:justify-end">
              <Button type="reset" size="md">
                Reset
              </Button>
              <Button type="submit" color="primary" size="md">
                Alter Courses
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlterCourses;