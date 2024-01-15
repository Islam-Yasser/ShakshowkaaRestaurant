import { Button, Card, ListGroup } from "react-bootstrap";
import "./Meals.css";
import { useEffect, useState } from "react";
import { useShoppingCart } from "./context/ShoppingCartProvider";
import Swal from "sweetalert2";
import Spinn from "./Spinners";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./context/AuthContext";

function addtoCart(name) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: `The product ${name} is added successfully to your cart`,
  });
}

function Meal(props) {
  const { addItemsToCart } = useShoppingCart();
  const [description, setdescription] = useState(
    props.value.description.slice(0, 20) + "..."
  );

  const [ingredients, setingredients] = useState(
    props.value.ingredients.slice(0, 15) + "..."
  );

  const [rates, setrates] = useState();
  const calcRates = () => {
    let counter = 1;
    let totalvotes = 0;
    let multiplication = 0;
    for (let x in props.value.rates[0]) {
      totalvotes += props.value.rates[0][x];
      multiplication += props.value.rates[0][x] * counter;
      counter++;
    }
    let star = multiplication / totalvotes;
    setrates(star);
    if (totalvotes === 0) setrates(0);
  };
  useEffect(() => {
    calcRates();
  }, []);

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  const{currentuser}=useAuth()

  return (
    <Card
      style={{ width: "18rem" }}
      className={`me-4 mb-3 mt-3 `}
      onMouseEnter={() => {
        toggleHover();
      }}
      onMouseLeave={() => {
        toggleHover();
      }}
    >
      <Link to={`/home/meal/${props.value.id}`}>
        <Card.Img
          variant="top"
          src={props.value.image}
          alt={<Spinn />}
          className={hovered ? "img" : "img2"}
        />
      </Link>
      <Card.Body>
        <Card.Title>{props.value.name}</Card.Title>
        <Card.Text className="description">{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{ingredients}</ListGroup.Item>
        <ListGroup.Item>{props.value.price}$</ListGroup.Item>
        <ListGroup.Item>{props.value.category}</ListGroup.Item>
        <ListGroup.Item>
          {rates} <FontAwesomeIcon icon={faStar} style={{ color: "#ffea00" }} />
        </ListGroup.Item>
      </ListGroup>
      {currentuser?.name&&<Card.Body>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            
            addItemsToCart(
              props.value.id,
              props.value.image,
              props.value.price,
              props.value.name
            );
            addtoCart(props.value.name);
          }}
        >
          {" "}
          Buy{" "}
        </Button>
      </Card.Body>}
    </Card>
  );
}
export default Meal;
