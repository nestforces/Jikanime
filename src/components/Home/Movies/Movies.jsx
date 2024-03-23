import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../../assets/Colors/colors";
import star from './star-svgrepo-com.svg';


const Movies = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
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
                `https://api.jikan.moe/v4/anime?type=movie&min_score=8.5&max_score=10&order_by=score&sort=desc`
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

    return (
        <>
            <Box p='10px'>
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
                        <Box>
                        <Card onClick={() => navigate(`anime-detail/${item?.mal_id}`)} width='230px' height='300px' textColor={'white'} key={item.mal_id} bgSize='cover' bgImage={item?.images?.jpg?.large_image_url}
                            // boxShadow='0px 1px 5px white' 
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

export default Movies;