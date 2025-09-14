import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { Button, Stack } from 'react-bootstrap';
import { FormatCurrency } from '../utilities/FormatCurrency';

type CartItemProps = {
    id:  number;
    quantity: number;
}

const CartItem = ({id, quantity}: CartItemProps) => {
  const {removeFromCart} = useShoppingCart();
  const item = storeItems.find(i => i.id === id);
  if (item == undefined) return null;

  return (
    <Stack direction="horizontal" gap={2} className='d-flex align-items-center'>
        <img src={item.imgUrl} style={{width: "125px", height:"75px", objectFit:"cover"}} />
        <div className="me-auto">
            <div>
                {item.name} {quantity>1 && <span className='text-muted' style={{fontSize: ".65rem"}}>{quantity}x</span>}
            </div>
            <div className="text-muted" style={{fontSize: ".75rem"}}>{FormatCurrency(item.price)}</div>
        </div>
        <div>{FormatCurrency(item.price * quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
    </Stack>
  );
}

export default CartItem
