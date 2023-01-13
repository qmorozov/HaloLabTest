import { FC } from 'react';
import { IData } from '../../Main';
import Style from '../../styles/components/Card.module.scss';

const Card: FC<IData> = ({ category, name, price }) => {
  return (
    <li className={Style.Wrapper}>
      <div className={Style.Header}>
        <span className={`trim-text ${Style.Category}`}>{category}</span>
        <span className={`trim-text ${Style.Name}`}>{name}</span>
      </div>
      <div className={Style.Footer}>
        <div className={Style.Price}>
          <span className={Style.PriceCurrency}>$</span>
          <span className={Style.PriceCount}>{price}</span>
        </div>
        <button className={`btn ${Style.Button}`}>Buy</button>
      </div>
    </li>
  );
};

export default Card;
