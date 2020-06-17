import React from 'react';
import './Card.css';

function Card() {
    return (
        <div className="card_word">
            <div className="card_word__wrapper">
                <section className="card_word__section">
                    <div className="card_word__main_block">
                        <div className="card_word__main__sentence">
                            <p>sentence</p>
                        </div>
                        <div className="card_word__main__sentence_translation">
                            <p>sentence_translation</p>
                        </div>
                        <div className="card_word__main__word_translation">
                            <p>word_translation</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Card;
