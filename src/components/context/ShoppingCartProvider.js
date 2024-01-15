import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const MyContext = createContext({});
const initialCartItems = localStorage.getItem("shoppingcart")
  ? JSON.parse(localStorage.getItem("shoppingcart"))
  : [];

function ShoppingCartProvider({ children }) {
  const [Cartitems, setCartitems] = useState(initialCartItems);
  const [totalprice, settotalprice] = useState(0);

  const { setCart } = useAuth();
  const { getCart } = useAuth();

  async function cartsetter() {
    try {
      let temp = await getCart();
      return temp;
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    const setup = async () => {
      let temp = await cartsetter();
      if(temp!==undefined)
        localStorage.setItem("shoppingcart", JSON.stringify(temp));
      else
      localStorage.removeItem("shoppingcart");
    };
    setup();
    getItemsQuantity();
    gettotalprice();
    setCart(Cartitems);
  });


  const getItemsQuantity = () => {
    let quantity = 0;
    Cartitems?.map((item) => (quantity += item.quantity));
    if(quantity===NaN)
      quantity=0;
    return quantity;
  };

  const getCartItems = () => {
    return Cartitems;
  };

  const gettotalprice = () => {
    let price = 0;
    Cartitems?.map((item) => {
      price += item.quantity * item.price;
    });
    return settotalprice(price);
  };

  const addItemsToCart = (id, image, price, name) => {
    setCartitems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1, image, price, name }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCartitems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeItemsfromCart = (id) => {
    setCartitems((currItems) => currItems.filter((item) => item.id !== id));
  };
  const removeCart=()=>{
    setCartitems([]);

  }
  return (
    <MyContext.Provider
      value={{
        getItemsQuantity,
        addItemsToCart,
        removeItemsfromCart,
        getCartItems,
        decreaseQuantity,
        totalprice,
        removeCart
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ShoppingCartProvider;

export const useShoppingCart = () => {
  return useContext(MyContext);
};
