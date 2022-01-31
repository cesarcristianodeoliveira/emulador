import React from 'react';
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import video from '../assets/video/video.mp4'
import GoogleLogin from 'react-google-login'
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const navigate = useNavigate()
    const responseGoogle = (response) => {

        localStorage.setItem('user', JSON.stringify(response.profileObj))

        const { email, googleId, imageUrl, name } = response.profileObj

        const doc = {
            email: email,
            _id: googleId,
            _type: 'user',
            image: imageUrl,
            userName: name,
        }

        client.createIfNotExists(doc)
        .then(() => {
            navigate('/', { replace: true })
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ position: 'relative', width: '100%', height: '100%', overFlow: 'hidden' }}>
                <video
                    src={video}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
            <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0 }} style={{ boxShadow: 'inset 0 0 5rem rgb(0 0 0 / 50%)' }}>
                <Typography variant='h3' align='center' gutterBottom sx={{ color: 'white' }} style={{ textShadow: '0 0.05rem 0.1rem rgb(0 0 0 / 50%)' }}>Emulador</Typography>
                <GoogleLogin 
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps) => (
                        <Button 
                            size='large'
                            variant='contained' 
                            startIcon={<GoogleIcon />}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            Jogar com o Google
                        </Button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy='single_host_origin'
                />
            </Box>
        </Box>
    )
};

export default Login;
