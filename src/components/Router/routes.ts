import { FC } from 'react';
import { Cart, Products, Order, Success } from '../../pages';
import RouteNames from './routeNames';

const routes: { path: RouteNames, Component: FC }[] = [
   {
      path: RouteNames.HOME,
      Component: Products
   },
   {
      path: RouteNames.CART,
      Component: Cart
   },
   {
      path: RouteNames.ORDER,
      Component: Order
   },
   {
      path: RouteNames.SUCCESS,
      Component: Success
   }
];

export default routes;