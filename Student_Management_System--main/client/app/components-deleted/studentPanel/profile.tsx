'use client';

import { Avatar, Button, Input, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { AddIcon } from '../icons/addIcon';

export default function Profile() {
  return (
    <div className="w-full h-screen bg-[#fff] drop-shadow-xl rounded-xl p-6 mb-6 overflow-y-scroll overscroll-contain">
      <div className="flex flex-col gap-6">
        <div>
          <h1>Edit Profile</h1>
        </div>
        <div className="mx-2 lg:mx-[4rem]">
          <form>
            <div className="flex flex-col gap-6">
              {/* top section */}
              <div className="relative w-full flex flex-col lg:flex-row gap-5 lg:gap-10 justify-between items-center">
                <div className="w-full lg:w-[50%] flex justify-center flex-col gap-4 items-center">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                    className="w-40 h-40 text-large"
                  />
                  <Input
                    type="file"
                    labelPlacement="outside"
                    placeholder="Select Image"
                    variant="bordered"
                  />
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="w-full">
                      <Input
                        type="text"
                        label="First Name"
                        isRequired
                        variant="bordered"
                        name="firstName"
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Last Name"
                        isRequired
                        variant="bordered"
                        name="lastName"
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Student NIC Number"
                        isRequired
                        variant="bordered"
                        name="nicNo"
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Student DOB"
                        isRequired
                        variant="bordered"
                        name="dob"
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="w-full">
                      <Input
                        type="text"
                        label="Registration Number"
                        isRequired
                        variant="bordered"
                        name="regNo"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* bottom section */}
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Input
                      type="email"
                      label="KDU Email"
                      isRequired
                      variant="bordered"
                      name="firstName"
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="Number"
                      label="Phone Number"
                      isRequired
                      variant="bordered"
                      name="phoneNo"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Input
                      type="text"
                      label="Student Address"
                      isRequired
                      variant="bordered"
                      name="stuAddress"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Input
                      type="text"
                      label="Student Degree Program"
                      isRequired
                      variant="bordered"
                      name="stuDegProgram"
                    />
                  </div>
                  <div className="w-full lg:w-[50%]">
                    <Input
                      type="text"
                      label="Intake"
                      isRequired
                      variant="bordered"
                      name="intake"
                    />
                  </div>
                  <div className="w-full lg:w-[2  5%]">
                    <Input
                      type="text"
                      label="Semester"
                      isRequired
                      variant="bordered"
                      name="semester"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-5">
                  <div className="w-full">
                    <Select
                      label="Select all the courses"
                      className="w-full"
                      variant="bordered"
                      isRequired
                    >
                      <SelectItem key="1" value="Course1">
                        Course1
                      </SelectItem>
                      <SelectItem key="2" value="Course2">
                        Course2
                      </SelectItem>
                      <SelectItem key="3" value="Course3">
                        Course3
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4 flex flex-col lg:flex-row gap-4 justify-center lg:justify-end">
              <Button type="reset" size="md">
                Reset
              </Button>
              <Button type="submit" color="primary" size="md">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
