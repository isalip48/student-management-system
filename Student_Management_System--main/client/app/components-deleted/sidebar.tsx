'use client';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Overview } from './icons/overview';
import { CourseIcon } from './icons/courseIcon';

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-[250px] h-screen bg-[#3679ff80] px-4 py-[2rem]">
      <div>
        <Link href="/">
          <Image src="/assets/logo.svg" width={200} height={200} alt="log" />
        </Link>
      </div>
      <div className="flex flex-col gap-5 mt-[3rem] text-[1.2rem]">
        <Link href="#" className="flex items-center gap-2">
          <Overview /> Overview
        </Link>
        <Link href="#" className="flex items-center gap-2">
          <CourseIcon /> Courses
        </Link>
      </div>
    </div>
  );
}
