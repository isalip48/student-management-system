'use client';
import React, { useState, useEffect } from 'react';
import NavAdmin from '@/components/navAdmin';
import { Button, Input } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [degreeProgram, setDegreeProgram] = useState('');
  const [intake, setIntake] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5030/api/student');
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleUpdate = (student) => {
    const state = {
      regNo: student.regNo,
      firstName: student.firstName,
      lastName: student.lastName,
      nicNo: student.nicNo,
      kduEmail: student.kduEmail,
      stuAddress: student.stuAddress,
      dob: student.dob,
      phoneNo: student.phoneNo,
      degreeProgram: student.degreeProgram,
      intake: student.intake,
      semester: student.semester,
      courses: student.courses,
    };

    const queryString = Object.keys(state)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(state[key])}`
      )
      .join('&');

    router.push(`/altCourses?${queryString}`);
  };

  const handleDelete = (student) => {
    const state = {
      regNo: student.regNo,
      firstName: student.firstName,
      lastName: student.lastName,
      nicNo: student.nicNo,
      kduEmail: student.kduEmail,
      stuAddress: student.stuAddress,
      dob: student.dob,
      phoneNo: student.phoneNo,
      degreeProgram: student.degreeProgram,
      intake: student.intake,
      semester: student.semester,
      courses: student.courses,
    };

    const queryString = Object.keys(state)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(state[key])}`
      )
      .join('&');

    router.push(`/removeStudent?${queryString}`);
  };


  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // Filter students based on degreeProgram and intake
    const filtered = students.filter(student => {
      return (
        student.degreeProgram.toLowerCase() === degreeProgram.toLowerCase() ||
        student.intake.toLowerCase() === intake.toLowerCase()
      );
    });
    setFilteredStudents(filtered);
  };

  return (
    <div className="w-full h-screen overflow-y-scroll overscroll-contain">
      <NavAdmin />
      <div>
        <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
          <div>
            <h1 className="text-lg font-bold">Search Student List</h1>
          </div>
          <form onSubmit={handleSubmitSearch}>
            <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-5 items-center">
              <div className="lg:col-span-3">
                <Input label="Degree Program" name="degreeProgram" value={degreeProgram} onChange={(e) => setDegreeProgram(e.target.value)} />
              </div>
              <div className="lg:col-span-2">
                <Input label="Intake" name="intake" value={intake} onChange={(e) => setIntake(e.target.value)} />
              </div>
              <div>
                <Button type="submit" color="primary">
                  Search
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="m-6 flex flex-col gap-6 p-[2rem] drop-shadow-2xl rounded-xl bg-[#fff]">
          <Table aria-label="Student List Table">
            <TableHeader>
              <TableColumn>First Name</TableColumn>
              <TableColumn>Last Name</TableColumn>
              <TableColumn>Reg No</TableColumn>
              <TableColumn>NIC Number</TableColumn>
              <TableColumn>KDU Email</TableColumn>
              <TableColumn> dob</TableColumn>
              {/* phoneNo,degreeProgram,intake,semester,courses
               */}
              <TableColumn> phoneNo</TableColumn>
              <TableColumn>Student Address</TableColumn>

              <TableColumn> degreeProgram</TableColumn>
              <TableColumn> intake</TableColumn>
              <TableColumn> semester</TableColumn>
              <TableColumn> courses</TableColumn>

              <TableColumn>Action</TableColumn>
            </TableHeader>

            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.regNo}</TableCell>
                  <TableCell>{student.nicNo}</TableCell>
                  <TableCell>{student.kduEmail}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>{student.phoneNo}</TableCell>
                  <TableCell>{student.stuAddress}</TableCell>
                  <TableCell>{student.degreeProgram}</TableCell>
                  <TableCell>{student.intake}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    <ul>
                      {student.courses.map((course, idx) => (
                        <li key={idx}>{course}</li>
                      ))}
                    </ul>
                  </TableCell>

                  <TableCell className="flex gap-2">
                    <Button
                      color="primary"
                      onClick={() => handleUpdate(student)}
                    >
                      Update
                    </Button>

                    <Button
                      color="danger"
                      onClick={() => handleDelete(student)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
