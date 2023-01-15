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
      onClick={handleModalClick}
      className={`${Style.Container} ${visible ? Style.Visible : ''}`}
    >
      <div
        className={`${Style.Wrapper} ${visible ? Style.Visible : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
        <button
          tabIndex={visible ? 0 : -1}
          className={Style.Close}
          onClick={handleModalClick}
          aria-label="Close modal"
        />
      </div>
    </div>
  );
};
export default Modal;
