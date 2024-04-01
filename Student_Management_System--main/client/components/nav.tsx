'use client';

import React, { useEffect, useState } from 'react';
import { NotificationIcon } from './icons/notification';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
} from '@nextui-org/react';
import { EditIcon } from './icons/editIcon';
import Greeting from './greeting';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Image } from 'cloudinary-react';

export default function Nav() {
  const getregNo = localStorage.getItem('regNo');
  const profileImg = localStorage.getItem('CurrentUserImg');
  const router = useRouter();

  const [currentImg, setCurrentImg] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  console.log(profileImg);

  const loadImages = async (profileImg: any) => {
    try {
      const res = await fetch(
        `http://localhost:5030/api/upload/images/${profileImg}`
      );
      const data = await res.json();
      console.log(data);
      setCurrentImg(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadImages(profileImg);
  }, [profileImg]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const regNo = localStorage.getItem('regNo');
        const response = await axios.get(
          `http://localhost:5030/api/student/${regNo}`
        );
        localStorage.setItem(
          'CurrentUserImg',
          response.data.image.replace('dev_setups/', '')
        );
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    getProfileData();
  }, []);

  const logouts = () => {
    localStorage.setItem('isLog', 'false');
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('CurrentUserImg', '');
    localStorage.setItem('imgId', '');
    router.replace('http://localhost:3000/auth/signin');
  };

  return (
    <div className="w-full h-[100px] flex justify-between items-center p-[2rem]">
      <div className="hidden lg:block">
        <div className="flex text-xl font-bold gap-2">
          <Greeting /> {firstName}
        </div>
        <span>Let s learn something new today </span>
      </div>
      <div className="flex justify-center items-center gap-8">
        <div className="hidden md:block">
          <Input type="text" placeholder="Search here" variant="bordered" />
        </div>
        <div>
          <Button variant="bordered">
            <NotificationIcon />
          </Button>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Link href="studentProfile" className="text-black flex gap-2">
            {currentImg ? (
              <Image
                cloudName="dypvbk20u"
                publicId={currentImg}
                width="40"
                height="40"
                crop="scale"
                alt="img"
                className="rounded-full"
              />
            ) : (
              <Avatar
                src="/assets/avatar.svg"
                className="w-40 h-40 text-large"
              />
            )}
            <h3>{firstName}</h3>
          </Link>
        </div>
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                <EditIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="new"
                onClick={() => router.push('studentProfile')}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={logouts}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
