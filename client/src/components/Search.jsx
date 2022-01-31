import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import GamesLayout from './GamesLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data'

import Loading from './Loading';

const Search = ({ searchTerm }) => {

    const [games, setGames] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(searchTerm) {
            setLoading(true)
            const query = searchQuery(searchTerm.toLowerCase())

            client.fetch(query)
            .then((data) => {
                setGames(data)
                setLoading(false)
            })
        } else {
            client.fetch(feedQuery)
            .then((data) => {
                setGames(data)
                setLoading(false)
            })
        }
    }, [searchTerm])

    return (
        <Box sx={{ pt: 8 }}>
            {loading && <Loading message="Procurando jogos" />}
            {games?.length !== 0 && <GamesLayout games={games} />}
            {games?.length === 0 && searchTerm !== '' && !loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}><Typography variant='subtitle2'>Nenhum jogo no momento.</Typography></Box>
            )}
        </Box>
    )
};

export default Search;
