import { createContext, useContext, useState, type ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";

// Types
type ShoppingCartProviderProps = {
    children: ReactNode; // type mte3ou node
}
type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id:number) => number;
    increaseCartQuantity: (id:number) => void;
    decreaseCartQuantity: (id:number) => void;
    removeFromCart: (id:number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
}
type CartItem = {
    id: number;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider( {children}: ShoppingCartProviderProps ) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const [cartOpened, setCartOpened] = useState(false);

    const openCart = () => setCartOpened(true);
    const closeCart = () => setCartOpened(false);
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    const getItemQuantity = (id:number) => {
        return cartItems.find(item => item.id === id) ?.quantity || 0;
    }
    const increaseCartQuantity = (id:number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) === undefined) {
                return [...currentItems, {id, quantity: 1}];
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity+1}
                    } else return item;
                })
            }
        })
    }
    const decreaseCartQuantity = (id:number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id);
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity-1}
                    } else return item;
                })
            }
        })
    }
    const removeFromCart = (id:number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id);
        })
    }

    return <ShoppingCartContext.Provider value={{
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
        }}>
        {children}
        <ShoppingCart cartOpened={cartOpened} />
    </ShoppingCartContext.Provider>
}