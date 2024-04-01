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

export default function Nav() {
  return (
    <div className="w-full h-[100px] flex justify-between items-center">
      <div className="hidden lg:block">
        <div className="flex text-xl font-bold">
          <Greeting /> Alex
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
          <Link href="auth/signin" className='text-black'>
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              size="md"
            />
            <h3>Alex</h3>
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
              <DropdownItem key="new">Profile</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
