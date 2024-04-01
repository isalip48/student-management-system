'use client';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  const [adminFormData, setAdminFormData] = useState({
    Name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [error, setError] = useState('');

  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(localStorage.getItem('isLog') || 'false');

  //   if (isLog && isAdmin) {
  //     router.replace('http://localhost:3000/addStudent');
  //   }

  if (isLog && isAdmin == false) {
    router.replace('http://localhost:3000/');
  }

  const handleInputChangeAdmin = (e: any) => {
    const { name, value } = e.target;
    setAdminFormData({
      ...adminFormData,
      [name]: value,
    });
  };

  const handleSignupAdmin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5030/api/admin/signup/',
        adminFormData
      );
      localStorage.setItem('Name', adminFormData.Name);
      const queryObject = {
        admin: true,
      };
      const queryString = new URLSearchParams(queryObject).toString();
      router.push(`/auth/signin/?${queryString}`);

      console.log(response.data);
    } catch (error) {
      console.error('Error signing in:', error);
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
          <h1 className="text-[2rem] font-bold">Add New Admin</h1>
          <span>Add new admin to update the feature of KDU SMS</span>
          {error && <div className="text-red-500">{error}</div>}{' '}
          {/* Display error message if there's any */}
          <div className="my-2">
            <form className="flex flex-col gap-5" onSubmit={handleSignupAdmin}>
              <div>
                <Input
                  isRequired
                  type="text"
                  variant="bordered"
                  label="Username"
                  name="Name"
                  value={adminFormData.Name}
                  onChange={handleInputChangeAdmin}
                />
              </div>
              <div>
                <Input
                  isRequired
                  type="Email Address"
                  variant="bordered"
                  label="Email"
                  name="email"
                  value={adminFormData.email}
                  onChange={handleInputChangeAdmin}
                />
              </div>
              <div>
                <Input
                  isRequired
                  type="password"
                  variant="bordered"
                  label="Password"
                  name="password"
                  value={adminFormData.password}
                  onChange={handleInputChangeAdmin}
                />
              </div>
              <div>
                <Input
                  isRequired
                  type="password"
                  variant="bordered"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={adminFormData.confirmPassword}
                  onChange={handleInputChangeAdmin}
                />
              </div>
              <div>
                <Button type="submit" color="primary" className="w-full">
                  Add Admin
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`w-full absolute bottom-0 lg:-translate-y-[10rem] h-0`}>
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
