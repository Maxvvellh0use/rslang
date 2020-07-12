import React from 'react';
import './GamesPage.scss';
import './GameElement/GameElement';
import GAMES from './constants';
import GameElement from './GameElement/GameElement';

const GamesPage = (props) => {

    return (
        <div className='games-page'>
            <h2 className='games-page__heading'>Игры</h2>
            {
                GAMES.map((game, index) => {
                    return (
                        <GameElement
                            className='games-page__game-element'
                            img={game.img}
                            key={game.id}
                            title={game.title}
                            description={game.description}
                        />
                    )
                })
            }
        </div>
    )
}
export default GamesPage;