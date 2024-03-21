import { Box, Flex, Text, Image, VStack, Spacer, InputGroup, Input, InputRightElement, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { colors } from "../../assets/Colors/colors";
import Footer from "../../components/Footer/Footer";
import { PaginationControls } from "../../components/PaginationControls/PaginationControls";
import star from './star-svgrepo-com.svg';

const AnimeSearchPage = ({dataKey}) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(dataKey);
    const [page, setPage] = useState();
    const [pageSize, setPageSize] = useState()
    const [selectedPage, setSelectedPage] = useState(page);
    const [data1, setData1] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.jikan.moe/v4/anime?q=${keyword}&page=${page}&limit=${pageSize}`
            );
            console.log(response?.data);
            setData(response?.data?.data);
            setData1(response?.data?.pagination);
        } catch (err) {
            console.log(err);
        }
    }

    
  useEffect(() => {
    setSearchParams({ page, pageSize, keyword, });
  }, [page, pageSize, keyword, ]);
  

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
            <Box position='fixed' top={-1} zIndex={99} bg='black' width='full'>
                <Flex p='10px' ml='20px' flexDirection='row' bg='transparent'>
                    <Text marginTop={{base: '5px', md: '0px'}} marginBottom='auto' css={{ textShadow: ` -1px -1px 0 #fff,   1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff ` }} fontWeight='bold' fontFamily='fantasy' bg='transparent' fontSize={{base: 'x-large', md: 'xx-large',}} textColor={colors.primary}>JIKANIME</Text>
                    <Spacer />
                    <Box width={{base: '40%', md: '30%'}} marginRight='10px'>
                        <InputGroup><Input placeholder='Search amazing anime here...' marginTop='10px' marginBottom='auto' height='30px' border='none' bgColor='white' width='100%' value={keyword} onChange={(e) => {setKeyword(e.target.value);}} /><InputRightElement 
                            backgroundColor={'#0049CB'} marginTop='10px' marginBottom='auto' height='30px'
                            pointerEvents={''} cursor='pointer' borderRightRadius='5px' onClick={() => fetchData()} >
                                <FaSearch color='white'/>
                            </InputRightElement></InputGroup>
                    </Box>
                </Flex>
            </Box>
        
      <Box p='30px' width='100%' >
                {data?.length > 0 ? 
                <><Text mt='70px' textColor={colors.text}>Result for "{keyword}", total {data1?.items?.total} items</Text>
                <Grid
                mt='70px'
                templateColumns='repeat(auto-fill, minmax(230px, 1fr))'
                // w={'fit-content'}
                gap={5}
            >
                {data?.map((item, index) => (
                    <>
                        <Card onClick={(event) => { event.preventDefault(); navigate(`/anime-detail/${item?.mal_id}`); window.location.reload()}} width='auto' height='300px' textColor={colors?.text} key={item.mal_id} bgSize='cover' bgImage={item?.images?.jpg?.large_image_url}
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

export default AnimeSearchPage;