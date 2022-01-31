import React from 'react';
import { List, ListItem, ListItemIcon, Avatar, ListItemText, Divider } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

import arcade from '../assets/img/arcade.png'
import atari2600Img from '../assets/img/atari2600.png'
import gbImg from '../assets/img/gb.png'
import gbcImg from '../assets/img/gbc.png'
import segaMDImg from '../assets/img/segaMD.png'
import n64Img from '../assets/img/n64.png'
import ngpImg from '../assets/img/ngp.png'
import nesImg from '../assets/img/nes.png'
import snesImg from '../assets/img/snes.png'
import psxImg from '../assets/img/psx.png'

const categories = [
    { name: 'Arcade', slug: 'arcade', image: arcade },
    { name: 'Atari 2600', slug: 'atari2600', image: atari2600Img },
    { name: 'Game Boy', slug: 'gb', image: gbImg },
    { name: 'Game Boy Color', slug: 'gbc', image: gbcImg },
    { name: 'Mega Drive', slug: 'segamd', image: segaMDImg },
    { name: 'Neo Geo Pocket', slug: 'ngp', image: ngpImg },
    { name: 'Nintendo', slug: 'nes', image: nesImg },
    { name: 'Nintendo 64', slug: 'n64', image: n64Img },
    { name: 'Playstation', slug: 'psx', image: psxImg },
    { name: 'Super Nintendo', slug: 'snes', image: snesImg },
]

const Sidebar = ({ handleSidebar }) => {
    return (
        <>
            <List>
                <ListItem button component={Link} to='/' onClick={handleSidebar}>
                    <ListItemIcon>
                        <HomeIcon sx={{ width: 32, height: 32 }} />
                    </ListItemIcon>
                    <ListItemText primary='Início' />
                </ListItem>
            </List>
            <Divider />
            <List>
                {categories.map((category) => (
                    <ListItem key={category.name} button component={Link} to={`/category/${category.name}`} onClick={handleSidebar}>
                        <ListItemIcon>
                            <Avatar src={category.image} alt={category.name} sx={{ width: 32, height: 32 }} />
                        </ListItemIcon>
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
        </>
    )
};

export default Sidebar;
