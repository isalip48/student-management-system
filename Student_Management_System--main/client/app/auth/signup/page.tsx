'use client';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [formState, setFormState] = useState(true);
  const router = useRouter();

  const [adminFormData, setAdminFormData] = useState({
    Name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(localStorage.getItem('isLog') || 'false');

  if (isLog && isAdmin) {
    router.replace('http://localhost:3000/addStudent');
  }

  if (isLog && isAdmin == false) {
    router.replace('http://localhost:3000/');
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    // sNIC: '',
    birthDate: '',
    regNo: '',
    // kduEmail: '',
    password: '',
    degree: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const degList = ['IT', 'SE', 'DS', 'CS', 'IM'];

  const handleStudentSignup = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5030/api/studentAuth/signup/',
        formData
      );
      console.log(response.data);
      console.log('Student signed up successfully');
      alert('Student signed up successfully');
      router.push("http://localhost:3000/auth/signin")
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while signing up');
      }
    }
  };

  return (
    <div className="w-full relative h-screen overflow-y-scroll overscroll-contain">
      <div className="my-[2rem] mx-[4rem]">
        <Link href="/">
          <Image src="/assets/logo.svg" width={200} height={200} alt="log" />
        </Link>
      </div>
      <div className="relative flex justify-center items-center gap-10">
        <div className="hidden lg:block">
          <Image
            src="/assets/bg-image.svg"
            width={800}
            height={500}
            alt="dd"
            style={{ objectFit: 'contain' }}
          />
        </div>
        {/* form */}
        <div className="flex flex-col justify-center bg-[#fff] w-full md:w-[500px] h-auto rounded-md drop-shadow-xl p-4 z-50 mx-4 lg:mr-[5rem]">
          <h1 className="text-[2rem] font-bold">Sign Up</h1>
          <span>Sign up to enjoy the feature of KDU SMS</span>
          {error && <div className="text-red-500">{error}</div>}{' '}
          {/* Display error message if there's any */}
          <div className="my-2">
            <form
              className="flex flex-col gap-5"
              onSubmit={handleStudentSignup}
            >
              <div className="mb-2 flex flex-col lg:flex-row gap-2">
                <Input
                  isRequired
                  type="text"
                  variant="bordered"
                  label="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  isRequired
                  type="text"
                  variant="bordered"
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                {/* <Input
                    isRequired
                    type="text"
                    variant="bordered"
                    label="Student NIC Number"
                    name="sNIC"
                    value={formData.sNIC}
                    onChange={handleInputChange}
                  /> */}
              </div>
              <div>
                <Input
                  isRequired
                  type="date"
                  variant="bordered"
                  label="Birth Date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Select
                  label="Degree program"
                  className="w-full"
                  variant="bordered"
                  isRequired
                  name="degree"
                  onChange={handleChange}
                  value={formData.degree}
                >
                  {degList.map((deg) => (
                    <SelectItem key={deg} value={deg}>
                      {deg}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <Input
                  isRequired
                  type="text"
                  variant="bordered"
                  label="Student ID"
                  name="regNo"
                  placeholder="xxxxxxxxxx"
                  value={formData.regNo}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                {/* <Input
                    isRequired
                    type="email"
                    variant="bordered"
                    label="KDU Email"
                    name="kduEmail"
                    value={formData.kduEmail}
                    onChange={handleInputChange}
                  /> */}
              </div>
              <div>
                <Input
                  isRequired
                  type="password"
                  variant="bordered"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  isRequired
                  type="password"
                  variant="bordered"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Button type="submit" color="primary" className="w-full">
                  Sign Up
                </Button>
              </div>
              <div>
                <span>
                  Already have an account?{' '}
                  <Link href="signin" className="text-primary">
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className={
          formState
            ? `w-full absolute bottom-0 lg:-translate-y-[2rem] h-0`
            : `w-full absolute bottom-0 lg:-translate-y-[10rem] h-0`
        }
      >
        <Image
          src="/assets/wave.svg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%' }}
          alt="dd"
        />
      </div>
    </div>
  );
}
