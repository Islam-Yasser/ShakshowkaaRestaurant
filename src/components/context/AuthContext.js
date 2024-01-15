import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:3029/users";

export const AuthContext = createContext();
const user = localStorage.getItem("currentuser")
  ? JSON.parse(localStorage.getItem("currentuser"))
  : {};

const AuthProvider = ({ children }) => {
  const [currentuser, setcurrentuser] = useState(user);
  const [Users, setUsers] = useState();
  const [update, setupdate] = useState();

  const fetchUsers = () => {
    fetch(url)
      .then((res) => res.json())
      .then((custs) => setUsers(custs));
  };

  useEffect(() => {
    localStorage.setItem("currentuser", JSON.stringify(currentuser));
  }, [update]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const signup = (email, password, name, username, phonenumber) => {
    axios({
      method: "post",
      url: `${url}`,
      data: {
        id: Users.length,
        email: email,
        name: name,
        password: password,
        username: username,
        phone: phonenumber,
        order: [],
        cart: [],
      },
    }).catch((error) => {
      console.log(error);
    });
    let user1 = {
      id: Users.length,
      email: email,
      name: name,
      password: password,
      username: username,
      phone: phonenumber,
      order: [],
      cart: [],
    };
    setcurrentuser(user1);
    setupdate((last) => !last);
  };
  const signin = (email, password) => {
    let user1 = null;
    Users.map((user) => {
      if (user.email === email && user.password === password) {
        user1 = user;
      }
    });
    if (user1 !== null) {
      setcurrentuser(user1);
      setupdate((last) => !last);
      return true;
    } else {
      return false;
    }
  };
  const clear = () => {
    localStorage.removeItem("currentuser");
  };
  const signout = () => {
    axios({
      method: "put",
      url: `${url}/${currentuser.id}`,
      data: {
        id: currentuser.id,
        email: currentuser.email,
        name: currentuser.name,
        username: currentuser.username,
        phone: currentuser.phone,
        password: currentuser.password,
        cart: currentuser.cart,
        order: currentuser.order,
      },
    }).catch((error) => {
      console.log(error);
    });
    setcurrentuser({});
    clear();
  };
  const setCart = (cart) => {
    currentuser.cart = cart;
  };

  function getCart() {
    return currentuser?.cart;
  }

  return (
    <AuthContext.Provider
      value={{ currentuser, signup, signin, signout, setCart, getCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
