import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
            <Box width='100vw'>
                <Box>
                    <Flex>
                        <Flex>
                            Follow us
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default Footer;