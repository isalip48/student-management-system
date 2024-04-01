'use client';

import NavAdmin from '@/components/navAdmin';
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function StudentList() {
  const router = useRouter();

  const [userData, setUserData] = useState();
  const [registerNo, setRegisterNo] = useState('');
  
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
      courses: params.get('courses'),
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
        .get(
          `http://localhost:5030/api/course/all/${degreeProgram}?semester=${selectedSemester}`
        )
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
      // Get the registration number from state

      // Make a DELETE request to remove the student
      await axios.delete(`http://localhost:5030/api/student/delete/${regNo}`);
      console.log('Deleting Student');
      alert('Sucssseer deleted successfully');
      // Optionally, you can fetch the updated list of students

      // Clear the input field after successful deletion
    } catch (error) {
      console.error('Error removing student:', error);
      // Handle error appropriately
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5030/api/student/${registerNo}`);
      setUserData(response.data);
      console.log(userData)
    } catch (error) {
      console.error('Error fetching course history:', error);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <NavAdmin />
      <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
        <div>
          <h1 className="text-lg font-bold">Remove Student</h1>
        </div>
        <form onSubmit={handleSearch}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center items-center">
            <div className="lg:col-span-2">
              <Input
                label="Registration Number"
                name="registerNo"
                value={registerNo}
                onChange={(e) => setRegisterNo(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" color="primary">
                Search
              </Button>
            </div>
          </div>
        </form>

        <Divider/>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Registration No"
              name="regNo"
              value={regNo}
              disabled
            />
            <Input
              label="NIC"
              name="nicNo"
              value={nicNo}
              onChange={(e) => setNicNo(e.target.value)}
              disabled
            />
            <Input
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled
            />
            <Input
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled
            />
            <Input
              label="KDU Email"
              name="kduEmail"
              value={kduEmail}
              onChange={(e) => setKduEmail(e.target.value)}
              disabled
            />
            <Input
              label="Student Address"
              name="stuAddress"
              value={stuAddress}
              onChange={(e) => setStuAddress(e.target.value)}
              disabled
            />
            <Input
              label="Date of Birth"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              disabled
            />
            <Input
              label="Phone No"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              disabled
            />
            <Input
              label="Degree Program"
              name="degreeProgram"
              value={degreeProgram}
              onChange={(e) => setDegreeProgram(e.target.value)}
              disabled
            />
            <Input
              label="Intake"
              name="intake"
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
              disabled
            />
            <Select
              label="Semester"
              name="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              disabled
            >
              <SelectItem key="Y1S1" value="Y1S1">
                Year 1, Semester 1
              </SelectItem>
              <SelectItem key="Y1S2" value="Y1S2">
                Year 1, Semester 2
              </SelectItem>
              <SelectItem key="Y2S1" value="Y2S1">
                Year 2, Semester 1
              </SelectItem>
              <SelectItem key="Y2S2" value="Y2S2">
                Year 2, Semester 2
              </SelectItem>
              <SelectItem key="Y3S1" value="Y3S1">
                Year 3, Semester 1
              </SelectItem>
              <SelectItem key="Y3S2" value="Y3S2">
                Year 3, Semester 2
              </SelectItem>
              <SelectItem key="Y4S1" value="Y4S1">
                Year 4, Semester 1
              </SelectItem>
              <SelectItem key="Y4S2" value="Y4S2">
                Year 4, Semester 2
              </SelectItem>
            </Select>
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
          <Button type="submit" color="primary" className="mt-4">
            Remove Student
          </Button>
        </form>
      </div>
    </div>
  );
}
