import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Loader from './components/Loader';

import Style from './styles/pages/Main.module.scss';

export interface IData {
  name: string;
  category: string;
  price: number;
}

const Main = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<IData[]>(
          'https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e'
        );
        setData(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={Style.Wrapper}>
      <div className="container">
        <ul className={Style.Items}>
          {data.map((card: IData, index: number) => (
            <Card {...card} key={index} />
          ))}
        </ul>
        <button className={`${Style.BtnCheapest} btn`}>Buy cheapest</button>
      </div>
    </section>
  );
};

export default Main;
