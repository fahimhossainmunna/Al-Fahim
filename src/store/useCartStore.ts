import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
  category?: string;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number | string, size?: string) => void;
  updateQuantity: (id: number | string, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (newItem) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex(
          (item) => item.id === newItem.id && item.size === newItem.size
        );

        if (existingIndex > -1) {
          const updatedCart = [...currentCart];
          updatedCart[existingIndex].quantity += newItem.quantity;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...currentCart, newItem] });
        }
      },

      removeFromCart: (id, size) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        });
      },

      updateQuantity: (id, quantity, size) => {
        if (quantity <= 0) {
          get().removeFromCart(id, size);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      totalPrice: () =>
        get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

      totalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: "alfahim-cart-storage" }
  )
);