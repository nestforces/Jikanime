import React, { useEffect } from 'react';
import { Flex, Box, HStack, Text, Select, Spacer, Button } from '@chakra-ui/react';
// import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getColors } from '../../assets/Colors/colors';

const MAX_VISIBLE_PAGES = 3;


export const PaginationControls = ({
  page,
  pageSize,
  selectedPage,
  setPage,
  setPageSize,
  setSelectedPage,
  data,
}) => {

    console.log(data)
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
  
  const getPageNumbers = () => {
    const totalPages = data?.last_visible_page || 0;
    const currentPage = selectedPage;

    let startPage = Math.max(
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
      1,
    );
    let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    if (totalPages - endPage < Math.floor(MAX_VISIBLE_PAGES / 2)) {
      startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
    }

    if (endPage < totalPages) {
      pages.push('...');
    }

    return pages;
  };


  return (
    <>
    <Flex marginTop="10px" flexWrap="wrap" textColor={colors.text}>
              <Box mt="20px">
                <HStack>
                  <Text>Show per Page</Text>
                  <Select
                    border={`solid 1px ${colors.text}`}
                    width="fit-content"
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </Select>
                </HStack>
              </Box>
              <Spacer />
              <Box mt="20px">
                <Button
                  borderRadius="full"
                  backgroundColor={colors.secondary}
                  textColor="white"
                  border={`solid 1px ${colors.secondary}`} 
                  leftIcon={<IoIosArrowBack />}
                  isDisabled={page == 1 ? true : false}
                  onClick={() => {
                    setPage(page - 1);
                    setSelectedPage(selectedPage - 1);
                  }}
                ></Button>
                {getPageNumbers().map((pageNumber, index) => (
                  <Button
                    key={index}
                    ml="2px"
                    mr="2px"
                    borderRadius="full"
                    backgroundColor={
                      selectedPage === pageNumber ? `${colors.secondary}` : `${colors.backgroundcard}`
                    }
                    textColor={
                      selectedPage === pageNumber ? `${colors.background}` : `${colors.secondary}`
                    }
                    border={`solid 1px ${
                      selectedPage === pageNumber ? `${colors.background}` : `${colors.secondary}`
                    }`}
                    onClick={() => {
                      // Handle the case where the button is "..." separately
                      if (pageNumber !== '...') {
                        setPage(pageNumber);
                        setSelectedPage(pageNumber);
                      }
                    }}
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button
                  borderRadius="full"
                  backgroundColor={colors.secondary}
                  textColor="white"
                  border={`solid 1px ${colors.secondary}`} 
                  rightIcon={<IoIosArrowForward />}
                  isDisabled={page == data?.last_visible_page ? true : false}
                  onClick={() => {
                    setSelectedPage(selectedPage + 1);
                    setPage(page + 1);
                  }}
                ></Button>
              </Box>
            </Flex>
    </>
  );
};

