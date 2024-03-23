import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../assets/Colors/colors";


const LoaderTopAnime = () => {
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

    return (
        <>
            <Box height= {{base: 'fit-content', md: '400px'}} w={'100vw'}>
            <Card height= {{base: '330', md: '400px'}} w={'100vw'} textColor={colors?.text} bgSize='cover' bgColor='#f3f3f3' bgImage='linear-gradient(to right, #f3f3f3 0%, #ecebeb 20%, #f3f3f3 40%, #f3f3f3 100%)'>
                            <CardBody bgColor='rgba(0, 0, 0, 0.4)' _hover={{ bgColor: 'rgba(0, 0, 0, 0.8)' }} cursor='pointer'>
                                <Box
                                    position='absolute'
                                    top='0'
                                    left='0'
                                    width='100%'
                                    height='100%'
                                    animation='shimmer 2s infinite'
                                />
                            </CardBody>
                        </Card>
            </Box>
        </>
    )
}

export default LoaderTopAnime;