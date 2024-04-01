'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
// import studentProfile from 'next/studentProfile';

export default function Signin() {
  const router = useRouter();
  const getregNo = localStorage.getItem('regNo');
  const getAdminName = localStorage.getItem('Name');

  const [pwd, setPwd] = useState('');
  const [Password, setPassword] = useState('');

  const [isLog, setIsLog] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function validateLogin() {
    axios
      .post('http://localhost:5030/api/studentAuth/signin', formData)
      .then((res) => {
        if (res.data) {
          localStorage.setItem('regNo', formData.regNo);
          alert('Login successful');
          const queryString = new URLSearchParams({
            regNo: formData.regNo,
          }).toString();
          router.push(`/courses?${queryString}`);
        } else {
          alert('Invalid registration number or password');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert('Invalid registration number or password');
        } else {
          alert('An error occurred while signing in');
        }
      });
  }

  const [formData, setFormData] = useState({
    regNo: '',
    password: '',
  });


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignInStudent = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5030/api/studentAuth/signin',
        formData
      );

      console.log(response.data);
      alert('signin successful');
      setIsLog(true);
      setIsAdmin(false);
      router.push('http://localhost:3000/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  localStorage.setItem('isLog', JSON.stringify(isLog));
  localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

  return (
    <div className="w-full h-screen relative overflow-y-scroll overscroll-contain">
      <div className="my-[2rem] mx-[4rem]">
        <Link href="#">
          <Image src="/assets/logo.svg" width={200} height={200} alt="log" />
        </Link>
      </div>
      <div className="relative flex justify-center items-center gap-12">
        <div className="hidden lg:block">
          <Image
            src="/assets/bg-image.svg"
            width={800}
            height={500}
            alt="dd"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-col justify-center bg-[#fff] w-full md:w-[500px] h-auto rounded-md drop-shadow-xl p-4 z-50 mx-4 lg:mr-[5rem]">
          <h1 className="text-[2rem] font-bold">Welcome Back!</h1>
          <span>Please sign in to continue.</span>
          <div className="my-2">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSignInStudent}
              >
                <div>
                  <Input
                    isRequired
                    type="text"
                    variant="bordered"
                    label="Registration Number"
                    name="regNo"
                    value={formData.regNo}
                    onChange={handleInputChange}
                  />
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
                  <Link href="#">Forget Password?</Link>
                </div>
                <div>
                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    onClick={validateLogin}
                  >
                    Sign In
                  </Button>
                </div>
                <div>
                  <span>
                    Need an account?{' '}
                    <Link href="signup" className="text-primary">
                      Create one
                    </Link>
                  </span>
                </div>
              </form>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex absolute z-50 bottom-0 right-[5rem] justify-end lg:translate-y-[6rem]">
          <Button
            type="button"
            color="default"
            size="md"
            onClick={() => router.push('http://localhost:3000/auth/admin-signin')}
          >
            Admin Login
          </Button>
      </div> */}

      <div className="w-full absolute bottom-0 lg:-translate-y-[10rem] h-0">
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
