import React from 'react';
import { Routes, Route } from 'react-router-dom'

import { Feed, GameDetail, CreateGame, Search } from '../components'

const Games = ({ darkMode, user, searchTerm, setSearchTerm }) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Feed darkMode={darkMode} />} />
                <Route path='/category/:categoryId' element={<Feed darkMode={darkMode} />} />
                <Route path='/game-detail/:gameId' element={<GameDetail user={user && user} />} />
                <Route path='/create-game' element={<CreateGame user={user && user} />} />
                <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            </Routes>
        </>
    )
};

export default Games;
