'use client';

import React from 'react';
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

export default function Nav() {
  const router = useRouter();
  const getName = localStorage.getItem('Name');

  const logouts = () => {
    localStorage.setItem('isLog', 'false');
    localStorage.setItem('isAdmin', 'false');
    router.replace('http://localhost:3000/auth/signin');
  };

  return (
    <div className="w-full h-[100px] flex justify-between items-center p-[2rem]">
      <div className="hidden lg:block">
        <div className="flex text-xl font-bold gap-2">
          <Greeting /> {getName}
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
          <Link href="#" className="text-black flex gap-2">
            <Avatar
              src="/assets/avatar-1.svg"
              className="w-10 h-10 text-large"
            />
            <h3>{getName}</h3>
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
                onClick={() =>
                  router.push('http://localhost:3000/auth/admin-signup')
                }
              >
                Add Admin
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
