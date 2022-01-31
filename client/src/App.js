import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';

import { Login, Home, AdUrl } from './components';
import { fetchUser } from './utils/fetchUser';

// 3:45

const App = () => {

    const [darkMode, setDarkMode] = useState('light')    
    const handleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'light' : 'dark',
            primary: {
                main: red[700]
            }
        }
    })

    const navigate = useNavigate()

    useEffect(() => {
        const user = fetchUser()

        if(!user) navigate('/login')
    }, [navigate])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='/*' element={<Home darkMode={darkMode} handleDarkMode={handleDarkMode} />} />
                <Route path='ad-url' element={<AdUrl />} />
            </Routes>
        </ThemeProvider>
    )
};

export default App;
