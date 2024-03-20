import { Flex, Tabs, Tab, TabList, TabPanels, TabPanel, Heading, Text, Box, useColorModeValue, Button, HStack, VStack, Spacer, Avatar, Grid, Image } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
// import Tiket from '../../../components/Tiket/Tiket';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react'
import { colors } from '../../../assets/Colors/colors';
// import { ReactComponent as MySVG } from './ic_voucher.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BottomBox = ({data}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const navigate = useNavigate();
  console.log(data?.mal_id);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const mal_id = data?.mal_id;
  const [displayedCharacters, setDisplayedCharacters] = useState(6);
  const [displayedOpenings, setDisplayedOpenings] = useState(5);
  const [displayedEndings, setDisplayedEndings] = useState(5);

  const handleLoadMore = () => {
    // Increase the number of displayed characters by 12 when the button is clicked
    setDisplayedCharacters(displayedCharacters + 12);
  };

  const toggleSynopsis = () => {
    setIsSynopsisExpanded(!isSynopsisExpanded);
  };


  const fetchData = async (mal_id) => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${mal_id}/characters`);
      console.log(response?.data);
      setData1(response?.data?.data);
      setTimeout(async () => { // Add async keyword here
        try {
          const response1 = await axios.get(`https://api.jikan.moe/v4/anime/${mal_id}/pictures`);
          console.log("data2", response1?.data);
          setData2(response1?.data?.data);
        } catch (err) {
          console.log(err);
        }
      }, 1000);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mal_id) {
      fetchData(mal_id);
    }
  }, [mal_id]);



