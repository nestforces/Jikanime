import { Box, Flex, Text, Image, VStack, Button, Card, CardBody, Heading, useColorModeValue, Stack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../assets/Colors/colors";


const Loader = () => {

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
                    <Box key={index}>
                        <Card width='230px' height='300px' textColor={colors?.text} bgSize='cover' bgColor='#f3f3f3' bgImage='linear-gradient(to right, #f3f3f3 0%, #ecebeb 20%, #f3f3f3 40%, #f3f3f3 100%)'>
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
                ))}
                 </Flex>
            </Box>
        </>
    )
}

export default Loader;