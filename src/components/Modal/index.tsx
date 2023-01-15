import { FC, ReactNode } from 'react';
import Style from '../../styles/components/Modal.module.scss';

interface IModal {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: ReactNode;
}

const Modal: FC<IModal> = ({ visible, setVisible, children }) => {
  const handleModalClick = () => {
    setVisible(false);
  };

  return (
    <div
      className={`${Style.Container} ${visible ? Style.Visible : ''}`}
      onClick={handleModalClick}
    >
      <div
        className={`${Style.Wrapper} ${visible ? Style.Visible : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
        <button className={Style.Close} onClick={handleModalClick} />
      </div>
    </div>
  );
};
export default Modal;
