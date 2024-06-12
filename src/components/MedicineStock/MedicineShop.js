import React, { useState, useEffect } from 'react';
import { useMedicineContext } from '../../context/MedicineContext';
import { useCartContext } from '../../context/CartContext';
import './MedicineShop.css';

const MedicineShop = () => {
  const { medicines: initialMedicines, updateMedicine } = useMedicineContext();
  const { addToCart } = useCartContext();
  const [medicines, setMedicines] = useState(initialMedicines);

  useEffect(() => {
    setMedicines(initialMedicines);
  }, [initialMedicines]);

  const handleAddToBill = async (medicineToAdd) => {
    if (medicineToAdd.quantity > 0) {
      // Decrement quantity
      const updatedQuantity = medicineToAdd.quantity - 1;

      // Add to cart
      addToCart({ ...medicineToAdd, quantity: 1 });

      // Update medicine quantity in context
      await updateMedicine(medicineToAdd._id, { ...medicineToAdd, quantity: updatedQuantity });

      // Update local state
      setMedicines(prevMedicines =>
        prevMedicines.map(medicine =>
          medicine._id === medicineToAdd._id
            ? { ...medicine, quantity: updatedQuantity }
            : medicine
        )
      );
    }
  };

  return (
    <div className="medicine-shop">
      <h2>Medicine Stock Shop</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Add to Bill</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.name}</td>
              <td>{medicine.description}</td>
              <td>{medicine.price.toFixed(2)}</td>
              <td>{medicine.quantity}</td>
              <td>
                <button
                  onClick={() => handleAddToBill(medicine)}
                  disabled={medicine.quantity === 0}
                  style={{
                    backgroundColor: medicine.quantity === 0 ? "#cccccc" : "",
                    cursor: medicine.quantity === 0 ? "not-allowed" : "pointer",
                    color: medicine.quantity === 0 ? "#555" : ""
                  }}
                >
                  {medicine.quantity === 0 ? "Out of Stock" : "Add to Bill"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineShop;
