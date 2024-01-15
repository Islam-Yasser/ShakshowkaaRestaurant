import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartProvider";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Checkout() {
  const { currentuser } = useAuth();
  const selectedOptionRef = useRef(null);
  const [option, setoption] = useState("Cash");
  const address = useRef("");
  const navi = useNavigate();
  const { getCartItems, totalprice, removeCart } = useShoppingCart();
  let cartItems = getCartItems();
  let url = "http://localhost:3029/users";

  const mystyle = { marginTop: "9px", marginLeft: "6px" };

  const validationSchema = yup.object({
    address: yup.string().min(10).required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema,
  });
  const handleChange = () => {
    setoption(selectedOptionRef.current.value);
  };

  const setOrder = (e) => {
    e.preventDefault();
    currentuser.order.push({
      addressOfShipment: formik.values.address,
      items: cartItems,
      price: totalprice + totalprice * 0.14 + 30,
    });

    console.log(currentuser.id);

    try {
      axios({
        method: "put",
        url: `${url}/${currentuser.id}/`,
        data: {
          id: currentuser.id,
          name: currentuser.name,
          username: currentuser.username,
          email: currentuser.email,
          password: currentuser.password,
          cart: [],
          order: currentuser.order,
        },
      })
        .then((data) => {
          console.log(data);
          removeCart();
        })
        .then(() => {
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: `Your order is Ready to be shipped to ${formik.values.address} eat well , see you soon `,
            showConfirmButton: false,
            timer: 2500,
          });
          navi("/home");
        });
      
    } catch (error) {
      
    }
    
  };

  return (
    <Container>
      <Row>
        <Col className="col-8 mt-5">
          <h3 className="text-center">{currentuser.name}'s Cart</h3>
          <Row>
            {cartItems.length >= 1 ? (
              cartItems.map((item, index) => (
                <Col className="col-6 col-md-4">
                  <Card className="card" key={index}>
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className="image"
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>Quantity of item : {item.quantity}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      Item price is {item.price} and total price for this item
                      is {item.quantity * item.price}$
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <></>
            )}
          </Row>
        </Col>
        <Col className="col-4 mt-5">
          <h3 className="text-center">Information</h3>
          <div className="card-body ps-5 border border-dark rounded">
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                id="address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                ref={address}
                type="address"
                className="form-control mb-3 opacity-75"
              />
            </div>
            <div className="mb-3">
              <label>Select an option:</label>
              <select ref={selectedOptionRef} onChange={handleChange}>
                <option value="Cash">Cash</option>
                <option value="CreditCard">Credit Card</option>
              </select>
            </div>
            {option == "Cash" && (
              <>
                <div className="d-flex">
                  <h3> Price of payment : </h3>
                  <h6 style={mystyle}>{totalprice} $</h6>
                </div>

                <div className="d-flex">
                  <h3>fees : </h3>
                  <h6 style={mystyle}>{(totalprice * 0.14).toFixed(2)} $</h6>
                </div>
                <div className="d-flex">
                  <h3>Shipment fees : </h3>
                  <h6 style={mystyle}>30 $</h6>
                </div>
                <div>
                  <h2>
                    {" "}
                    Total : {(totalprice * 0.14 + totalprice + 30.0).toFixed(
                      2
                    )}{" "}
                    $
                  </h2>
                  <h4></h4>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-center align-items-center  flex-column">
        <h3>Get your meals now </h3>
        {!formik.errors.address && formik.touched.address ? (
          <Button onClick={setOrder} variant="primary" type="submit">
            Start Shipping
          </Button>
        ) : (
          <>
            <h6>Address of shippment is needed </h6>
          </>
        )}
      </div>
    </Container>
  );
}

export default Checkout;
