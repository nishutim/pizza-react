import React, { FC } from 'react';
import s from './styles.module.scss'

const ProductCardSkeleton: FC = React.memo(() => (
   <div className={s.productCardSkeleton}>
      <div className={s.image}></div>
      <div className={s.title}></div>
      <div className={s.options}></div>
      <div className={s.actions}></div>
   </div>
));

export default ProductCardSkeleton;