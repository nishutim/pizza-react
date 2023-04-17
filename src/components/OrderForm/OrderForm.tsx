import React, { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';

import s from './styles.module.scss';

import RouteNames from '../Router/routeNames';
import { doughTypes } from '../../utils/consts';
import { ICartItem } from '../../interfaces';
import { invokeToast } from '../../utils';

import Input from '../Input/Input';

interface IFormInitialValues {
   name: string;
   tel: string;
   order: string;
}

interface Props {
   cartItems: ICartItem[];
   onSubmit: () => Promise<void>;
}

const OrderForm: FC<Props> = React.memo(({ cartItems, onSubmit }) => {
   const [disableBtn, setDisableBtn] = useState(false);
   const form = useRef<HTMLFormElement>(null);

   const navigate = useNavigate();

   const formik = useFormik<IFormInitialValues>({
      initialValues: {
         name: '',
         tel: '',
         order: cartItems.reduce((order, item, i) => {
            const { title, type, size, price, count } = item;
            return order += `${i + 1}. ${title} ${doughTypes[type]} ${size} см. ${price} р. ${count} шт.; `
         }, '')
      },
      validationSchema: Yup.object({
         name: Yup.string().trim().max(20, 'Нужно что-то покороче, не более 20 символов').required('Обязательное поле'),
         tel: Yup
            .string()
            .trim()
            .matches(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/, 'Телефон не соответствует схеме: +375 (29|25|44|33) XXX XX XX')
            .max(13, 'Слишком длинный')
            .required('Обязательное поле'),
         order: Yup.string()
      }),
      onSubmit: async ({ name, tel }) => {
         if (form.current) {
            try {
               setDisableBtn(true);
               await onSubmit();
               await emailjs.sendForm('service_xvz90ls', 'pizza_order_form', form.current, '7H-CWDwAbm9OKZOLq');
               navigate(RouteNames.SUCCESS, { state: { name, tel } });
            } catch (e) {
               invokeToast('😢 Не удалось оформить заказ', 'error');
            } finally {
               setDisableBtn(false);
            }
         }
      }
   });

   return (
      <form ref={form} className={s.orderForm} onSubmit={formik.handleSubmit}>
         <Input
            label='Ваше имя'
            id='name'
            name='name'
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Ваше имя пожалуйста'
         />
         <Input
            label='Ваш моб. телефон'
            id='tel'
            name='tel'
            value={formik.values.tel}
            error={formik.touched.tel && formik.errors.tel ? formik.errors.tel : undefined}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='А здесь моб. телефон'
         />
         <Input
            customStyle={s.orderDetails}
            id='order'
            name='order'
            value={formik.values.order}
            onChange={formik.handleChange}
         />
         <button type='submit' disabled={disableBtn}>
            Оформить заказ
         </button>
      </form>
   );
});

export default OrderForm;