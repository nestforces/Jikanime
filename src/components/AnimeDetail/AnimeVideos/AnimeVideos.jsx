import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { getColors } from "../../../assets/Colors/colors";

import { FaRegCirclePlay } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

const AnimeVideos = ({malId}) => {
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
            // const genreIdsString = genreIds?.join(',');
            
            setTimeout(async () => { // Add async keyword here
                try {
                    const response = await axios.get(
                        `https://api.jikan.moe/v4/anime/${malId}/videos`
                    );
                    console.log(response?.data);
                    setData(response?.data?.data?.promo);
                } catch (err) {
                  console.log(err);
                }
              }, 4000);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(malId) {
            fetchData();
        }
    }, [malId]);


    return (
        <>
            <Box p='10px'>
                <Text fontWeight='bold' mb='5px' fontSize='x-large' textColor={colors.text}>Promo Videos</Text>
        <Flex
        flexDirection='row'
        style={{ msOverflowStyle: 'none' }}
        css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}
        width='100%'
        overflowX='auto'
        gap={5}
      >
                {data?.length > 0 && data?.map((item, index) => (
                    <>
                        <Box key={index}>
                        <Card width='300px' height='200px' textColor={colors?.text} key={item.mal_id} bgSize='cover' bgImage={item?.trailer?.images?.maximum_image_url}
                            >
                                <CardBody
                                width='100%'
                                    _hover={{ bgColor: 'rgba(0, 0, 0, 0.8)' }} cursor='pointer'>
                                <Box position="relative" width="100%" height="100%">
                                    <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                                        <Text fontSize="xxx-large" onClick={() => setSelectedTrailer(item?.trailer?.embed_url)} textColor={colors.primary} cursor="pointer" _hover={{textColor: 'white'}}><FaRegCirclePlay /></Text>
                                    </Box>
                                </Box>
                                    
                                </CardBody>
                            </Card>
                        </Box>
                    </>
                ))}
                 </Flex>
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
            </Box>
        </>
    )
}

export default AnimeVideos;