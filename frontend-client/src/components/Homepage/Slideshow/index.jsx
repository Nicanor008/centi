import React from 'react';
import { Box, Flex, Text, Stack, Image, ListItem, List, ListIcon, IconButton } from '@chakra-ui/react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Slideshow1 from '../../../assets/evidence/dashboard.png';
import Slideshow2 from '../../../assets/evidence/budget-expenses.png';
import Slideshow3 from '../../../assets/evidence/financial-goals.png';
import Slideshow4 from '../../../assets/evidence/savings.png';
import Slideshow5 from '../../../assets/evidence/ai-generated.png';
import { MdCheckCircle, MdArrowBack, MdArrowForward } from 'react-icons/md';

const services = [
  { title: 'Budgeting', description: 'Manage your finances and track spending with ease.' },
  { title: 'Savings', description: 'Set and achieve your savings goals effortlessly.' },
  { title: 'Managed Financial Goals', description: 'Track and achieve your financial milestones.' },
  { title: 'AI Budgeting', description: 'Get personalized budget recommendations using AI.' },
  { title: 'Automated Analytics', description: 'Get personalized budget recommendations using AI.' },
];

const screenshots = [
  Slideshow1,
  Slideshow2,
  Slideshow3,
  Slideshow4,
  Slideshow5,
];

const Slideshow = () => {
  return (
    <Flex p={4} justifyContent="center">
      <Flex spacing={4} mb={8} w="80%" alignItems="center">
        <Box mb={8} w="30%">
          <Text fontSize={24} fontWeight={700} size="xl" mb={4} fontFamily="inherit">
            One Package Solution
          </Text>
          <Stack spacing={4}>
            <List spacing={3}>
              {services.map((service, index) => (
                <ListItem key={index}>
                  <Flex alignItems="center">
                    <ListIcon as={MdCheckCircle} color='red.500' />
                    <Text size="lg">{service.title}</Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Box>

        {/* Slideshow of Screenshots */}
        <Box width="70%">
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={50}
            totalSlides={screenshots.length}
            visibleSlides={1}
            infinite
            dragEnabled
            interval={2000} // Auto-play interval
            isPlaying={1000}
          >
            <Slider>
              {screenshots.map((src, index) => (
                <Slide key={index}>
                  <Image src={src} alt={`Centi screenshot ${index + 1}`} borderRadius="md" />
                </Slide>
              ))}
            </Slider>
            <Flex justifyContent="center" mt={4}>
              <ButtonBack>
                <IconButton
                    aria-label="Previous slide"
                    icon={<MdArrowBack />}
                    mr={4}
                />
              </ButtonBack>
              <ButtonNext>
              <IconButton
                aria-label="Next slide"
                icon={<MdArrowForward />}
              />
              </ButtonNext>
              </Flex>
          </CarouselProvider>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Slideshow;
