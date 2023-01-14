import { FC, MouseEvent } from 'react';
import Style from '../../styles/components/Card.module.scss';

interface ICard {
  category: string;
  name: string;
  price: number;
  setVisibleModal: (visible: boolean) => void;
  onClick: () => void;
}

const Card: FC<ICard> = ({
  category,
  name,
  price,
  setVisibleModal,
  onClick,
}) => {
  return (
    <li className={Style.Wrapper} onClick={onClick}>
      <div className={Style.Header}>
        <span className={`${Style.Category}`}>{category}</span>
        <span className={`${Style.Name}`}>{name}</span>
      </div>
      <div className={Style.Footer}>
        <div className={Style.Price}>
          <span className={Style.PriceCurrency}>$</span>
          <span className={Style.PriceCount}>{price}</span>
        </div>
        <button
          className={`btn ${Style.Button}`}
          onClick={() => setVisibleModal(true)}
        >
          Buy
        </button>
      </div>
    </li>
  );
};

export default Card;
