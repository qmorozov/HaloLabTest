import { ChangeEvent, FC, useState } from 'react';
import Style from '../../styles/components/Modal.module.scss';

interface IModal {
  category: string;
  name: string;
  price: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Modal: FC<IModal> = ({ category, price, name, visible, setVisible }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const validate = (fieldName: keyof typeof errors, value: string) => {
    if (fieldName === 'name') {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: 'This field is required',
        }));
      } else if (!/^[\p{L}]+$/u.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: 'Only letters allowed',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
      }
    }
    if (fieldName === 'phone') {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: 'This field is required',
        }));
      } else if (!/^[0-9]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: 'Only numbers allowed',
        }));
      } else if (value.length !== 12) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: 'Should contain 12 characters',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
      }
    }
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate('name', formData.name);
    validate('phone', formData.phone);

    if (!errors.name && !errors.phone) {
      console.log(formData);
    }
  };

  const handleModalClick = () => {
    setVisible(false);
    setFormData({ name: '', phone: '' });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validate(name as 'name' | 'phone', value);
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
        <div className={Style.Info}>
          <span className={Style.Category}>{category}</span>
          <span className={Style.Name}>{name}</span>
          <div className={Style.Price}>
            <span className={Style.PriceCurrency}>$</span>
            <span className={Style.PriceCount}>{price}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={Style.Fields}>
            <fieldset className={errors.name.length !== 0 ? Style.Error : ''}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, name: '' }))
                }
              ></button>
              <span>{errors.name}</span>
            </fieldset>
            <fieldset className={errors.phone.length !== 0 ? Style.Error : ''}>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, phone: '' }))
                }
              ></button>
              <span>{errors.phone}</span>
            </fieldset>
          </div>
          <button className="btn" type="submit">
            <span>Order</span>
          </button>
        </form>
        <button className={Style.Close} onClick={handleModalClick} />
      </div>
    </div>
  );
};
export default Modal;
