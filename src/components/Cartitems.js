import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./Head.css";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faFaceLaughSquint } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingCart } from "./context/ShoppingCartProvider";
import { useAuth } from "./context/AuthContext";


fontawesome.library.add(faFaceLaughSquint);



function Cartitems() {
  const {
    getCartItems,
    decreaseQuantity,
    removeItemsfromCart,
    totalprice,
    addItemsToCart
  } = useShoppingCart();
  let cartItems = getCartItems();
  const{currentuser}=useAuth()
  const navi =useNavigate()
  if(Object.keys(currentuser).length === 1)
  {
    return navi('/unauthoraized')
  }
  return (
    <>
      <Row>
        <Col sm="12" className="justify-content-center text-center">
          <div className="head">My Cart</div>
          <div className="d-flex justify-content-center">
            <p className="underline"></p>
          </div>
        </Col>
      </Row>

      <Container>
        <Row>
          {cartItems.length >= 1 ? (
            <>
            <Row className="justify-content-center text-center">
              <div className="head">your total price is : {totalprice}$</div>
            </Row>
            <Row className="d-flex justify-content-center align-items-center mt-2 mb-2"> 
              
            <Button
               className="mb-2 mt-2 w-25 btn btn-outline-dark"
               variant="primary"
               onClick={(e) => {
                 e.preventDefault();
                 navi('/checkout')
                }}
                >
               {" "}
               Check Out{" "}
             </Button>
            </Row>
            </>
            
          ) : null}

          {cartItems.length >= 1 ? (
            cartItems.map((item,index) => (
              <>
              <Col className="col-6 col-md-4">
                <Card className="card" key={index}>
                  <Card.Img variant="top" src={item.image} className="image" />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Quantity of item : {item.quantity}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    Item price is {item.price} and total price for this item is{" "}
                    {item.quantity * item.price}$
                  </Card.Footer>
                  <div className="buttons">
                    <Row>
                      <Col>
                        <Button
                          md={{ span: 4, offset: 4 }}
                          variant="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            addItemsToCart(item.id);
                          }}
                          className="mb-2 mt-2"
                          >
                          {" "}
                          +{" "}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          md={{ span: 4, offset: 2 }}
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            removeItemsfromCart(item.id);
                          }}
                          className="mb-2 mt-2"
                          >
                          {" "}
                          Remove{" "}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          md={{ span: 4, offset: 4 }}
                          variant="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            decreaseQuantity(item.id);
                          }}
                          className="mb-2 mt-2"
                          >
                          {" "}
                          -{" "}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
               </>
            ))
          )  : (
            <div className="empty">
              <h4>
                Your Cart is currently empty ... and your stomach too{" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-face-laugh-squint"
                  style={{ color: "#000000" }}
                />
              </h4>
              <Link to="/home">
                <h4>Do you wish to fill ?</h4>
              </Link>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Cartitems;
