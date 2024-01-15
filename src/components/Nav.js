import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "./context/ShoppingCartProvider";
import { useAuth } from "./context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAPI } from "./MealsContextProvider";
import Meal from "./Meal";

fontawesome.library.add(faCartShopping);

function NavScrollExample() {
  const { currentuser, signout } = useAuth();
  const { getItemsQuantity } = useShoppingCart();

  const navi = useNavigate();

  if (currentuser?.name != null) {
    return (
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Container>
          <Link to="/home" className="title navbar-brand">
            Shakshowkaa
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Link to="/myprofile" className="text-decoration-none">
              <div className="username">{currentuser?.username}</div>
            </Link>

            <Form className="d-flex">
              <div className="cartbackground me-5">
                <div className="counter">{getItemsQuantity()}</div>
                <Link to="home/cart">
                  <FontAwesomeIcon
                    icon="fa-solid fa-cart-shopping"
                    flip
                    style={{ color: "#f5f5f5" }}
                    className="me-5 cart"
                  />
                </Link>
              </div>
              <Button
                variant="dark"
                onClick={(e) => {
                  e.preventDefault();
                  Swal.fire({
                    title: "Are you sure you want leave ?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      signout();
                      navi("/signin");
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You logged out , visit us soon ",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  });
                }}
              >
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return null;
  }
}

export default NavScrollExample;
