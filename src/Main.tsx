import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Loader from './components/Loader';
import Modal from './components/Modal';

import Style from './styles/pages/Main.module.scss';

export interface IData {
  name: string;
  category: string;
  price: number;
}

const Main = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState<IData>({
    name: '',
    category: '',
    price: 0,
  });
  const [cheapest, setCheapest] = useState<IData>({
    name: '',
    category: '',
    price: 0,
  });

  useEffect(() => {
    setCheapest(
      data.reduce((min, item) => (item.price < min.price ? item : min), data[0])
    );
  }, [data]);

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

  const handleModalData = (data: IData) => {
    setModalData(data);
  };

  return (
    <section className={Style.Wrapper}>
      <div className="container">
        <Modal
          {...modalData}
          visible={visibleModal}
          setVisible={setVisibleModal}
        />
        <ul className={Style.Items}>
          {data.map((card: IData, index: number) => (
            <Card
              {...card}
              key={index}
              setVisibleModal={setVisibleModal}
              onClick={() => handleModalData(card)}
            />
          ))}
        </ul>
        <button
          className={`${Style.BtnCheapest} btn`}
          onClick={() => {
            setModalData(cheapest);
            setVisibleModal(true);
          }}
        >
          Buy cheapest
        </button>
      </div>
    </section>
  );
};

export default Main;
