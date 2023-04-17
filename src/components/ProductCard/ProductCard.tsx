import React, { FC, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import s from './styles.module.scss';

import { ICartItem, IProduct } from '../../interfaces';
import { doughTypes, pizzaSizes } from '../../utils/consts';

interface Props {
   product: IProduct;
   cartQty: number;
   onAddToCart: (product: ICartItem) => Promise<void>;
}

const ProductCard: FC<Props> = React.memo(({ product, cartQty, onAddToCart }) => {
   const { id, imageUrl, title, types, sizes, price } = product;

   const [selectedDoughType, setSelectedDoughType] = useState(types[0]);
   const [selectedPizzaSize, setSelectedPizzaSize] = useState(sizes[0]);

   const [disableAddBtn, setDisableAddBtn] = useState(false);

   const handleAddToCArt = async () => {
      setDisableAddBtn(true);
      const newCartItem = {
         id,
         imageUrl,
         title,
         type: selectedDoughType,
         size: selectedPizzaSize,
         price,
         count: 1
      };
      await onAddToCart(newCartItem);
      setDisableAddBtn(false);
   }

   return (
      <div className={s.productCard}>
         <div className={s.image}>
            <img src={imageUrl} alt={title} />
         </div>
         <h4>{title}</h4>
         <div className={s.options}>
            <div className={s.optionsRow}>
               {doughTypes.map((type, i) => (
                  <button
                     key={type}
                     disabled={types.indexOf(i) === -1}
                     className={`${s.optionsItem} ${selectedDoughType === i ? s.optionsItemActive : ''}`}
                     onClick={() => setSelectedDoughType(i)}
                  >
                     {type}
                  </button>
               ))}
            </div>
            <div className={s.optionsRow}>
               {pizzaSizes.map((size) => (
                  <button
                     key={size}
                     disabled={sizes.indexOf(size) === -1}
                     className={`${s.optionsItem} ${selectedPizzaSize === size ? s.optionsItemActive : ''}`}
                     onClick={() => setSelectedPizzaSize(size)}
                  >
                     {size} см.
                  </button>
               ))}
            </div>
         </div>
         <div className={s.footer}>
            <span className={s.price}>от {price} ₽</span>
            <button
               className={s.addToCartBtn}
               disabled={disableAddBtn}
               onClick={handleAddToCArt}
            >
               <FiPlus />
               Добавить
               <span>{cartQty}</span>
            </button>
         </div>
      </div>
   );
});

export default ProductCard;