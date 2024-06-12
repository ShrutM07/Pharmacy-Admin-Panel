import React, { useState } from 'react';
import { useMedicineContext } from '../../context/MedicineContext';
import './AddMedicine.css';

const AddMedicine = () => {
  const { addMedicine } = useMedicineContext();
  const [medicine, setMedicine] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine((prevMedicine) => ({
      ...prevMedicine,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicine(medicine);
    setMedicine({
      name: '',
      description: '',
      price: 0,
      quantity: ''
    });
  };

  return (
    <div>
      <h2>Add Medicine</h2>
      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="form-group">
          <label htmlFor="name">Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={medicine.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={medicine.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={medicine.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={medicine.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="add-button">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
