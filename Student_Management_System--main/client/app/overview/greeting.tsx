'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Greeting = () => {


  

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const myDate = new Date();
    const hours = myDate.getHours();

    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours >= 12 && hours <= 17) {
      setGreeting('Good afternoon');
    } else if (hours >= 17 && hours <= 24) {
      setGreeting('Good evening');
    } else {
      setGreeting('Good night');
    }
  }, []);

  return <p id="greetings">{greeting}</p>;
};

export default Greeting;
