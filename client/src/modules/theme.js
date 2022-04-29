import { createTheme } from '@mui/material/styles';
import { green, grey, red } from '@mui/material/colors';

const rawTheme = createTheme({
    palette: {
        primary: {
            light: '#69696a',
            main: '#28282a',
            dark: '#1e1e1f',
        },
        secondary: {
            light: '#fff5f8',
            main: '#ff3366',
            dark: '#e62958',
        },
        brand: {
            main: '#fd5238',
        },
        warning: {
            main: '#ffc071',
            dark: '#ffb25e',
        },
        error: {
            light: red[50],
            main: red[500],
            dark: red[700],
        },
        success: {
            light: green[50],
            main: green[500],
            dark: green[700],
        },
    },
    typography: {
        fontFamily: "'Neucha', cursive",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 700,
    },
});

// console.log(rawTheme);

const fontHeader = {
    color: rawTheme.palette.text.primary,
    fontWeight: rawTheme.typography.fontWeightMedium,
    fontFamily: "'Fredoka One', cursive",
    textTransform: 'uppercase',
};

const h2Header = {
    fontFamily: "'Amatic SC',cursive!important",
    fontWeight: rawTheme.typography.fontWeightMedium,
    fontSize: '5rem!important',
    letterSpacing: '0.75rem!important',
};

const h5text = {
    fontFamily: "'Special Elite', cursive!important",
    fontSize: "1.5rem!important",
    fontWeight: rawTheme.typography.fontWeightLight,
    // ...rawTheme.typography.h5,
};

const theme = {
    ...rawTheme,
    palette: {
        ...rawTheme.palette,
        background: {
            ...rawTheme.palette.background,
            default: rawTheme.palette.common.white,
            placeholder: grey[200],
        },
    },
    typography: {
        ...rawTheme.typography,
        fontHeader,
        h1: {
            ...rawTheme.typography.h1,
            ...fontHeader,
            letterSpacing: 0,
            fontSize: 60,
        },
        h2: {
            ...h2Header,
        },
        h3: {
            ...rawTheme.typography.h3,
            ...fontHeader,
            fontSize: 42,
        },
        h4: {
            ...rawTheme.typography.h4,
            ...fontHeader,
            fontSize: 36,
        },
        h5: {
            ...h5text,
        },
        h6: {
            ...rawTheme.typography.h6,
            ...fontHeader,
            fontSize: 18,
        },
        subtitle1: {
            ...rawTheme.typography.subtitle1,
            fontSize: 18,
        },
        body1: {
            ...rawTheme.typography.body2,
            fontWeight: rawTheme.typography.fontWeightRegular,
            fontSize: 16,
        },
        body2: {
            ...rawTheme.typography.body1,
            fontSize: 14,
        },
    },
};

export default theme;
