import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import MedicineShop from './components/MedicineStock/MedicineShop';
import AddMedicine from './components/MedicineStock/AddMedicine';
import HomePage from './components/MedicineStock/HomePage';
import { MedicineProvider } from './context/MedicineContext';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <MedicineProvider>
        <CartProvider>
          <div>
            <Header />
            <Switch>
              <Route path="/HomePage" component={HomePage} />
              <Route exact path="/">
                <MedicineShop />
              </Route>
              <Route path="/AddMedicine">
                <AddMedicine />
              </Route>
            </Switch>
          </div>
        </CartProvider>
      </MedicineProvider>
    </Router>
  );
};

export default App;