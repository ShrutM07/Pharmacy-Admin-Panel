import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import { useCartContext } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = ({ show, handleClose }) => {
  const { cart, removeFromCart } = useCartContext();

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} dialogClassName="cart-modal">
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((medicine, index) => (
                  <tr key={index}>
                    <td>{medicine.name}</td>
                    <td>Rs. {medicine.price.toFixed(2)}</td>
                    <td>{medicine.quantity}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemoveFromCart(index)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <h4>Total Amount: Rs. {calculateTotal()}</h4>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
