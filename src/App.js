import Header from "./components/Layout/Header";

import { Fragment, useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartVisibility, setCartVisibility] = useState(false);

  const showCart = () => {
    setCartVisibility(true);
  }

  const hideCart = () => {
    setCartVisibility(false);
  }

  return (
    <CartProvider>
      {cartVisibility && <Cart onHideCart={hideCart}/>}
      <Header onShowCart={showCart}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
