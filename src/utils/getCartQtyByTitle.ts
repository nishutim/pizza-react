import { ICartItem } from '../interfaces';

const getCartQtyByTitle = (items: ICartItem[], productTitle: string) => items.reduce((acc, item) => (
   item.title === productTitle ? acc + item.count : acc
), 0);

export default getCartQtyByTitle;