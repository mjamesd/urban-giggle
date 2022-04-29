import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Auth from '../../utils/auth';

const logout = (event) => {
    event.preventDefault();
    Auth.logout();
};

const rightLink = {
    fontSize: 16,
    fontFamily: "'Fredoka One', cursive !important",
    color: 'brand.main',
    lineHeight: '1',
    ml: '24px!important',
    textDecoration: 'none',
    textTransform: 'uppercase',
};

const headerTitle = {
    fontSize: 42,
    fontFamily: "'Amatic SC', cursive",
    fontWeight: 600,
    color: 'brand.main',
    lineHeight: 1.6,
    letterSpacing: 15,
    textDecoration: 'none',
    textTransform: 'uppercase',
    mt: '-2rem!important'
};

const logoImg = {
    position: 'relative',
    top: '1.5rem',
    width: '5rem',
};

const AppAppBar = () => {
    return [(
        <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }} />
                <Link
                    underline="none"
                    color="inherit"
                    href="/"
                    sx={headerTitle}
                >
                    total&nbsp;<img src="/img/compasslogobutton.png" alt="(logo)" style={logoImg} />&nbsp;quest
                </Link>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {Auth.loggedIn() ? [(
                        <Link
                            color="inherit"
                            variant="h6"
                            href="/dashboard"
                            sx={rightLink}
                        >
                            {'Dashboard'}
                        </Link>
                    ), (
                        <Link
                            color="inherit"
                            variant="h6"
                            onClick={logout}
                            href="/logout"
                            sx={rightLink}
                        >
                            {'Logout'}
                        </Link>
                    )] : [(
                        <Link
                            variant="h6"
                            href="/signup"
                            sx={rightLink}
                        >
                            {'Sign Up'}
                        </Link>
                        ),(
                            <Link
                                color="inherit"
                                variant="h6"
                                href="/login"
                                sx={rightLink}
                            >
                                {'Sign In'}
                            </Link>
                    )]}
                </Box>
            </Toolbar>
        </AppBar>
    ), (
        <Toolbar />
    )];
};

export default AppAppBar;