import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../assets/Colors/colors";
import star from './star-svgrepo-com.svg';


const Upcoming = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.jikan.moe/v4/seasons/upcoming`
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
                        <Card width='230px' height='300px' textColor={colors?.text} key={item.mal_id} bgSize='cover' bgImage={item?.images?.jpg?.large_image_url}
                            // boxShadow='0px 1px 5px gray' 
                            >
                                <CardBody  bgColor='rgba(0, 0, 0, 0.4)'
                                    _hover={{ bgColor: 'rgba(0, 0, 0, 0.8)' }} cursor='pointer'>
                                    <Stack mt='-3' spacing='0'>
                                    <Heading  size="sm" width="180px" css={{ height: '-webkit-min-content', maxHeight: '-webkit-min-content', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                        {item.title}
                                        </Heading>
                                        <Flex dir="row" gap="1" flexWrap="wrap">
                                        <Text fontSize="xs" mt="5px">
                                            {item?.status}
                                        </Text>
                                        <Text fontSize="xs" mt="5px">
                                            {item?.rating}
                                        </Text>
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

export default Upcoming;