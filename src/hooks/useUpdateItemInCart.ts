import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService from '../services/cartService'
import { ICartItem } from '../interfaces';
import { invokeToast } from '../utils';

const useUpdateItemInCart = () => {
   const client = useQueryClient();
   return useMutation({
      mutationFn: CartService.updateItemInCart,
      onSuccess: (updatedItem) => {
         client.setQueriesData<ICartItem[]>(['cartItems'], (items) => items?.map(item => {
            return item.id === updatedItem.id
               ? updatedItem
               : item
         }));
         client.invalidateQueries({
            queryKey: ['cartItems'],
            refetchType: 'none'
         });
      },
      onError: () => {
         invokeToast('😢 Не удалось обновить количество товара', 'error');
      }
   });
};

export default useUpdateItemInCart;