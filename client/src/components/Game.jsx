import React from 'react';
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardActionArea, CardContent, Typography, CardActions, Box } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchUser } from '../utils/fetchUser';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { client, urlFor } from '../client';

import arcadeImg from '../assets/img/arcade.png'
import atari2600Img from '../assets/img/atari2600.png'
import gbImg from '../assets/img/gb.png'
import gbcImg from '../assets/img/gbc.png'
import n64Img from '../assets/img/n64.png'
import ngpImg from '../assets/img/ngp.png'
import nesImg from '../assets/img/nes.png'
import psxImg from '../assets/img/psx.png'
import segaMDImg from '../assets/img/segaMD.png'
import snesImg from '../assets/img/snes.png'

const Game = ({ game: {  _id, postedBy, title, content, category, image, save } }) => {
    const user = fetchUser()
    const navigate = useNavigate()

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.googleId))?.length
    const saveGame = (id) => {
        if(!alreadySaved) {
            client
            .patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
                _key: uuidv4(),
                userId: user?.googleId,
                postedBy: {
                    _type: 'postedBy',
                    _ref: user?.googleId
                }
            }])
            .commit()
            .then(() => {
                window.location.reload()
            })
        }
    }
    const deleteGame = (id) => {
        client.delete(id)
        .then(() => {
            window.location.reload()
        })
    }
    return (
        <Card>
            {category === 'Arcade' && (
                <CardHeader
                    avatar={<Avatar src={arcadeImg} />}
                    action={
                        postedBy?._id === user?.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Atari 2600' && (
                <CardHeader
                    avatar={<Avatar src={atari2600Img} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Game Boy' && (
                <CardHeader
                    avatar={<Avatar src={gbImg} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Game Boy Color' && (
                <CardHeader
                    avatar={<Avatar src={gbcImg} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Mega Drive' && (
                <CardHeader
                    avatar={<Avatar src={segaMDImg} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Neo Geo Pocket' && (
                <CardHeader
                    avatar={<Avatar src={ngpImg} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Nintendo 64' && (
                <CardHeader
                    avatar={<Avatar src={n64Img} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Nintendo' && (
                <CardHeader
                    avatar={<Avatar src={nesImg} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'PlayStation' && (
                <CardHeader
                    avatar={<Avatar src={psxImg} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            {category === 'Super Nintendo' && (
                <CardHeader
                    avatar={<Avatar src={snesImg} />}
                    action={
                        postedBy?._id === user.googleId && (
                            <IconButton color='primary' onClick={(e) => { e.stopPropagation(); deleteGame(_id) }}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                    title={title}
                    subheader={category}
                />
            )}
            <CardActionArea onClick={() => navigate(`/game-detail/${_id}`)}>
                <CardMedia
                    component="img"
                    image={urlFor(image).width(250).url()}
                    alt="Paella dish"
                    sx={{ height: '256px' }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {truncate(`${content}`, 50)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton onClick={() => navigate(`/game-detail/${_id}`)}>
                    <PlayArrowIcon />
                </IconButton>
                <Box flexGrow={1} />
                {alreadySaved ? (
                    <IconButton color='primary'>
                        <FavoriteIcon />
                    </IconButton>
                ) : (
                    <IconButton color='primary' onClick={(e) => { e.stopPropagation(); saveGame(_id) }}>
                        <FavoriteBorderIcon />
                    </IconButton>
                )}
            </CardActions>
        </Card>
    )
};

export default Game;
