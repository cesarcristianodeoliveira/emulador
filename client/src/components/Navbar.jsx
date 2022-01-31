import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles'
import { Box, AppBar, Toolbar, IconButton, Typography, InputBase, Tooltip, Avatar, Menu, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7'
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: '16px'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Navbar = ({ darkMode, handleDarkMode, searchTerm, setSearchTerm, handleSidebar, user }) => {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
    
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
    
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }
    
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{ marginTop: 6 }}
        >
            <List disablePadding>
                <ListItem button component={Link} to={`/user-profile/${user?._id}`} onClick={handleMenuClose}>
                    <ListItemIcon sx={{ minWidth: '28px' }}><PersonIcon /></ListItemIcon>
                    <ListItemText primary='Perfil' />
                </ListItem>

                <GoogleLogout 
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps) => (
                        <ListItem 
                            button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <ListItemText primary='Sair' />
                        </ListItem>
                    )}
                    onLogoutSuccess={logout}
                    cookiePolicy='single_host_origin'
                />

            </List>
        </Menu>
    );
    
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <List disablePadding>
                <ListItem button component={Link} to={`/user-profile/${user?._id}`} onClick={handleMenuClose}>
                <ListItemIcon><Avatar alt={user?.userName} src={user?.image} sx={{ width: 24, height: 24 }} /></ListItemIcon>
                    <ListItemText primary='Perfil' />
                </ListItem>
            
                <Divider sx={{ my: 1 }}  />

                <ListItem button onClick={handleDarkMode}>
                    <ListItemIcon>{darkMode ? <DarkModeIcon /> : <Brightness7Icon />}</ListItemIcon>
                    <ListItemText primary={darkMode ? 'Escuro' : 'Claro'} />
                </ListItem>

                <Divider sx={{ my: 1 }}  />

                <GoogleLogout 
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps) => (
                        <ListItem 
                            button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <ListItemText primary='Sair' />
                        </ListItem>
                    )}
                    onLogoutSuccess={logout}
                    cookiePolicy='single_host_origin'
                />

            </List>
        </Menu>
    );

    if(!user) return null

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" elevation={0}>
                <Toolbar sx={{ minHeight: '64px!important' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' color={darkMode ? 'inherit' : 'primary'} component={Link} to='/' sx={{ textDecoration: 'none', mx: 2 }}>Emulador</Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Pesquisar"
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            onFocus={() => navigate('/search')}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {user?.isAdmin && (
                            <>
                                <Tooltip title='Publicar'>
                                    <IconButton
                                        color='inherit'
                                        LinkComponent={Link}
                                        to='/create-game'
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{ p: 0 }}
                        >
                            <Avatar alt={user?.userName} src={user?.image} />
                        </IconButton>
                        <Tooltip title={darkMode ? 'Escuro' : 'Claro'}>
                            <IconButton edge='end' onClick={handleDarkMode} aria-label="dark mode" color="inherit" sx={{ ml: 2 }}>
                                {darkMode ? <DarkModeIcon /> : <Brightness7Icon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>

    )
};

export default Navbar;
