import { Box, Flex, Text, Image, VStack, Spacer, InputGroup, Input, InputRightElement, Card, CardBody, Heading, useColorModeValue, Stack, Grid, IconButton } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { FaSearch, FaSun, FaMoon, } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getColors } from "../../assets/Colors/colors";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { PaginationControls } from "../../components/PaginationControls/PaginationControls";
import star from './star-svgrepo-com.svg';

const AnimeLists = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { typeLists } = useParams();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [selectedPage, setSelectedPage] = useState(page);
    const [data1, setData1] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
    const [isTopSection, setIsTopSection] = useState(false);
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

    const fetchData = async () => {
        try {
            if (typeLists == 'recomendations') {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${pageSize}`
                );
                console.log(response?.data);
                setData(response?.data?.data);
                setData1(response?.data?.pagination);
            } else if (typeLists == 'airingnow'){
                const response = await axios.get(
                    `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=${pageSize}`
                );
                console.log(response?.data);
                setData(response?.data?.data);
                setData1(response?.data?.pagination);
            } else if (typeLists == 'upcoming') {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/seasons/upcoming?page=${page}&limit=${pageSize}`
                );
                console.log(response?.data);
                setData(response?.data?.data);
                setData1(response?.data?.pagination);
            } else if (tyepeLists == 'topmovies') {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}&limit=${pageSize}&type=movie&min_score=8.5&max_score=10&order_by=score&sort=desc`
                );
                console.log(response?.data);
                setData(response?.data?.data);
                setData1(response?.data?.pagination);
            } else if (tyepeLists == 'action') {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}&limit=${pageSize}&genres=1&min_score=8&max_score=10&order_by=score&sort=desc`
                );
                console.log(response?.data);
                setData(response?.data?.data);
                setData1(response?.data?.pagination);
            } else if (tyepeLists == 'romance') {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}&limit=${pageSize}&genres=22&min_score=8&max_score=10&order_by=score&sort=desc`
                );
                console.log(response?.data);
                setData(response?.data?.data);
                setData1(response?.data?.pagination);
            } else if (tyepeLists == 'horror') {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}&limit=${pageSize}&genres=14&min_score=7&max_score=10&order_by=score&sort=desc`
                );
                console.log(response?.data);
                setData(response?.data?.data);
                setData1(response?.data?.pagination);
            }
        } catch (err) {
            console.log(err);
        }
    }

    
  useEffect(() => {
    setSearchParams({ page, pageSize, });
  }, [page, pageSize, ]);
  

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    // const productNameFromUrl = searchParams.get('productName') || '';
    // const categoryIdFromUrl = searchParams.get('categoryId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    // setProductName(productNameFromUrl);
    // setCategoryId(categoryIdFromUrl);
    setSelectedPage(pageFromUrl);
  }, []);


    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    return (
        <>
            <Box bgColor={colors.background} maxHeight='fit-content' minH='100vh' width='100vw'>
                
            <Box height='full'>
            <Navbar isTopSection={isTopSection} colorMode2={colorMode} setColorMode2={setColorMode} />
        
      <Box p='30px' width='100%' >
                {data?.length > 0 ? 
                <><Text mt='70px' textColor={colors.text}>Result total {data1?.items?.total} items</Text>
                <Grid
                mt='70px'
                templateColumns={{base: 'repeat(auto-fill, minmax(130px, 1fr))', md: 'repeat(auto-fill, minmax(230px, 1fr))'}}
                // w={'fit-content'}
                gap={5}
            >
                {data?.map((item, index) => (
                    <>
                        <Card onClick={(event) => { event.preventDefault(); navigate(`/anime-detail/${item?.mal_id}`); window.location.reload()}} width='auto' height='300px' textColor={'white'} key={item.mal_id} bgSize='cover' bgPosition='center' bgImage={item?.images?.jpg?.large_image_url}
                            // boxShadow='0px 1px 5px white' 
                            >
                                <CardBody  bgColor='rgba(0, 0, 0, 0.4)'
                                    _hover={{ bgColor: 'rgba(0, 0, 0, 0.8)' }} cursor='pointer'>
                                    <Stack mt='-3' spacing='0'>
                                    <Heading whiteSpace='wrap' size="sm" css={{ height: '-webkit-min-content', maxHeight: '-webkit-min-content', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
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
                    </>
                ))}
             </Grid></> : <Box height='50vh'><Box mt='70px' textAlign='center'><Text fontWeight='bold' fontSize='x-large' textColor={colors.text}>Please enter keyword</Text></Box></Box>
                }
                 </Box>
                 <Box m='5'>{data?.length > 0 ? <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data1}
            /> : null}</Box>
                 <Box bottom={0}>
                 <Footer />
                 </Box>
            </Box>
            </Box>
        </>
    )
}

export default AnimeLists;