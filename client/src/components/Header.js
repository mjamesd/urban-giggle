import * as React from 'react';
import { Link, useLocation } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Auth from '../utils/auth';

const styles = {
    background: {
        backgroundColor: 'white',
    },
    title: {
        textDecoration: 'none',
        color: '#fd5238',
    },
    links: {
        textDecoration: 'none',
        color: '#fd5238',
        padding: 2,
    },
    dropdownLinks: {
        textDecoration: 'none',
        // color: '#fd5238',
        padding: 5,
        flexWrap: 'wrap',
        color: '#0b3954'
    },
    dropdown: {
        flexWrap: 'wrap',
    }
}

const Header = () => {
    // control who can view the admin panel
    const location = useLocation();
    const organizerPaths = [
        '/admin/hunts/add',
        '/admin/huntItems/add',
        '/admin/hunts/view/',
        '/admin/huntItems/view/'
    ];

    React.useEffect(() => {
        if (location.pathname.substring(0,6) === '/admin') {
            if (!Auth.loggedIn()) {
                alert('You must be logged in to view this page.');
                window.location.replace('/');
            }
            if (Auth.getProfile().data.userType !== 'admin') {
                if (Auth.getProfile().data.userType === 'organizer'
                        && !organizerPaths.includes(location.pathname)
                        && location.pathname.substring(0,organizerPaths[2].length) !== organizerPaths[2]
                        && location.pathname.substring(0,organizerPaths[3].length) !== organizerPaths[3]) {
                    alert('You must be an administrator to view this page.');
                    window.location.replace('/');
                }

            }
        }
    });

    // states for menu opened/closed
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorEl);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar className='header' elevation={0} position="static">
            <Container maxWidth="xl" style={styles.background}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, flexGrow: 8, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Link style={styles.title} to="/"><h2>TOTAL QUEST</h2></Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link style={styles.title} to="/"><h2>TOTAL QUEST</h2></Link>
                    </Typography>

                    {Auth.loggedIn() && Auth.getProfile().data.userType === 'admin' && (
                        <Button><Link style={styles.links} to="/admin"><h2>ADMIN PANEL</h2></Link></Button>
                    )}
                    {Auth.loggedIn() && Auth.getProfile().data.userType === 'organizer' && (
                        <>
                            <Button><Link style={styles.links} to="/admin/hunts/add"><h2>CREATE SCAVENGER HUNT</h2></Link></Button>
                            <Button><Link style={styles.links} to="/admin/huntItems/add"><h2>CREATE SCAVENGER HUNT LOCATIONS</h2></Link></Button>
                        </>
                    )}
                    {Auth.loggedIn() ? (
                        <Button onClick={logout}><Link style={styles.links} to="/"><h2>LOGOUT</h2></Link></Button>
                    ) : (
                        <>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link style={styles.links} to="/login"><p>LOGIN</p></Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link style={styles.links} to="/signup"><p>SIGNUP</p></Link>
                            </MenuItem>
                        </>
                    )}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link style={styles.dropdownLinks} to="/profile">PROFILE</Link>
                            </MenuItem>
                            <br />
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link style={styles.dropdownLinks} to="/dashboard">DASHBOARD</Link>
                            </MenuItem>
                        </Menu>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;