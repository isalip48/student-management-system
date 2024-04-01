'use client';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Notfound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Image
          src="/assets/sadIcon.svg"
          width={200}
          height={200}
          alt="dd"
          style={{ objectFit: 'contain' }}
        />
        <h1 className="text-[4rem]">404</h1>
        <h3>OOPS! NOTHING WAS FOUND...!</h3>
        <Button
          color="danger"
          className="w-[auto]"
          onClick={() => router.replace('/')}
        >
          Return to Home Page
        </Button>
      </div>
    </div>
  );
}
