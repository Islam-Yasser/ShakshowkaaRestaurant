import { Container } from "react-bootstrap";
import NavScrollExample from "./components/Nav";
import Head from "./components/Header";
import MealsContextProvider from "./components/MealsContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeMenu from "./components/HomeMenu";
import Cart from "./components/Cartitems";
import ShoppingCartProvider from "./components/context/ShoppingCartProvider";
import DetailedMeal from "./components/Detailed";
import SignUp from "./components/Signup/SignUp.js";
import SignIn from "./components/SignIn/SignIn.js";
import UnsignedNav from "./components/Unauthorized/unsignedNav.js";
import Unauthorized from "./components/Unauthorized/AccessUnauthorized.js";
import Unfound from "./components/unfound/Unfound.js";
import Profile from "./components/Profile/Profile.js";
import Checkout from "./components/Check out/Checkout.jsx";

function App() {
  
  return (
    <MealsContextProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <NavScrollExample sticky="top" />
          <UnsignedNav sticky="top"/>
          <Container>
            <Routes>
              <Route
                path="/home"
                element={
                  <>
                    <Head />
                    <HomeMenu />
                  </>
                }
              />

              <Route path="/unauthoraized" element={<Unauthorized />} />
              <Route path="*" element={<Unfound />} />
              <Route
                path="/"
                element={
                  <>
                    <SignUp />
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <SignIn />
                  </>
                }
              />

              <Route path="/myprofile" element={<Profile/>}></Route>
              <Route path="/home/cart" element={<Cart />} />
              <Route path="/home/meal/:mealId" element={<DetailedMeal />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ShoppingCartProvider>
    </MealsContextProvider>
  );
}

export default App;
