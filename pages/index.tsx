import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CardItem from '../component/CardItem';
import styles from '../styles/Home.module.css';
import { Card } from '../types/types';
import { cardImages } from '../utils/utils';

const Home: NextPage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card: Card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return { ...card };
          });
        });

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const isFlipped = (card: Card) => {
    return card === choiceOne || card === choiceTwo || card.matched;
  };

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className={styles.cardGrid}>
        {cards.map((card) => {
          return (
            <CardItem
              flipped={isFlipped(card)}
              disabled={disabled}
              handleChoice={handleChoice}
              card={card}
              key={card.id}
            />
          );
        })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default Home;
