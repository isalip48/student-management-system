'use client';

import React from 'react';
import Greeting from './greeting';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import Nav from '@/components/nav';
import { useRouter } from 'next/navigation';

export default function Overview() {
  const router = useRouter();

  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(localStorage.getItem('isLog') || 'false');

  if (isLog && isAdmin) {
    router.replace('http://localhost:3000/notfound');
  }

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <Nav />
      <div className="p-[2rem]">
        {/* header */}
        <div className="bg-primary text-[#fff] p-4 rounded-lg flex justify-center items-center gap-12 px-[4rem]">
          <div className="flex flex-col">
            <h1 className="text-[1.4rem] lg:text-[1.8rem] font-bold flex flex-col md:flex-row gap-2">
              Hi Isali, {` `} <Greeting />
            </h1>
            <span>{`Let's`} learn something new today!</span>
            <span>Keep it up and improve your progress.</span>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/assets/overviewImg.svg"
              width={300}
              height={100}
              alt="ovw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6 my-6">
          <div className="w-full lg:w-[75%] flex flex-col gap-6">
            <div className="w-full p-6 bg-[#fff] drop-shadow-lg rounded-xl ">
              <div className="mb-4">
                <h1 className="text-xl">Overview</h1>
              </div>
              <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
                <Card className="w-full lg:w-[150px] flex flex-col justify-center items-center text-center gap-2 py-6 bg-[#E6FFF7]">
                  <div className="text-md text-gray-500">
                    <span>{`You're`} in </span>
                  </div>
                  <div className="text-[2.5rem] font-bold text-[#40997E]">
                    <h1>
                      5<sup>th</sup>
                    </h1>
                  </div>
                  <div className="text-md text-gray-500">
                    <span>Semester</span>
                  </div>
                </Card>
                <Card className="w-full lg:w-[150px] flex flex-col justify-center items-center text-center gap-2 py-6 bg-[#FFFBE6]">
                  <div className="text-md text-gray-500">
                    <span>You have to learn</span>
                  </div>
                  <div className="text-[2.5rem] font-bold text-[#E0A23A]">
                    <h1>8</h1>
                  </div>
                  <div className="text-md text-gray-500">
                    <span>Courses</span>
                  </div>
                </Card>
                <Card className="w-full lg:w-[150px] flex flex-col justify-center items-center text-center gap-2 py-6 bg-[#FFEAFF]">
                  <div className="text-md text-gray-500">
                    <span>{`You're`} enrolled </span>
                  </div>
                  <div className="text-[2.5rem] font-bold text-[#E337FF]">
                    <h1>5</h1>
                  </div>
                  <div className="text-md text-gray-500">
                    <span>Courses</span>
                  </div>
                </Card>
                <Card className="w-full lg:w-[150px] flex flex-col justify-center items-center text-center gap-2 py-6 bg-[#FFEAEA]">
                  <div className="text-md text-gray-500">
                    <span>Have to enroll</span>
                  </div>
                  <div className="text-[2.5rem] font-bold text-[#FF3737]">
                    <h1>3</h1>
                  </div>
                  <div className="text-md text-gray-500">
                    <span>Courses</span>
                  </div>
                </Card>
              </div>
            </div>

            <div className="w-full p-6 bg-[#fff] drop-shadow-lg rounded-xl ">
              <div className="mb-4">
                <h1 className="text-xl">Overview</h1>
              </div>
              <div>
                <Table isStriped aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>Course Title</TableColumn>
                    <TableColumn>Instructor</TableColumn>
                    <TableColumn>Completed</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Requirement Engineering</TableCell>
                      <TableCell>Dr. RMM Pradeep</TableCell>
                      <TableCell> 100%</TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Electronic Systems</TableCell>
                      <TableCell>Mrs. RHNS Jayathissa</TableCell>
                      <TableCell>90%</TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Operating Systems</TableCell>
                      <TableCell>Ms. MAST Goonathilake</TableCell>
                      <TableCell>75%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[25%] bg-[#fff] flex flex-col justify-center items-center p-6 gap-8 rounded-xl drop-shadow-xl">
            <Image
              src="/assets/trophy.svg"
              width={150}
              height={300}
              alt="dd"
              style={{ objectFit: 'contain' }}
            />
            <div className="text-center font-bold leading-7">
              <p>
                “You can teach a student a lesson for a day; but if you can
                teach him to learn by creating curiosity, he will continue the
                learning process as long as he lives.”
              </p>
              <p>-Clay P. Bedford</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
