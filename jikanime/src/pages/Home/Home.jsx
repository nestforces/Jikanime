import React, { useState, useEffect } from 'react';
import { Box, HStack, Spacer, Text } from '@chakra-ui/react';
import { colors } from '../../assets/Colors/colors';
import Recomendations from '../../components/Home/Recomendations/Recomendations';
import TopAnime from '../../components/Home/TopAnime/TopAnime';
import Upcoming from '../../components/Home/Upcoming/Upcoming';
import Navbar from '../../components/Navbar/Navbar';
import AiringNow from '../../components/Home/AiringNow/AiringNow';

const Home = () => {
  const [topAnimeLoaded, setTopAnimeLoaded] = useState(false);
  const [recomendationsLoaded, setRecomendationsLoaded] = useState(false);
  const [airingNowLoaded, setAiringNowLoaded] = useState(false);
  const [upcomingLoaded, setUpcomingLoaded] = useState(false);
  const [isTopSection, setIsTopSection] = useState(true);

  useEffect(() => {
    

    const handleScroll = () => {
      const topsection = document.getElementById('topsection');
      const recomendationsection = document.getElementById('recomendationsection');
      const scrollPosition = window.scrollY;
    
      // Calculate the scroll position relative to the top of the page
      const topSectionOffset = topsection.offsetTop;
      const recommendationSectionOffset = recomendationsection.offsetTop;
    
      // Check if the scroll position is within the top section
      if (scrollPosition < recommendationSectionOffset) {
        setIsTopSection(true);
      } else {
        setIsTopSection(false);
      }
    };
    

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isTopSection])

  useEffect(() => {
    fetchDataForTopAnime();
  }, []);

  const fetchDataForTopAnime = async () => {
    try {
      // Fetch data for TopAnime
      // For example:
      // const response = await axios.get('topAnimeApiEndpoint');
      // setDataForTopAnime(response.data);
      setTopAnimeLoaded(true);
    } catch (error) {
      console.error('Error fetching data for TopAnime:', error);
    }
  };

  useEffect(() => {
    if (topAnimeLoaded) {
      fetchDataForRecomendations();
    }
  }, [topAnimeLoaded]);

  const fetchDataForRecomendations = async () => {
    try {
      // Fetch data for Recomendations
      // For example:
      // const response = await axios.get('recomendationsApiEndpoint');
      // setDataForRecomendations(response.data);
      setRecomendationsLoaded(true);
    } catch (error) {
      console.error('Error fetching data for Recomendations:', error);
    }
  };

  useEffect(() => {
    if (recomendationsLoaded) {
      fetchDataForAiringNow();
    }
  }, [recomendationsLoaded]);

  const fetchDataForAiringNow = async () => {
    try {
      // Fetch data for Recomendations
      // For example:
      // const response = await axios.get('recomendationsApiEndpoint');
      // setDataForRecomendations(response.data);
      setAiringNowLoaded(true);
    } catch (error) {
      console.error('Error fetching data for Recomendations:', error);
    }
  };

  useEffect(() => {
    if (airingNowLoaded) {
      fetchDataForUpcoming();
    }
  }, [airingNowLoaded]);

  

  const fetchDataForUpcoming = async () => {
    try {
      // Fetch data for Upcoming
      // For example:
      // const response = await axios.get('upcomingApiEndpoint');
      // setDataForUpcoming(response.data);
      setUpcomingLoaded(true);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  return (
    <>
      <Box backgroundColor={colors.background} width='100vw' height='full'>\
        <Navbar isTopSection={isTopSection}/>
      <Box id='topsection'>
            {topAnimeLoaded && <TopAnime />}
        {/* <Box id='topsection'></Box> */}
          </Box>
        <Box maxWidth='100vw' p='20px'>
          <Box id='recomendationsection'>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Recomendations</Text>
              <Spacer />
              <Text textColor={colors.text}>more</Text>
            </HStack>
            {recomendationsLoaded && <Recomendations />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Airing Now</Text>
              <Spacer />
              <Text textColor={colors.text}>more</Text>
            </HStack>
            {airingNowLoaded && <AiringNow />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Upcoming</Text>
              <Spacer />
              <Text textColor={colors.text}>more</Text>
            </HStack>
            {upcomingLoaded && <Upcoming />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
