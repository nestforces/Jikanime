import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { colors } from "../../../assets/Colors/colors";
import star from './star-svgrepo-com.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

const AnimeByGenre = ({genreId}) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [selectedTrailer, setSelectedTrailer] = useState("");
    const genreIds = genreId?.map(entry => entry?.mal_id); // Extract mal_id values
    // const firstThreeGenreIds = genreIds?.slice(0, 3);
    
    // Shuffle the array randomly
    const shuffledIds = genreIds?.sort(() => Math.random() - 0.5);

    // Extract mal_id values from the first 3 entries
    const randomEntries = shuffledIds?.slice(0, 3)?.map(entry => entry);
    console.log(randomEntries)

    const fetchData = async () => {
        try {
            // const genreIdsString = genreIds?.join(',');
            const response = await axios.get(
                `https://api.jikan.moe/v4/anime?genres=${randomEntries}`,
                {
                    timeout: 2000 
                }
            );
            setData(response?.data?.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(genreId) {
            fetchData();
        }
    }, [genreId]);


    return (
        <>
            <Box p='10px'>
                <Text fontWeight='bold' mb='5px' fontSize='x-large' textColor={colors.text}>Same Anime By Genres</Text>
        <Flex
        flexDirection='row'
        style={{ msOverflowStyle: 'none' }}
        css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}
        width='100%'
        overflowX='auto'
        gap={5}
      >
                {data?.map((item, index) => (
                    <>
                        <Box key={index}>
                        <Card onClick={(event) => { event.preventDefault(); navigate(`/anime-detail/${item?.mal_id}`); window.location.reload()}} width='230px' height='300px' textColor={colors?.text} key={item.mal_id} bgSize='cover' bgImage={item?.images?.jpg?.large_image_url}
                            >
                                <CardBody  bgColor='rgba(0, 0, 0, 0.4)'
                                    _hover={{ bgColor: 'rgba(0, 0, 0, 0.8)' }} cursor='pointer'>
                                    <Stack mt='-3' spacing='0'>
                                    <Heading  size="sm" width="180px" css={{ height: '-webkit-min-content', maxHeight: '-webkit-min-content', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                        {item.title}
                                        </Heading>
                                        <Text fontSize="xs" mt="5px">
                                            {item?.status}
                                        </Text>
                                        <Text fontSize="xs" mt="5px">
                                            {item?.rating}
                                        </Text>
                                        <Flex dir='row' mt='5px'>
                                        <Image boxSize='17px' src={star} />
                                        <Text fontSize='xs' fontWeight='bold'>{item?.score}/10.0 ({item?.scored_by})</Text>
                                        </Flex>
                                        <Text fontSize='xs' fontWeight='bold'>{item?.type}</Text>


                                    {/* <Button width='100%' variant='solid' borderRadius='10px' bgColor='#286043' color='white' onClick={() => navigate(`/product-detail/${item?.ProductStocks[0]?.id}` )}>
                                        Beli
                                    </Button> */}
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Box>
                    </>
                ))}
                 </Flex>
            </Box>
        </>
    )
}

export default AnimeByGenre;