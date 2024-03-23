import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { getColors } from "../../assets/Colors/colors";
import googleplay from '../../assets/Footer/googleplay.png';
import appstore from '../../assets/Footer/appstore.png';

const Footer = () => {
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

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(
    //             `https://api.jikan.moe/v4/seasons/upcoming`
    //         );
    //         console.log(response?.data);
    //         setData(response?.data?.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <>
            <Box bottom={0} width='100vw' pt='30px' pb='20px' backgroundColor={colors.backgroundcard}>
                <Box>
                    <Flex flexDirection='column' gap='20px' alignItems='center'>
                        <Flex flexDirection={{base: 'column', md: 'row'}} gap='10px' justifyContent='center' width='70%' borderBottom='solid white 1px' pb='20px'>
                            <Flex flexDirection='row' justifyContent='center' gap='20px' width={{base: '100%', md: '50%'}}>
                                <Text whiteSpace='nowrap' textColor={colors.text} mt='2px' fontSize='large'>
                                    Follow Us
                                </Text>
                                <Text _hover={{color: `${colors.text}`}} color='#1877f2' cursor='pointer'><FaFacebookSquare fontSize='xx-large' /></Text>
                                <Text _hover={{color: `${colors.text}`}} color='#1da1f2' cursor='pointer'><FaTwitterSquare fontSize='xx-large' /></Text>
                                <Text _hover={{color: `${colors.text}`}} color='#ea0c5f' cursor='pointer'><FaInstagramSquare fontSize='xx-large' /></Text>
                                <Text _hover={{color: `${colors.text}`}} color=' #5865f2' cursor='pointer'><FaDiscord fontSize='xx-large' /></Text>
                            </Flex>
                            <Flex gap='10px' fontSize='large' width={{base: '100%', md: '50%'}}>
                                <Text whiteSpace='nowrap' textColor={colors.text}>Get The App</Text>
                                <Image height='30px' src={googleplay} />
                                <Image height='30px' src={appstore} />
                            </Flex>
                        </Flex>
                        {/* <Box borderTop='solid white 1px' height='10px'></Box> */}
                        <Flex pr='10px' pl='10px' textColor={colors.text} flexWrap='wrap' justifyContent='center' gap='20px'>
                            <Link>Home</Link>
                            <Link>About</Link>
                            <Link>Press Room</Link>
                            <Link>Support</Link>
                            <Link>Advertising</Link>
                            <Link>FAQ</Link>
                            <Link>Terms</Link>
                            <Link>Privacy</Link>
                            <Link>Cookie</Link>
                            <Link>Notice at Collection</Link>
                            <Link>Sitemap</Link>
                        </Flex>
                        <Text textColor={colors.text}>Jikanime {new Date().getFullYear()}</Text>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default Footer;