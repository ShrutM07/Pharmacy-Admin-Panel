import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import Cart from '../Cart/Cart';

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCartContext();

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // Calculate total items in the cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/HomePage">Home</Nav.Link>
            <Nav.Link as={Link} to="/">Medicine Shop</Nav.Link>
            <Nav.Link as={Link} to="/AddMedicine">Add Medicine</Nav.Link>
          </Nav>
          <Button variant="outline-info" className="ms-auto" onClick={handleShowCart}>
            Cart <Badge bg="secondary">{totalItemsInCart}</Badge>
          </Button>
        </Container>
      </Navbar>

      <Cart show={showCart} handleClose={handleCloseCart} />
    </>
  );
};

export default Header;
