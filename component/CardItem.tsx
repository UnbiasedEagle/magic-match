import Image from 'next/image';
import React from 'react';
import { Card } from '../types/types';
import styles from './CardItem.module.css';

type CardItemProps = {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
};

const CardItem: React.FC<CardItemProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={styles.card} key={card.id}>
      <div className={flipped ? styles.flipped : ''}>
        <Image
          height={200}
          width={200}
          src={card.src}
          className={styles.front}
          alt='card front'
        />
        <Image
          onClick={handleClick}
          height={200}
          width={200}
          src='/img/cover.png'
          className={styles.back}
          alt='card back'
        />
      </div>
    </div>
  );
};
export default CardItem;
