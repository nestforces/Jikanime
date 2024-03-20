import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../assets/Colors/colors";


const Footer = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

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
            <Box width='100vw' pt='30px' pb='20px' backgroundColor={colors.backgroundcard}>
                <Box>
                    <Flex flexDirection='column' gap='20px' alignItems='center'>
                        <Flex flexDirection='row' justifyContent='center' gap='20px' width='70%' borderBottom='solid white 1px' pb='20px'>
                            <Text textColor={colors.text} fontSize='larger'>
                                Follow Us
                            </Text>
                            <Text _hover={{color: `${colors.text}`}} color='#1877f2' cursor='pointer'><FaFacebookSquare fontSize='xx-large' /></Text>
                            <Text _hover={{color: `${colors.text}`}} color='#1da1f2' cursor='pointer'><FaTwitterSquare fontSize='xx-large' /></Text>
                            <Text _hover={{color: `${colors.text}`}} color='#ea0c5f' cursor='pointer'><FaInstagramSquare fontSize='xx-large' /></Text>
                            <Text _hover={{color: `${colors.text}`}} color=' #5865f2' cursor='pointer'><FaDiscord fontSize='xx-large' /></Text>
                        </Flex>
                        {/* <Box borderTop='solid white 1px' height='10px'></Box> */}
                        <Flex textColor={colors.text} flexWrap='wrap' justifyContent='center' gap='20px'>
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
                        <Text textColor={colors.textsecondary}>Jikanime 2024</Text>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default Footer;