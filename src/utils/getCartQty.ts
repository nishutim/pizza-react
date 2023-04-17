import { ICartItem } from '../interfaces';

const getCartQty = (items: ICartItem[]) => items.reduce((acc, item) => acc + item.count, 0);

export default getCartQty;