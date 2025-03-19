import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const PRODUCTS = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Smartphone", price: 300 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Smartwatch", price: 150 },
  ];
  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 }; 
  const THRESHOLD = 1000;
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [SubTotal, setSubTotal] = useState([]);
  const [showGiftMessage, setShowGiftMessage] = useState(false);

  useEffect(() => {
    let Total = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setSubTotal(Total);

    if (Total >= THRESHOLD) {
      if (!cart.find((item) => item.id == 99)) {
        setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
        setShowGiftMessage(true);
      } else {
        //setCart((prevCart) => prevCart.filter((item) => item.id !== 99));
        setShowGiftMessage(false);
      }
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id == product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const Remove = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };
  const update = (product, type) => {
    console.log(product, type);
    if (type == "add") {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      });
    } else {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      });
    }
  };

  return (
    <>
      <div>
        <div>
          {PRODUCTS.map((product) => (
            <div key={product.id}>
              <span>
                {product.name}-Rs{product.price}
              </span>
              <button onClick={() => addToCart(product)}>Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
      <h1>Shopping cart</h1>

      <h2>{SubTotal}</h2>
      <p>{SubTotal > THRESHOLD ? `Yeah You Won Free Gif` : ``}</p>
      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <span>
              {product.name}-{product.quantity}-Rs{product.price}
            </span>
            <button onClick={() => Remove(product)}>Remove</button>
            <button onClick={() => update(product, "add")}>+</button>
            <button onClick={() => update(product, "remove")}>-</button>
          </div>
        ))}
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
