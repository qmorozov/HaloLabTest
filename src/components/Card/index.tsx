import { FC } from 'react';
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
        <span className="trim-text card__category">{category}</span>
        <span className="trim-text card__name">{name}</span>
      </div>
      <div className={Style.Footer}>
        <div className="price">
          <span className="price__currency">$</span>
          <span className="price__count">{price}</span>
        </div>
        <button
          className={`btn ${Style.Button}`}
          onClick={() => setVisibleModal(true)}
          tabIndex={0}
          aria-label={`Buy ${name} item`}
        >
          Buy
        </button>
      </div>
    </li>
  );
};

export default Card;
