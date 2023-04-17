import { useQuery } from '@tanstack/react-query';
import ProductsService from '../services/productsService';
import { invokeToast } from '../utils';

const useFetchProducts = (query: string) => {
   return useQuery({
      queryKey: ['products', query],
      staleTime: 1000 * 60 * 30,
      queryFn: () => ProductsService.fetchProducts(query),
      onError: (e) => {
         if (e instanceof Error) {
            invokeToast('😢 Не удалось загрузить товары', 'error');
         }
      }
   });
};

export default useFetchProducts;