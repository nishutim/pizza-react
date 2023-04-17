import { $axios } from '../http';
import { IProduct } from '../interfaces';

class ProductsService {
   static fetchProducts = async (query: string) => {
      const { data } = await $axios.get<IProduct[]>('/pizza' + query);
      return data;
   }
};

export default ProductsService;