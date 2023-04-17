import { ICartItem } from '../interfaces';

const getCartTotal = (items: ICartItem[]) => items.reduce((acc, item) => acc + item.count * item.price, 0);

export default getCartTotal;