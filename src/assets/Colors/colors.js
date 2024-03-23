export const getColors = () => {
    const colorMode = localStorage?.getItem('colorMode');

    const updateColors = () => {
        return {
            primary: "#0914E5",
            secondary: "#1e81b0",
            third: "#154c79",
            darker: "#154c79",
            background: colorMode === 'light' ? "#e5e1da" : "#000000",
            text: colorMode === 'light' ? "#000000" : "#ffffff",
            textsecondary: colorMode === 'light' ? "#777777" : '#5d757f',
            backgroundcard: colorMode === 'light' ? '#a9a9a9' : "#222222",
        };
    };

    // Update colors whenever colorMode changes
    window.addEventListener('storage', () => {
        const updatedColorMode = localStorage.getItem('colorMode');
        if (updatedColorMode !== colorMode) {
            // Update colorMode and recalculate colors
            colorMode = updatedColorMode;
            updateColors();
        }
    });

    return updateColors();
};


//   primary: "#0914E5",
//     secondary: "#1e81b0",
//     third: "#154c79",
//     darker: "#154c79",
//     background: "#e5e1da",
//     text: "#000000",
//     textsecondary: '#222222',
//     backgroundcard: "#a9a9a9",

//     // primary: "#0914E5",
//     // secondary: "#1e81b0",
//     // third: "#154c79",
//     // darker: "#154c79",
//     // background: "#000000",
//     // text: "#ffffff",
//     // textsecondary: '#5d757f',
//     // backgroundcard: "#222222",
//     // Add more colors as needed
//   };