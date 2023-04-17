import React, { FC } from 'react';

import s from './styles.module.scss';

import { ICartItem, IProduct } from '../../interfaces';
import { getCartQtyByTitle } from '../../utils';

import { ProductCard, ProductCardSkeleton } from '..';

interface Props {
   isLoading: boolean;
   products: IProduct[];
   cartItems: ICartItem[];
   onAddToCart: (product: ICartItem) => Promise<void>;
}

const ProductsList: FC<Props> = React.memo(({ isLoading, products, cartItems, onAddToCart }) => {
   return (
      <div className={s.productsList}>
         {isLoading
            ? [...new Array(8)].map((_, i) => (<ProductCardSkeleton key={i} />))
            : products.map(product => {
               const cartQty = getCartQtyByTitle(cartItems, product.title);

               return (
                  <ProductCard
                     key={product.id}
                     product={product}
                     cartQty={cartQty}
                     onAddToCart={onAddToCart} />
               )
            })
         }
      </div>
   );
});

export default ProductsList;