import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const SubmitInputLoader = () => {
  const [dots, setDots] = useState(''); // State to track the number of dots

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500); // Change this value to speed up or slow down the animation

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box textAlign="center" p={4}>
      <Text fontSize="lg" fontWeight="bold">
        Generating{dots}
      </Text>
    </Box>
  );
};

export default SubmitInputLoader;
