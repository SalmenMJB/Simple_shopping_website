// To use the slide effect of the shopping cart

import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import CartItem from "./CartItem";
import { FormatCurrency } from "../utilities/FormatCurrency";
import storeItems from "../data/items.json"

// lezm type ayy function 3andha parameter lezmou type
type ShoppingCartProps = {
    cartOpened: boolean;
}

export const ShoppingCart = ({cartOpened}:ShoppingCartProps) => {
    const {closeCart, cartItems} = useShoppingCart();
    return <Offcanvas show={cartOpened} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {FormatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(i => i.id === cartItem.id);
                        return total + (item?.price||0)*cartItem.quantity;
                    }, 0))}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}