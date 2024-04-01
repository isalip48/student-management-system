'use client';

import React from 'react';
import {
  Image,
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
} from '@nextui-org/react';
import Nav from '@/components/nav';
import { useRouter } from 'next/navigation';

export default function RecentlyAccessedCourses() {
  const router = useRouter();

  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(localStorage.getItem('isLog') || 'false');

  if (isLog && isAdmin) {
    router.replace('http://localhost:3000/notfound');
  }

  const crsList = [
    {
      courseName: 'Advanced Database & Big Data',
      subTitle: 'Mrs. MKP Madushanka',
      credits: '3 Credits',
      status: true,
      statusType: 'Open',
      img: '/assets/courseImgs/cimg-1.svg',
    },
    {
      courseName: 'Mobile Computing',
      subTitle: 'Dr. GAKPR Gunasekara (Visiting)',
      credits: '2 Credits',
      status: false,
      statusType: 'Unavailable',
      img: '/assets/courseImgs/cimg-2.svg',
    },
    {
      courseName: 'UX and UI Engineering',
      subTitle: 'Dr. LP Kalansooriya',
      credits: '2 Credits',
      status: true,
      statusType: 'Open',
      img: '/assets/courseImgs/cimg-3.svg',
    },
    {
      courseName: 'Image Processing and Archite.',
      subTitle: 'Dr. BVKI Vidanage',
      credits: '2 Credits',
      status: false,
      statusType: 'Locked',
      img: '/assets/courseImgs/cimg-4.svg',
    },
    {
      courseName: 'Software Construction Tech.',
      subTitle: 'Mr. LDSB Weerasinghe (Visiting)',
      credits: '2 Credits',
      status: true,
      statusType: 'Open',
      img: '/assets/courseImgs/cimg-5.svg',
    },
    {
      courseName: 'Essentials of Computing Law',
      subTitle: 'Ms. KLPD Lekamge',
      credits: '2 Credits',
      status: true,
      statusType: 'Open',
      img: '/assets/courseImgs/cimg-6.svg',
    },
  ];

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <div className="w-full bg-[#fff] drop-shadow-xl rounded-xl p-[2rem]">
        <div>
          <h1 className="text-[1.2rem] font-bold ">
            Recently Accessed Courses
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {crsList.map((item, index) => (
            <div
              key={index}
              className="bg-[#fff] drop-shadow-xl rounded-lg flex flex-col relative"
            >
              <div className="absolute right-4 top-[2rem] lg:top-[10rem] z-50">
                <Chip color="primary">{item.credits}</Chip>
              </div>
              <div>
                <Image
                  src={item.img}
                  width={800}
                  height={500}
                  alt="dd"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2 m-2">
                <h2>{item.courseName}</h2>
                <span>{item.subTitle}</span>
                {item.status ? (
                  <Button className="w-full" color="primary">
                    {item.statusType}
                  </Button>
                ) : (
                  <Button className="w-full" isDisabled>
                    {item.statusType}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
