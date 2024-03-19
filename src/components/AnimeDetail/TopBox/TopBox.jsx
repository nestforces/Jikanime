import { Flex, Image, Heading, Text, Box, useColorModeValue, HStack, VStack, Button} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import {BsFillCalendarWeekFill} from 'react-icons/bs' 
import {AiFillClockCircle,} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import axios from 'axios'
import { colors } from '../../../assets/Colors/colors'
import star from './star-svgrepo-com.svg';
import { FaRegCirclePlay } from "react-icons/fa6";
import { Grid } from 'swiper/modules'
import { Navigate } from 'react-router-dom'

const TopBox = ({data}) => {
    // console.log(data);
    const [selectedTrailer, setSelectedTrailer] = useState("");

    return(
        <Flex position='relative' minHeight='100%' textColor={colors.text} padding={{base: '0px', md: '5%'}} mt={{base: '-5px', md: '-40px', sm: '-5%'}} direction={{base: 'column', md:'row', sm:'column'}}>
            <Box mb={{base: '10px', md: '0px'}} position={{base: 'sticky'}} top={{base: '20px'}} width={{base: '100%', md: '65%', sm:'100%'}}>
            <Box width={{base: '100vw', md: '100%'}}  position='sticky' top={'20px'}>
                <Image  zIndex='1' borderRadius={{base: '0px', md: '10px'}} height={data?.trailer?.images?.maximum_image_url != null ? 'fit-content' : '400px'} objectFit={data?.trailer?.images?.maximum_image_url != null ? 'fill' : 'cover'} width='100%' src={data?.trailer?.images?.maximum_image_url != null ? data?.trailer?.images?.maximum_image_url : data?.images?.jpg?.large_image_url} />
                <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
                    <Text fontSize='xxx-large' onClick={() => setSelectedTrailer(data?.trailer?.embed_url)} textColor={colors.primary} cursor='pointer' _hover={{textColor: `${colors.text}`}}><FaRegCirclePlay /></Text>
                </Box>
                <Box mt='10px' p='10px' boxShadow="0px 1px 5px gray" bg={colors.backgroundcard} borderRadius='10px'>
                    <Text>Streaming : </Text>
                   <Flex gap='10px' flexDirection='row' flexWrap='wrap'>
                   {data?.streaming?.length > 0 && data?.streaming?.map((item, index) => (
                        <Text cursor='pointer' textColor={'aqua'} _hover={{textColor: `${colors.text}`}} onClick={() => window.open(`${item?.url}`, "_blank")}>
                            ● {item?.name}
                        </Text>
                    ))}
                   </Flex>
                </Box>
            </Box>
            </Box>
            <Box width={{md: '35%', sm: '100%', base: '100%'}}>
            <Box role={'group'}
                    p={6}
                    maxW={{md: '330px', sm: '100%'}}
                    w={'full'}
                    // bg={useColorModeValue('white', 'gray.800')}
                    bg={colors.backgroundcard}
                    // boxShadow={'xl'}
                    boxShadow="0px 1px 5px gray"
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}
                    ml={{md:'10%', sm:'0%'}}
                    // mb={{md: '50px', sm:'10px'}}
                    >
                        <Box >
                        <Image
                                        key={data?.images?.jpg?.large_image_url}
                                        src={data?.images?.jpg?.large_image_url}
                                        alt={data?.title}
                                        objectFit='cover'
                                        width='230px'
                                        height='300px'
                                        margin='auto'
                                        borderRadius='10px'
                                        justifySelf='center'
                                        />
                        <Heading as='h4' size='md' mb='5px'>{data?.title}</Heading>
                        <Text>Rank : #{data?.rank}</Text>
                        <Text>{data?.rating}</Text>
                        <Flex flexDirection='row' gap='5px'><Image boxSize='23px' src={star} /><Text>{data?.score}/10.0 ({data?.scored_by})</Text></Flex>
                        <Text>Status : {data?.status}</Text>
                        <Text>Episodes : {data?.episodes}</Text>
                        <Text>Duration : {data?.duration}</Text>
                        <Text>Season: {data?.season}</Text>
                        <Text>Year: {data?.year}</Text>

                        
                        </Box>
                        <hr/>
                        <Box>
                            
                            <Text fontSize='md'>Studio : {data?.studios?.length > 0 && data?.studios.map((item, index) => (<Text>● {item?.name}</Text>))}</Text>
                        </Box>
                    </Box>
            </Box>
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
    )
}

export default TopBox;