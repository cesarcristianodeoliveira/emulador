import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText, Grid, TextField, Button } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Helmet from 'react-helmet'
import { client } from '../client';
import GamesLayout from './GamesLayout';
import { gameDetailMoreGameQuery, gameDetailQuery } from '../utils/data'
import Loading from './Loading';

const GameDetail = ({ user }) => {

    const [games, setGames] = useState(null)
    const [gameDetail, setGameDetail] = useState(null)
    const [comment, setComment] = useState('')
    const [addingComment, setAddingComment] = useState(false)
    const { gameId } = useParams()

    const addComment = () => {
        if(comment) {
            setAddingComment(true)

            client.patch(gameId)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [{ 
                comment, 
                _key: uuidv4(), 
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id
                }
            }])
            .commit()
            .then(() => { 
                fetchGameDetails();
                setComment('')
                setAddingComment(false)
            })
        }
    }

    const fetchGameDetails = () => {
        let query = gameDetailQuery(gameId)

        if(query) {
            client.fetch(query)
            .then((data) => {
                setGameDetail(data[0])

                if(data[0]) {
                    query = gameDetailMoreGameQuery(data[0])

                    client.fetch(query)
                    .then((res) => setGames(res))
                }
            })
        }
    }

    useEffect(() => {
        fetchGameDetails()
    }, [gameId])

    if(!gameDetail) return <Loading message='Carregando jogo' />

    return (
        <>

            <Helmet>
                <script type="text/javascript">
                    {`
                        EJS_color = '#d32f2f';
                        EJS_player = '#game';
                        EJS_AdUrl = "/ad-url";
                        EJS_core = "${gameDetail.system}"
                        EJS_gameUrl = "${gameDetail.rom.asset.url}";
                        EJS_pathtodata = '/data/';
                    `}
                </script>
                <script src="/data/loader.js"></script>
            </Helmet>

            <Grid container sx={{ height: '100%', pt: 8 }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ width: '100%', height: { xs: '350px', md: '100%' } }}><div id='game' /></Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Box
                        sx={{
                            mb: 2,
                            mx: {xs: 2, md: 4},
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            pt: 2
                        }}
                    >
                        <Typography variant='h4' color='inherit' textAlign='center' component={Link} to={`/game-detail/${gameDetail?._id}`} sx={{ textDecoration: 'none', mt: 1 }}>
                            {gameDetail.title}
                        </Typography>
                        <Typography variant='subtitle2' color='text.secondary'>{gameDetail.category}</Typography>
                        <Typography variant="body2" color="text.secondary" textAlign='center' sx={{ mt: 2 }}>
                            {gameDetail.content}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mx: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant='h6' gutterBottom>Comentários</Typography>

                        <Grid container spacing={2}>
                            <Grid item>
                                <Link to={`/user-profile/${gameDetail?.postedBy._id}`}>
                                    <Avatar src={gameDetail?.postedBy.image} />
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant='standard'
                                    placeholder="Escreva um comentário..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Box display='flex' alignItems='end' justifyContent='end' sx={{ mt: 1, mb: 2 }}>
                            <Button
                                variant='contained'
                                onClick={addComment}
                                disableElevation
                            >
                                {addingComment ? 'Publicando...' : 'Comentar'}
                            </Button>
                        </Box>
                        <Box display='flex' flexDirection='column'>
                            <List disablePadding>
                                {gameDetail?.comments?.map((comment, i) => (
                                    <ListItem key={i} alignItems="flex-start" disablePadding sx={{ mb: 2 }}>
                                        <ListItemAvatar>
                                            <Avatar alt={comment.postedBy.userName} src={comment.postedBy.image} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography variant='subtitle2'>{comment.postedBy.userName}</Typography>}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {comment.comment}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>

                </Grid>
            </Grid>
            
            {games?.length > 0 && (
                <>
                    <Divider />
                    <Container maxWidth='md' sx={{ mt: 2 }}>
                        <Typography variant='h6' align='center' gutterBottom>Relacionados</Typography>
                    </Container>
                    <Container maxWidth='false' disableGutters sx={{ pb: 4 }}><GamesLayout games={games} /></Container>
                </>
            )}
            {!games && (
                <Loading message='Carregando mais jogos' />
            )}
            
        </>
    )
};

export default GameDetail;
