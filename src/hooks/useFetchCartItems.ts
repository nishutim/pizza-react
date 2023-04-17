import { useQuery } from '@tanstack/react-query';
import CartService from '../services/cartService';
import { invokeToast } from '../utils';

const useFetchCartItems = () => {
   return useQuery({
      queryKey: ['cartItems'],
      queryFn: CartService.fetchCartItems,
      refetchOnWindowFocus: false,
      onError: (e) => {
         if (e instanceof Error) {
            invokeToast('😢 Не удалось загрузить товары в корзине', 'error');
         }
      }
   });
};

export default useFetchCartItems;