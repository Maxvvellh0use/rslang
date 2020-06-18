import React from 'react';
import './Card.scss';

function Card() {
    return (
        <section className="card_word__section">
            <div className="wrapper card_wrapper">
                <div className="card_word">
                    <div className="card_word__main">
                        <div className="card_word__main__sentence">
                            <p><input type="text"/></p>
                        </div>
                        <div className="card_word__main__sentence_translation">
                            <p>sentence_translation</p>
                        </div>
                        <div className="card_word__main__description"></div>
                    </div>
                </div>
                <div className="card_word__main__word_translation">
                    <p>word_translation</p>
                </div>
            </div>
        </section>
    );
}

export default Card;
