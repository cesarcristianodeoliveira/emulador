import React, { useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { feedQuery, searchCategoryQuery } from '../utils/data';
import { client } from '../client';
import Loading from './Loading';
import GamesLayout from './GamesLayout';

const Feed = ({ darkMode }) => {
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState(null)
    const { categoryId } = useParams()
    useEffect(() => {
        if (categoryId) {
          setLoading(true);
          const query = searchCategoryQuery(categoryId);
          client.fetch(query).then((data) => {
            setGames(data);
            setLoading(false);
          });
        } else {
          setLoading(true);
    
          client.fetch(feedQuery).then((data) => {
            setGames(data);
            setLoading(false);
          });
        }
      }, [categoryId]);
      const ideaName = categoryId || 'novos';
      if (loading) {
        return (
          <Loading message={`Carregando jogos ${ideaName}`} />
        );
      } else if (!games?.length) {
          return (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}><Typography variant='subtitle2'>Nenhum jogo no momento.</Typography></Box>
          )
      }

    return (
        games && (<Box  sx={{ pt: 8, pb: 2 }}><GamesLayout darkMode={darkMode} games={games} /></Box>)
    )
};

export default Feed;
