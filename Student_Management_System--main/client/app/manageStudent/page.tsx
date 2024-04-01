'use client';
import React, { useState } from 'react';
import Nav from '@/components/navAdmin';
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ManageStudent() {

  const router = useRouter();

  const isAdmin: boolean = JSON.parse(
    localStorage.getItem('isAdmin') || 'false'
  );

  const isLog: boolean = JSON.parse(localStorage.getItem('isLog') || 'false');

  if (!isLog) {
    router.replace('http://localhost:3000/auth/signin');
  }

  if (isLog && !isAdmin) {
    router.replace('http://localhost:3000/notfound');
  }

  const [registerNo, setRegisterNo] = useState('');
  const [courseHistory, setCourseHistory] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5030/api/course/student-courses/${registerNo}`);
      setCourseHistory(response.data);
    } catch (error) {
      console.error('Error fetching course history:', error);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <Nav />
      <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
        <div>
          <h1 className="text-lg font-bold">Search Student Course History</h1>
        </div>
        <form onSubmit={handleSearch}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center items-center">
            <div className="lg:col-span-2">
              <Input
                label="Registration Number"
                name="registerNo"
                value={registerNo}
                onChange={(e) => setRegisterNo(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" color="primary">
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
      {courseHistory && (
        <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
          {Object.entries(courseHistory).map(([semester, courses]) => (
            <div key={semester} className="w-full">
              <div className="text-center mb-4">
                <h1 className="text-lg font-bold">Semester {semester}</h1>
              </div>
              <table className="w-full table-fixed border-collapse border border-slate-400 text-left">
                <thead>
                  <tr>
                    <th className="bg-primary text-[#fff] border border-slate-400 p-2">Code</th>
                    <th className="bg-primary text-[#fff] border border-slate-400 p-2">Module Name</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index}>
                      <td className="p-2 border border-slate-300">{course.modCode}</td>
                      <td className="p-2 border border-slate-300">{course.modName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}