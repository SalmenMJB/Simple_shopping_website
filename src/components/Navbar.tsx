import {Container, Button, Nav, Navbar as NavbarBs} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
    const {openCart, cartQuantity} = useShoppingCart();
    return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
                <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
            </Nav>
            {cartQuantity > 0 && (<Button onClick={openCart} style={{width:"3rem", height:"3rem", position:"relative"}} variant="outline-primary" className="rounded-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 13.26l.03-.12L7.9 11h8.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49a1 1 0 0 0-.89-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 13.37 5.48 15 7 15h12v-2H7.42a.5.5 0 0 1-.26-.74z" />
                </svg>
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{color:"#FFF", width:"1.5rem", position:"absolute", bottom:0, right:0, transform:"translate(25%, 25%)"}}>{cartQuantity}</div>
            </Button>)}
        </Container>
    </NavbarBs>);
}

export default Navbar;