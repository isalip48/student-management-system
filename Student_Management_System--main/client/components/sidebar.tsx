'use client';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Overview } from './icons/overview';
import { CourseIcon } from './icons/courseIcon';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname().substring(1);

  const [pathChk, setPathChk] = useState(true);
  console.log('chk', pathname);

  return (
    <div className="top-0 left-0 w-[250px] h-screen bg-[#3679ff80] px-4 py-[2rem]">
      <div>
        <Image
          src="/assets/logo.svg"
          width={200}
          height={200}
          alt="log"
          onClick={() => router.push('/')}
        />
      </div>
      <div className="flex flex-col gap-5 mt-[3rem] text-[1.2rem]">
        <Button
          variant={pathname === '' ? 'solid' : 'light'}
          size="lg"
          className="text-[1.2rem]"
          color={pathname === '' ? 'primary' : 'default'}
          onClick={() => router.push('/')}
        >
          <Overview /> Overview
        </Button>
        <Button
          onClick={() => router.push('courses')}
          variant={pathname === 'courses' ? 'solid' : 'light'}
          size="lg"
          className="text-[1.2rem]"
          color={pathname === 'courses' ? 'primary' : 'default'}
        >
          <CourseIcon /> Courses
        </Button>
      </div>
    </div>
  );
}
