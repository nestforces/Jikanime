import { Box, Flex, Text, Input, Spacer, InputGroup, InputRightElement, IconButton, useToast } from "@chakra-ui/react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../assets/Colors/colors";

const Navbar = ({ isTopSection, colorMode2, setColorMode2 }) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState(null);
    const [colorMode, setColorMode] = useState(localStorage.getItem("colorMode") || "dark"); // Retrieve colorMode from local storage
    const colors = getColors();
    const toast = useToast();
  
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

    const handleSearch = () => {
        if (keyword) {
            localStorage?.setItem("dataKey", keyword);
            event.preventDefault();
            navigate(`/anime-search`);
        } else {
            // Notify user to fill the input
            toast({
                title: "Please fill the input field",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });}
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const toggleColorMode = () => {
        const newColorMode = colorMode === "light" ? "dark" : "light";
        const newColorMode2 = colorMode2 === "light" ? "dark" : "light";
        setColorMode(newColorMode);
        setColorMode2(newColorMode2);
        localStorage.setItem("colorMode", newColorMode); // Store colorMode in local storage
        // window.scrollTo(0, 0);
    };

    return (
        <>
            <Box position='fixed' top={-1} zIndex={99} bg={isTopSection == true ? "transparent" : `${colors.backgroundcard}`} width='full'>
                <Flex p='10px' ml='20px' flexDirection='row' bg='transparent'>
                    <Text marginTop={{base: '5px', md: '0px'}} marginBottom='auto' css={{ textShadow: ` -1px -1px 0 #fff,   1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff ` }} fontWeight='bold' fontFamily='fantasy' bg='transparent' fontSize={{base: 'x-large', md: 'xx-large',}} textColor={colors.primary}>JIKANIME</Text>
                    <Spacer />
                    {!isTopSection ? <Flex flexDirection='row' width={{base: '60%', md: '30%'}} marginRight='10px'>
                        <InputGroup><Input textColor={'black'} _placeholder={{textColor: 'grey'}} placeholder='Search amazing anime here...' marginTop='10px' marginBottom='auto' height='30px' border='none' bgColor='white' width='100%' value={keyword} onChange={(e) => {setKeyword(e.target.value); }} />
                        <InputRightElement 
                            backgroundColor={'#0049CB'} textColor='black' _placeholder={{textCOlor: 'white'}} marginTop='10px' marginBottom='auto' height='30px'
                            pointerEvents={''} cursor='pointer' borderRightRadius='5px' onClick={() => { handleSearch(); }}  >
                                <FaSearch color='white'/>
                            </InputRightElement></InputGroup>
                            <IconButton
                                height='30px'
                                mt='10px'
                                aria-label="Toggle Dark Mode"
                                icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                                onClick={toggleColorMode}
                                textColor={colorMode === "light" ? 'black' : 'white'}
                                _hover={{bgColor: colorMode === "light" ? 'black' : 'white', textColor: colorMode === "light" ? 'white' : 'black'}}
                                variant="ghost"
                            />
                    </Flex> : null}
                </Flex>
            </Box>
        </>
    )
}

export default Navbar;