console.log("ini data", data);
  return (
    <>
      <Flex
        direction={{ base: 'column', md: 'row', sm: 'column' }}
        alignItems={{ base: 'center', sm: 'flex-start' }}
        height="fit-content"
        mt={{ md: '-7%' }}
        position='relative'
        marginLeft='auto'
        marginRight='auto'
        gap='30px'
        width='100%'
        textColor={colors.text}
        padding={{base: '0%', md: '4%'}}
      >
        <Flex
          flexDirection={'column'}
          width={{ md: '65%', sm: '100%', base: '100%' }}
          padding={'2%'}
          borderRadius='10px'
          boxShadow="0px 1px 5px gray"
          rounded={'lg'}
          bg={colors.backgroundcard}

        >
          <Tabs>
            <TabList justifyContent='center' width='100%'>
              <Tab
                _selected={{
                  borderBottom: '2px solid #00008B',
                  fontWeight: 'bold',
                  position: 'relative',
                  _after: {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '4px',
                    borderRadius: '4px 4px 0 0',
                    background: '#00008B',
                  },
                }}
                width='100%'
              >
                <Text>INFORMATION</Text>
              </Tab>
              <Tab
                _selected={{
                  borderBottom: '2px solid #00008B',
                  fontWeight: 'bold',
                  position: 'relative',
                  _after: {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '4px',
                    borderRadius: '4px 4px 0 0',
                    background: '#00008B',
                  },
                }}
                width='100%'
              >
                <Text>CHARACTERS</Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
              <HStack>
                  <Box bg={colors.secondary} width='7px' color={colors.secondary} borderRadius='0px 10px 0px 10px'>
                    |
                  </Box>
                  <Heading size='md'>Aired</Heading>
                </HStack>
                <Flex gap='5px' flexDirection='column' flexWrap='wrap'>
                    <Text>Date : {data?.aired?.string}</Text>
                    <Text>Broadcast : {data?.type + " / "}  {data?.broadcast?.string} {data?.broadcast?.timezone}</Text>

                </Flex>
                <HStack mb='10px' mt='20px'>
                  <Box bg={colors.secondary} width='7px' color={colors.secondary} borderRadius='0px 10px 0px 10px'>
                    |
                  </Box>
                  <Heading size='md'>Synopsis</Heading>
                </HStack>
                <Text>
                {isSynopsisExpanded ? data?.synopsis : `${data?.synopsis?.substring(0, 200)}...`}
                  <Text cursor='pointer' textColor={colors.secondary} colorScheme="blue" variant="link" onClick={toggleSynopsis} ml="2">
                    {isSynopsisExpanded ? 'Read Less' : 'Read More'} </Text>
                </Text>
                <HStack mb='10px' mt='20px'>
                  <Box bg={colors.secondary} width='7px' color={colors.secondary} borderRadius='0px 10px 0px 10px'>
                    |
                  </Box>
                  <Heading size='md'>Genres</Heading>
                </HStack>
                <Flex gap='10px' flexDirection='row' flexWrap='wrap'>
                    {data?.genres?.length > 0 && data?.genres.map((item) => (
                    <Box key={item.name} borderRadius='10px' p='5px' bgColor={colors.darker} textColor='white' pl='5px' pr='5px' w='fit-content'>
                        <Text>{item.name}</Text>
                    </Box>
                    ))}

                </Flex>
                <HStack mb='10px' mt='20px'>
                  <Box bg={colors.secondary} width='7px' color={colors.secondary} borderRadius='0px 10px 0px 10px'>
                    |
                  </Box>
                  <Heading size='md'>Opening's</Heading>
                </HStack>
                <Flex gap='10px' flexDirection='column' flexWrap='wrap'>
                  {data?.theme?.openings?.length > 0 &&
                    data?.theme?.openings?.slice(0, displayedOpenings).map((item, index) => (
                      <Box key={index} borderRadius='10px' p='5px' bgColor={colors.darker} textColor='white' pl='5px' pr='5px' w='fit-content'>
                        <Text>{item}</Text>
                      </Box>
                    ))}
                </Flex>
                {displayedOpenings < data?.theme?.openings?.length && (
                  <Button mt='10px' textColor='white' _hover={{ textColor: `${colors.secondary}`, backgroundColor: 'white' }} backgroundColor={colors.secondary} width='full' onClick={() => setDisplayedOpenings(displayedOpenings + 5)}>
                    Load More
                  </Button>
                )}
                <HStack mb='10px' mt='20px'>
                  <Box bg={colors.secondary} width='7px' color={colors.secondary} borderRadius='0px 10px 0px 10px'>
                    |
                  </Box>
                  <Heading size='md'>Ending's</Heading>
                </HStack>
                <Flex gap='10px' flexDirection='column' flexWrap='wrap'>
                  {data?.theme?.endings?.length > 0 &&
                    data?.theme?.endings?.slice(0, displayedEndings).map((item, index) => (
                      <Box key={index} borderRadius='10px' p='5px' bgColor={colors.darker} textColor='white' pl='5px' pr='5px' w='fit-content'>
                        <Text>{item}</Text>
                      </Box>
                    ))}
                </Flex>
                {displayedEndings < data?.theme?.endings?.length && (
                  <Button mt='10px' textColor='white' _hover={{ textColor: `${colors.secondary}`, backgroundColor: 'white' }} backgroundColor={colors.secondary} width='full' onClick={() => setDisplayedEndings(displayedEndings + 5)}>
                    Load More
                  </Button>
                )}
              </TabPanel>
              <TabPanel>
              <Grid gridRowGap='50px' templateColumns="repeat(auto-fill, minmax(100px, 1fr))">
      {data1
        ?.sort((a, b) => b?.favorites - a?.favorites) // Sort characters by most favorites
        .slice(0, displayedCharacters) // Get only the top characters based on the state
        .map((item, index) => (
          <VStack key={index}>
            {/* Display character image and name */}
            <Box position='relative'>
              <Image height='180px' borderRadius='10px' objectFit='cover' width='100px' src={item?.character?.images?.jpg?.image_url} />
              <Box
                position='absolute'
                bottom='0'
                left='0'
                width='100%'
                background='linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'
                p='5px'
                borderRadius='10px' // To apply border radius only to the bottom
              >
                <Text textColor={colors?.text} textAlign='center' flexWrap='wrap' maxHeight='40px' fontSize='xs'>
                  {item?.character?.name}
                </Text>
              </Box>
            </Box>
            {/* Display voice actor */}
            {item?.voice_actors?.map((voiceActor, idx) => (
              (voiceActor?.language === "Japanese" && idx === 0) && (
                <Box key={idx} position='relative'>
                  <Image height='180px' borderRadius='10px' objectFit='cover' width='100px' src={voiceActor?.person?.images?.jpg?.image_url} />
                  <Box
                    position='absolute'
                    bottom='0'
                    left='0'
                    width='100%'
                    background='linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'
                    p='5px'
                    borderRadius='10px' // To apply border radius only to the bottom
                  >
                    <Text textColor={colors?.text} textAlign='center' flexWrap='wrap' maxHeight='40px' fontSize='xs'>
                      {voiceActor?.person?.name}
                    </Text>
                  </Box>
                </Box>
              )
            ))}
          </VStack>
        ))}
      {/* Load more button */}
        

    </Grid>
    {displayedCharacters < data1.length && (
          <Button mt='10px' textColor='white' _hover={{textColor: `${colors.secondary}`, backgroundColor: 'white'}} backgroundColor={colors.secondary} width='full' onClick={handleLoadMore}>Load More</Button>
        )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        <Box
          width={{ md: '35%', base: '100%' }}
          // maxW='360px'
          // p='5%'
          top='20px'
          position='sticky'
        >
          <Box
            role={'group'}
            p={6}
            maxW={{ md: '100%', base: '100%' }}
            mt={{base: '20px', md: '0px'}}
            bg={colors.backgroundcard}
            boxShadow='0px 1px 5px gray'
            rounded='lg'
            pos='relative'
            // zIndex={1}
            // mb='40px'
          >
            <Text fontWeight='bold' textAlign='center' mb='10px'>Pictures</Text>
            {data2?.length > 0 ? (
              <Swiper
                slidesPerView={1}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                spaceBetween={30}
                loop={true}
                className="mySwiper"
                modules={[Autoplay]}
                style={{
                  transition: 'width .2s ease-in-out',
                }}
              >
                {data2.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      backgroundRepeat: 'no-repeat',
                      transition: 'width .1s ease-in-out',
                    }}
                  >
                    <Image margin='auto' maxW='100%' borderRadius='10px' src={item?.jpg?.large_image_url} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}

          </Box> 
          <Box mt={{base: '20px', md: '10px'}} mb={{base: '20px', md: '0px'}} textAlign='center'>
            <Text mb='10px'>Share</Text>
            <Flex flexWrap='wrap' justifyContent='center' gap='10px'>
              <FacebookShareButton url={`${window.location.href}`} quote={'Check out these awesome anime! 🎉📺 #Anime #Recommendations'} hashtag='#ticketing'>
                <Button colorScheme='facebook' leftIcon={<FaFacebook />}>
                  Facebook
                </Button>
              </FacebookShareButton>
              <TwitterShareButton url={`${window.location.href}`} quote={'Check out these awesome anime! 🎉📺 #Anime #Recommendations'} hashtag='#ticketing'>
                <Button colorScheme='twitter' leftIcon={<FaTwitter />}>
                  Twitter
                </Button>
              </TwitterShareButton>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default BottomBox;