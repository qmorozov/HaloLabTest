import { ChangeEvent, FC, useEffect, useState } from 'react';
import Style from '../../styles/components/Modal.module.scss';

interface IModalForm {
  category: string;
  name: string;
  price: number;
  visibleModal: boolean;
}

const ModalForm: FC<IModalForm> = ({ category, price, name, visibleModal }) => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validate(name as 'name' | 'phone', value);
  };

  useEffect(() => {
    if (!visibleModal) {
      setFormData({ name: '', phone: '' });
      setErrors({ name: '', phone: '' });
    }
  }, [visibleModal]);

  const hasErrors =
    Object.values(errors).some((val) => val !== '') ||
    Object.values(formData).every((val) => val === '');

  return (
    <>
      <div className={Style.Info}>
        <span className="trim-text card__category">{category}</span>
        <span className="trim-text card__name">{name}</span>
        <div className="price">
          <span className="price__currency">$</span>
          <span className="price__count">{price}</span>
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
            {errors.name.length !== 0 && formData.name.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, name: '' }))
                }
              />
            )}
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
            {errors.phone.length !== 0 && formData.phone.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, phone: '' }))
                }
              />
            )}
            <span>{errors.phone}</span>
          </fieldset>
        </div>
        <button className="btn" type="submit" disabled={hasErrors}>
          <span>Order</span>
        </button>
      </form>
    </>
  );
};

export default ModalForm;
