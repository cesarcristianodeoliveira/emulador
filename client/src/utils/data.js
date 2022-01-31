import arcade from '../assets/img/arcade.png'
import atari2600Img from '../assets/img/atari2600.png'
import gbImg from '../assets/img/gb.png'
import gbcImg from '../assets/img/gbc.png'
import n64Img from '../assets/img/n64.png'
import ngpImg from '../assets/img/ngp.png'
import nesImg from '../assets/img/nes.png'
import psxImg from '../assets/img/psx.png'
import segaMDImg from '../assets/img/segaMD.png'
import snesImg from '../assets/img/snes.png'

export const categories = [
    {
        name: 'arcade',
        fullName: 'Arcade',
        image: arcade,
    },
    {
        name: 'atari2600',
        fullName: 'Atari 2600',
        image: atari2600Img,
    },
    {
        name: 'gb',
        fullName: 'Game Boy',
        image: gbImg,
    },
    {
        name: 'gbc',
        fullName: 'Game Boy Color',
        image: gbcImg,
    },
    {
        name: 'n64',
        fullName: 'Nintendo 64',
        image: n64Img,
    },
    {
        name: 'ngp',
        fullName: 'Neo Geo Pocket',
        image: ngpImg,
    },
    {
        name: 'nes',
        fullName: 'Nintendo',
        image: nesImg,
    },
    {
        name: 'psx',
        fullName: 'PlayStation',
        image: psxImg,
    },
    {
        name: 'segaMD',
        fullName: 'Mega Drive',
        image: segaMDImg,
    },
    {
        name: 'snes',
        fullName: 'Super Nintendo',
        image: snesImg,
    },
];

export const systems = [
    {
        name: 'arcade',
        fullName: 'Arcade',
    },
    {
        name: 'atari2600',
        fullName: 'Atari 2600',
    },
    {
        name: 'gb',
        fullName: 'Game Boy',
    },
    {
        name: 'gbc',
        fullName: 'Game Boy Color',
    },
    {
        name: 'n64',
        fullName: 'Nintendo 64',
    },
    {
        name: 'ngp',
        fullName: 'Neo Geo Pocket',
    },
    {
        name: 'nes',
        fullName: 'Nintendo',
    },
    {
        name: 'psx',
        fullName: 'PlayStation',
    },
    {
        name: 'segaMD',
        fullName: 'Mega Drive',
    },
    {
        name: 'snes',
        fullName: 'Super Nintendo',
    },
]

export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`
    
    return query
}

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "game" && title match '${searchTerm}*' || category match '${searchTerm}*' || content match '${searchTerm}*'] {
        title, 
        content,
        category,
        system,
        image {
            asset -> {
                url
            },
        },
        _id,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`

    return query
}

export const searchCategoryQuery = (searchTerm) => {
    const query = `*[_type == "game" && category match '${searchTerm}*'] {
        title, 
        content,
        category,
        system,
        image {
            asset -> {
                url
            },
        },
        _id,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`

    return query
}

export const feedQuery = `*[_type == 'game'] | order(_createdAt desc) {
    title,
    content,
    category,
    image {
        asset -> {
            url
        },
    },
    _id,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`

export const gameDetailQuery = (gameId) => {
    const query = `*[_type == "game" && _id == '${gameId}'] {
            image {
                asset-> {
                    url
                }
            },
            _id,
            title, 
            content,
            category,
            system,
            rom {
                asset-> {
                    url
                }
            },
            postedBy->{
                _id,
                userName,
                image
            },
            save[] {
                postedBy-> {
                _id,
                userName,
                image
            },
        },
        comments[] {
            comment,
            _key,
            postedBy-> {
                _id,
                userName,
                image
            },
        }
    }`;
    return query;
}

export const gameDetailMoreGameQuery = (game) => {
    const query = `*[_type == "game" && category == '${game.category}' && _id != '${game._id}' ] {
        title, 
        content,
        category,
        system,
        image {
        asset-> {
            url
            }
        },
        _id,
        postedBy-> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy-> {
                _id,
                userName,
                image
            },
        },
    }`;
    return query;
};

export const userCreatedGamesQuery = (userId) => {
    const query = `*[ _type == 'game' && userId == '${userId}'] | order(_createdAt desc) {
        title, 
        content,
        category,
        system,
        image {
        asset-> {
            url
            }
        },
        _id,
        postedBy->{
            _id,
            userName,
            image
        },
        save[] {
            postedBy-> {
                _id,
                userName,
                image
            },
        },
    }`;
    return query;
};

export const userSavedGamesQuery = (userId) => {
    const query = `*[_type == 'game' && '${userId}' in save[].userId ] | order(_createdAt desc) {
            title, 
            content,
            category,
            system,
            image {
                asset-> {
                    url
                }
            },
            _id,
            postedBy-> {
                _id,
                userName,
                image
            },
            save[] {
                postedBy-> {
                _id,
                userName,
                image
            },
        },
    }`;
    return query;
};