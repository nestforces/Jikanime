import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../../assets/Colors/colors";
import star from './star-svgrepo-com.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

const TopAnime = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [selectedTrailer, setSelectedTrailer] = useState("");
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

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.jikan.moe/v4/top/anime`
            );
            console.log(response?.data);
            setData(response?.data?.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(selectedTrailer);

    return (
        <>
        {data.length > 0 && (
            <Flex height= {{base: 'fit-content', md: '400px'}} w={'100vw'} >
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
                    // height: 'fit-content',
                    width: 'fit-content',
                    // padding: '20px',
                    transition: 'width .2s ease-in-out',
                    }}
                >
                    {data?.map((item, index) => {
                    return (
                        <SwiperSlide
                        key={index}
                        style={{
                            height: {base: 'fit-content', md: '400px'},
                            backgroundImage: `url(${item?.images?.jpg?.large_image_url})`,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            transition: 'width .1s ease-in-out',
                        }}
                        >
                            <Flex gap='10px' padding='20px' height='full' backgroundColor='rgba(0, 0, 0, 0.9)'>
                                <Flex flexDirection='column' textColor={'white'} gap='5px' width='70%' margin='auto'>
                                    <Text css={{ textShadow: ` -1px -1px 0 ${colors.primary},   1px -1px 0 ${colors.primary}, -1px 1px 0 ${colors.primary}, 1px 1px 0 ${colors.primary} ` }} fontWeight='bold' fontSize={{base: 'x-large', md: 'xx-large',}}>{item?.title}</Text>
                                    <Flex dir='row' mt='5px' gap='5px'>
                                        <Image boxSize='23px' src={star} />
                                        <Text fontWeight='bold'>{item?.score}/10.0 ({item?.scored_by})</Text>
                                        </Flex>
                                    <Text>{item.year} | {item.status}</Text>
                                    <Text size="sm" css={{ height: '-webkit-min-content', maxHeight: '-webkit-min-content', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{item?.synopsis}</Text>
                                    <Flex mt='5px' gap ='10px'>
                                        <Button leftIcon={<IoMdInformationCircle />} onClick={() => navigate(`anime-detail/${item?.mal_id}`)} textColor='white' _hover={{textColor: `${colors.primary}`, backgroundColor: 'white'}} backgroundColor={colors.primary}>More Info</Button>
                                        <Button leftIcon={<FaRegCirclePlay />} onClick={() => setSelectedTrailer(item?.trailer?.embed_url)} textColor={colors.primary} _hover={{textColor: `${'white'}`, backgroundColor: `${colors.primary}`}}>Trailer</Button>
                                    </Flex>
                                </Flex>
                                <Box margin='auto' width='30%'>
                                    <Image
                                        key={item?.images?.jpg?.large_image_url}
                                        src={item?.images?.jpg?.large_image_url}
                                        alt={item.title}
                                        objectFit='cover'
                                        width='230px'
                                        height='300px'
                                        borderRadius='10px'
                                        justifySelf='center'
                                        />
                                </Box>
                            </Flex>
                        </SwiperSlide>
                    );
                    })}
                </Swiper>
                {selectedTrailer && (
                        <Flex
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        zIndex="999"
                        >
                        <iframe
                            src={selectedTrailer}
                            allowFullScreen
                            allow='autoplay'
                            width="80%"
                            height="80%"
                            style={{ borderRadius: "10px" }}
                        />
                        <Button
                            position="absolute"
                            top="10px"
                            right="10px"
                            textColor='white' _hover={{textColor: `${colors.primary}`, backgroundColor: 'white'}} backgroundColor={colors.primary}
                            onClick={() => setSelectedTrailer("")}
                        >
                            Close
                        </Button>
                        </Flex>
                )}
            </Flex>
        )}
        </>
    )
}

export default TopAnime;