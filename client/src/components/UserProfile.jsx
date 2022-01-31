import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Container, Button } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import { userCreatedGamesQuery, userQuery, userSavedGamesQuery } from '../utils/data'
import { client } from '../client'

import GamesLayout from './GamesLayout'
import Loading from './Loading'

const activeBtnStyles = 'contained'
const notActiveBtnStyles = 'text'

const UserProfile = ({ darkMode }) => {

    const [user, setUser] = useState(null)
    const [games, setGames] = useState(null)
    const [text, setText] = useState('Jogos')
    const [activeBtn, setActiveBtn] = useState('jogos')

    const { userId } = useParams()

    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query)
        .then((data) => {
            setUser(data[0])
        })
    }, [userId])

    useEffect(() => {
        if(text === 'Jogos') {
            const createdGamesQuery = userCreatedGamesQuery(userId)
            
            client.fetch(createdGamesQuery)
            .then((data) => {
                setGames(data)
            })
        } else {
            const savedGamesQuery = userSavedGamesQuery(userId)
            
            client.fetch(savedGamesQuery)
            .then((data) => {
                setGames(data)
            })
        }
    }, [text, userId])

    if(!user) {
        return <Loading message='Carregando perfil' />
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: { xs: '250px', md: '350px' },
                    backgroundImage: 'url(https://source.unsplash.com/random?videogames)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mt: 8
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-64px' }}>
                <Avatar alt={user.userName} src={user.image} component={Link} to={`/user-profile/${user._id}`} sx={{ width: 128, height: 128, border: 4, borderColor: 'white' }} />
                <Typography variant='h4' color='inherit' component={Link} to={`/user-profile/${user._id}`} sx={{ textDecoration: 'none', mt: 1 }} gutterBottom>
                    {user.userName}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <Button
                        onClick={(e) => {
                            setText(e.target.textContent)
                            setActiveBtn('jogos')
                        }}
                        variant={`${activeBtn === 'jogos' ? activeBtnStyles : notActiveBtnStyles}`}
                        disableElevation
                    >
                        Jogos
                    </Button>
                    <Button
                        onClick={(e) => {
                            setText(e.target.textContent)
                            setActiveBtn('saved')
                        }}
                        variant={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                        disableElevation
                        sx={{ ml: 1 }}
                    >
                        Favoritos
                    </Button>
                </Box>
                {games?.length ? (
                    <Container maxWidth='false' disableGutters sx={{ mb: 2 }}><GamesLayout games={games} /></Container>
                ) : (
                    <Typography variant='subtitle2' align='center' sx={{ mt: 2 }}>Nenhum jogo encontrado.</Typography>
                )}
            </Box>
        </>
    )
};

export default UserProfile;
