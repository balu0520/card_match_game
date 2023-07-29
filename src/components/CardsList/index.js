import './index.css'
import React, { useState, useEffect } from 'react';

const CardsList = () => {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F']; 
    const [cards, setCards] = useState([]);
    const [previousCard, setPreviousCard] = useState(null);

    useEffect(() => {
        const initialCards = cardValues.map((value) => ({
            value,
            isOpen: false,
            isMatched: false,
        }));
        const shuffleCards = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array
        }

        setCards(shuffleCards(initialCards));
    }, []);
    
    const setCardsTimeout = (prev,curr) => {
        const newCards = [...cards]
        setTimeout(() => {
            newCards[prev].isOpen = false;
            newCards[curr].isOpen = false;
            setCards(newCards);
            console.log(cards)
        }, 800);
    }


    const handleCardClick = (index) => {
        if (cards[index].isOpen || cards[index].isMatched) {
            return;
        }
        console.log(previousCard)
        const newCards = [...cards];
        newCards[index].isOpen = true;
        setCards(newCards);
        if (previousCard !== null) {
            const previousIndex = previousCard;
            if (cards[previousIndex].value === cards[index].value) {
                newCards[previousIndex].isMatched = true;
                newCards[index].isMatched = true;
            } else {
                setCardsTimeout(previousIndex,index);
            }
            setPreviousCard(null);
        } else {
            setPreviousCard(index);
        }
    };

    return (
        <div style={{backgroundColor:"#9796f0"}}>
        <div className='container'>
            <div className="card-container">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="card"
                        onClick={() => handleCardClick(index)}
                    >
                        {(card.isMatched && card.isOpen) && (
                            <div className={`container-1 ${card.isMatched ? 'value': ''}`}>{card.isMatched ? card.value : ''}</div>
                        )}
                         {(!card.isMatched && card.isOpen) && (
                            <div className={`container-1 ${card.isOpen ? '': ''}`}>{card.isOpen ? card.value : 'Closed'}</div>
                        )}
                        {(!card.isMatched && !card.isOpen) && (
                            <div className="container-1">{card.isOpen ? '' : 'Closed'}</div>
                        )}

                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default CardsList;
