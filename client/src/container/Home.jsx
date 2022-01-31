import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { fetchUser } from '../utils/fetchUser';
import { SwipeableDrawer } from '@mui/material'
import { userQuery } from '../utils/data';
import { client } from '../client'
import { Link, Route, Routes } from 'react-router-dom';
import { Navbar, Sidebar, UserProfile } from '../components'
import Games from './Games';

const Home = ({ darkMode, handleDarkMode }) => {
    
    const [sidebar, setSidebar] = useState(false);
    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    const [user, setUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const scrollRef = useRef(null)
    const userInfo = fetchUser()

    useEffect(() => {
        const query = userQuery(userInfo?.googleId)
        client.fetch(query)
        .then((data) => {
            setUser(data[0])
        })
    }, [])

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])


    return (
        <>
            <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode} user={user && user} handleSidebar={handleSidebar} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Box ref={scrollRef}>
                <Routes>
                    <Route path='/user-profile/:userId' element={<UserProfile darkMode={darkMode} />} />
                    <Route path='/*' element={<Games darkMode={darkMode} user={user && user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                </Routes>
            </Box>
            <React.Fragment key='left'>
                <SwipeableDrawer
                    anchor={'left'}
                    open={sidebar}
                    onOpen={handleSidebar}
                    onClose={handleSidebar}
                >
                    <Box sx={{ width: '240px' }}>
                        <AppBar position='relative' color='transparent' elevation={0}>
                            <Toolbar sx={{ minHeight: '64px!important' }}>
                                <IconButton onClick={handleSidebar} color='inherit' edge='start' sx={{ mr: 2 }}>
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant='h6' color='primary' component={Link} to='/' sx={{ textDecoration: 'none' }} onClick={handleSidebar}>Emulador</Typography>
                            </Toolbar>
                        </AppBar>
                        <Sidebar user={user && user} handleSidebar={handleSidebar} />
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>

        </>
    )
};

export default Home;
