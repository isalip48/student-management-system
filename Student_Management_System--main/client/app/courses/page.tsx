'use client';
import React, { useState, useEffect } from 'react';
import Nav from '@/components/nav';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import RecentlyAccessedCourses from './RecentlyAccessedCourses';

export default function Courses() {
  const router = useRouter();
 

  const [registerNo, setRegisterNo] = useState('');
  const [courseHistory, setCourseHistory] = useState(null);

  useEffect(() => {
    const fetchCourseHistory = async () => {
      try {
        const regNo = localStorage.getItem('regNo');
        if (regNo) {
          const response = await axios.get(`http://localhost:5030/api/course/student-courses/${regNo}`);
          setCourseHistory(response.data);
        }
      } catch (error) {
        console.error('Error fetching course history:', error);
      }
    };
    fetchCourseHistory();
  }, []); 

  return (
    
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <Nav />
      <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
      <RecentlyAccessedCourses  /> 
      </div>
      {courseHistory && (
        <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
        <h1 className="text-[1.2rem] font-bold ">
            My courses
          </h1>
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
