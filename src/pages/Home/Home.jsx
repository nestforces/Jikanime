import React, { useState, useEffect } from 'react';
import { Box, HStack, Spacer, Text } from '@chakra-ui/react';
import { getColors } from '../../assets/Colors/colors';
import Recomendations from '../../components/Home/Recomendations/Recomendations';
import TopAnime from '../../components/Home/TopAnime/TopAnime';
import Upcoming from '../../components/Home/Upcoming/Upcoming';
import Navbar from '../../components/Navbar/Navbar';
import AiringNow from '../../components/Home/AiringNow/AiringNow';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import LoaderTopAnime from '../../components/Loader/LoaderTopAnime';
import Movies from '../../components/Home/Movies/Movies';
import { useNavigate } from 'react-router-dom';
import Horror from '../../components/Home/Horror/Horror';
import Romance from '../../components/Home/Romance/Romance';
import Action from '../../components/Home/Action/Action';
import AwardWinning from '../../components/Home/AwardWinning/AwardWinning';

const Home = () => {
  const [topAnimeLoaded, setTopAnimeLoaded] = useState(false);
  const [recomendationsLoaded, setRecomendationsLoaded] = useState(false);
  const [airingNowLoaded, setAiringNowLoaded] = useState(false);
  const [upcomingLoaded, setUpcomingLoaded] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [actionLoaded, setActionLoaded] = useState(false);
  const [romanceLoaded, setRomanceLoaded] = useState(false);
  const [horrorLoaded, setHorrorLoaded] = useState(false);
  const [awardwinningLoaded, setAwardWinningLoaded] = useState(false);
  const [isTopSection, setIsTopSection] = useState(true);
  const navigate = useNavigate();
  const [colorMode, setColorMode] = useState(localStorage.getItem("colorMode") || "dark"); // Retrieve colorMode from local storage
  const colors = getColors();
  
  useEffect(() => {
    const handleColorModeChange = () => {
        // Re-render the component to reflect the updated color mode
        forceUpdate();
    };

    window.addEventListener('storage', handleColorModeChange);

    return () => {
        window.removeEventListener('storage', handleColorModeChange);
    };
}, []);

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
      setTimeout(() => {
        setTopAnimeLoaded(true);
      }, 2000);
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
      setTimeout(() => {
        setRecomendationsLoaded(true);
      }, 2000);
    } catch (error) {
      console.error('Error fetching data for Recomendations:', error);
    }
  };

  useEffect(() => {
    if (recomendationsLoaded) {
      fetchDataForAwardWinning();
    }
  }, [recomendationsLoaded]);

  const fetchDataForAwardWinning = async () => {
    try {
      // Fetch data for Upcoming
      // For example:
      // const response = await axios.get('upcomingApiEndpoint');
      // setDataForUpcoming(response.data);
        
        setTimeout(() => {
          setAwardWinningLoaded(true);
        }, 2000);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  useEffect(() => {
    if (awardwinningLoaded) {
      fetchDataForMovies();
    }
  }, [awardwinningLoaded]);

  const fetchDataForMovies = async () => {
    try {
      // Fetch data for Upcoming
      // For example:
      // const response = await axios.get('upcomingApiEndpoint');
      // setDataForUpcoming(response.data);
        
        setTimeout(() => {
          setMoviesLoaded(true);
        }, 2000);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  useEffect(() => {
    if (moviesLoaded) {
      fetchDataForAiringNow();
    }
  }, [moviesLoaded]);

  const fetchDataForAiringNow = async () => {
    try {
      // Fetch data for Recomendations
      // For example:
      // const response = await axios.get('recomendationsApiEndpoint');
      // setDataForRecomendations(response.data);
      setTimeout(() => {
        setAiringNowLoaded(true);
      }, 2000);
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
      setTimeout(() => {
        setUpcomingLoaded(true);
      }, 2000);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  useEffect(() => {
    if (upcomingLoaded) {
      fetchDataForAction();
    }
  }, [upcomingLoaded]);

  const fetchDataForAction = async () => {
    try {
      // Fetch data for Upcoming
      // For example:
      // const response = await axios.get('upcomingApiEndpoint');
      // setDataForUpcoming(response.data);
        
        setTimeout(() => {
          setActionLoaded(true);
        }, 2000);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  useEffect(() => {
    if (actionLoaded) {
      fetchDataForRomance();
    }
  }, [actionLoaded]);

  const fetchDataForRomance = async () => {
    try {
      // Fetch data for Upcoming
      // For example:
      // const response = await axios.get('upcomingApiEndpoint');
      // setDataForUpcoming(response.data);
        
        setTimeout(() => {
          setRomanceLoaded(true);
        }, 2000);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  useEffect(() => {
    if (romanceLoaded) {
      fetchDataForHorror();
    }
  }, [romanceLoaded]);

  const fetchDataForHorror = async () => {
    try {
      // Fetch data for Upcoming
      // For example:
      // const response = await axios.get('upcomingApiEndpoint');
      // setDataForUpcoming(response.data);
        
        setTimeout(() => {
          setHorrorLoaded(true);
        }, 2000);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  return (
    <>
      <Box backgroundColor={colors.background} width='100vw' height='full'>
        <Navbar isTopSection={isTopSection} colorMode2={colorMode} setColorMode2={setColorMode} />
      <Box id='topsection'>
            {topAnimeLoaded && <TopAnime />} {!topAnimeLoaded && <LoaderTopAnime />}
        {/* <Box id='topsection'></Box> */}
          </Box>
        <Box maxWidth='100vw' p='20px'>
          <Box id='recomendationsection'>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Recomendations</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/recomendations')}>more</Text>
            </HStack>
            {recomendationsLoaded && <Recomendations />} {!recomendationsLoaded && <Loader />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Award Winning</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/awardwinning')}>more</Text>
            </HStack>
            {awardwinningLoaded && <AwardWinning />} {!awardwinningLoaded && <Loader />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Top Movies</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/topmovies')}>more</Text>
            </HStack>
            {moviesLoaded && <Movies />} {!moviesLoaded && <Loader />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Airing Now</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/airingnow')}>more</Text>
            </HStack>
            {airingNowLoaded && <AiringNow />} {!airingNowLoaded && <Loader />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Upcoming</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/upcoming')}>more</Text>
            </HStack>
            {upcomingLoaded && <Upcoming />} {!upcomingLoaded && <Loader />}
          </Box>
          
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Action</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/action')}>more</Text>
            </HStack>
            {actionLoaded && <Action />} {!actionLoaded && <Loader />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Romance</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/romance')}>more</Text>
            </HStack>
            {romanceLoaded && <Romance />} {!romanceLoaded && <Loader />}
          </Box>
          <Box>
            <HStack>
              <Text textColor={colors.text} fontSize='x-large' fontWeight='bold'>Horror</Text>
              <Spacer />
              <Text textColor={colors.text} cursor='pointer' onClick={() => navigate('anime-lists/horror')}>more</Text>
            </HStack>
            {horrorLoaded && <Horror />} {!horrorLoaded && <Loader />}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
