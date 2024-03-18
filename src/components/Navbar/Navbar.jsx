import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../assets/Colors/colors";


const Navbar = ({isTopSection}) => {
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
            <Box position='fixed' top={-1} zIndex={99} bg={isTopSection == true ? "transparent" : "black"} width='full'>
                <Flex p='10px' ml='20px' flexDirection='row' bg='transparent'>
                    <Text css={{ textShadow: ` -1px -1px 0 #fff,   1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff ` }} fontWeight='bold' fontFamily='fantasy' bg='transparent' fontSize={{base: 'x-large', md: 'xx-large',}} textColor={colors.primary}>JIKANIME</Text>
                </Flex>
            </Box>
        </>
    )
}

export default Navbar;