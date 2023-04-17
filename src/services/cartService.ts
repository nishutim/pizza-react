import { ICartItem } from '../interfaces';

class CartService {
   static async _saveCart<T = ICartItem[]>(key: string, data: T) {
      localStorage.setItem(key, JSON.stringify(data));
   }

   static fetchCartItems = async () => {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as ICartItem[];
      return cartItems;
   }

   static addItemToCart = async (newCartItem: ICartItem) => {
      const cartItems = await this.fetchCartItems();
      const updatedCartItems = [...cartItems, newCartItem];
      await this._saveCart('cart', updatedCartItems);
      return newCartItem;
   }

   static updateItemInCart = async (newCartItem: ICartItem) => {
      const cartItems = await this.fetchCartItems();
      const updatedCartItems = cartItems.map(item => (
         item.id === newCartItem.id
            ? newCartItem
            : item
      ));
      await this._saveCart('cart', updatedCartItems);
      return newCartItem;
   }

   static removeItemFromCart = async (id: number) => {
      const cartItems = await this.fetchCartItems();
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      await this._saveCart('cart', updatedCartItems);
   }

   static clearCart = async () => {
      await this._saveCart('cart', []);
   }
};

export default CartService;