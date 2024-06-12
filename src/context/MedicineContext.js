import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const MedicineContext = createContext();

export const useMedicineContext = () => useContext(MedicineContext);

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const apiUrl = 'https://crudcrud.com/api/7609da6614bb4fbab553a2c3e625c9e0/Product'; // Your API URL

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const addMedicine = async (medicine) => {
    try {
      const response = await axios.post(apiUrl, medicine);
      setMedicines([...medicines, response.data]);
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  const updateMedicine = async (id, updatedMedicine) => {
    try {
      await axios.put(`${apiUrl}/${id}`, updatedMedicine);
      const updatedMedicines = medicines.map(medicine =>
        medicine._id === id ? updatedMedicine : medicine
      );
      setMedicines(updatedMedicines);
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      const updatedMedicines = medicines.filter(medicine => medicine._id !== id);
      setMedicines(updatedMedicines);
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, updateMedicine, deleteMedicine }}>
      {children}
    </MedicineContext.Provider>
  );
};

export default MedicineContext;
