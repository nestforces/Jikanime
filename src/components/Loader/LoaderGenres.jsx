import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../assets/Colors/colors";


const LoaderGenres = () => {
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
            <Box p='10px'>
        <Flex
        flexDirection='row'
        style={{ msOverflowStyle: 'none' }}
        css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }}
        width='100%'
        overflowX='auto'
        gap={5}
      >
                {Array.from({ length: 5 }, (_, index) => (
                    
                    <>
                    <Box bgColor={colors.secondary} width='30px' height='10px' bgSize='cover' bgColor='#f3f3f3' bgImage='linear-gradient(to right, #f3f3f3 0%, #ecebeb 20%, #f3f3f3 40%, #f3f3f3 100%)' borderRadius='10px' key={index}>
                    </Box>
                    </>
                ))}
                 </Flex>
            </Box>
        </>
    )
}

export default LoaderGenres;