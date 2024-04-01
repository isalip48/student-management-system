'use client';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Overview } from './icons/overview';
import { CourseIcon } from './icons/courseIcon';
import { usePathname, useRouter } from 'next/navigation';
import { AddStudentIcon } from './icons/addStudentIcon';
import { AltStudentIcon } from './icons/altStudentIcon';
import { RemoveStudentIcon } from './icons/removeStudentIcon';
import { StudentListIcon } from './icons/studentList';
import { ManageStudentIcon } from './icons/manageStudent';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname().substring(1);

  const [pathChk, setPathChk] = useState(true);
  console.log('chk', pathname);

  const linkList = [
    {
      title: 'Add Student',
      path: 'addStudent',
      icon: <AddStudentIcon />,
    },
    {
      title: 'Alter course',
      path: 'altCourses',
      icon: <AltStudentIcon />,
    },
    {
      title: 'Remove Student',
      path: 'removeStudent',
      icon: <RemoveStudentIcon />,
    },
    {
      title: 'Student List',
      path: 'studentList',
      icon: <StudentListIcon />,
    },
    {
      title: 'Manage Student',
      path: 'manageStudent',
      icon: <ManageStudentIcon />,
    },
  ];

  return (
    <div className="top-0 left-0 w-[300px] h-screen bg-[#3679ff80] px-4 py-[2rem]">
      <div>
        <Image src="/assets/logo.svg" width={200} height={200} alt="log" />
      </div>
      <div className="flex flex-col gap-5 mt-[3rem] text-[1.2rem]">
        {linkList.map((item, index) => (
          <Button
            key={index}
            onClick={() => router.push(`${item.path}`)}
            variant={pathname === item.path ? 'solid' : 'light'}
            size="lg"
            className="text-[1rem] w-[200px]"
            color={pathname === item.path ? 'primary' : 'default'}
            startContent={item.icon}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
