'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Overview from '@/components/overview';

export default function Home() {
  const router = useRouter();

  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(
    localStorage.getItem('isLog') || 'false'
  );

  if (!isLog) {
    router.replace('http://localhost:3000/auth/signin');
  }

  if (isLog  && isAdmin) {
    router.replace('http://localhost:3000/addStudent');
  }

  if (isLog && isAdmin == false) {
    router.replace('http://localhost:3000/');
  }

  return (
    <div className="w-full flex">
      <Overview />
    </div>
  );
}
