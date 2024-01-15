import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAPI } from "./MealsContextProvider";
import { useEffect, useState } from "react";
import "./Head.css";
import "./detailed.css";
import Ratings from "./Ratings";
import { useAuth } from "./context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

fontawesome.library.add(faStar);

function DetailedMeal() {
  const params = useParams();
  const { getproductbyId } = useAPI();
  const [item, setitem] = useState(null);

  async function callmeal() {
    try {
      const prod = await getproductbyId(params?.mealId);
      return prod;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }

  const { currentuser } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const result = await callmeal();
      setitem(result);
    };
    fetchData();
  });
  return (
    <>
      <Row>
        <Col sm="12" className="justify-content-center text-center">
          <div className="head">{item?.name || "Loading"}</div>
          <div className="d-flex justify-content-center">
            <p className="underline"></p>
          </div>
        </Col>
      </Row>
      <Container className="mt-5">
        <Row>
          <Col xs={6} className="cont">
            <img src={item?.image} alt="Loading" className="image"></img>
          </Col>

          <Col>
            <h2>Ingredients</h2>
            <p>{item?.ingredients || "Loading"}</p>
            <h2>Description</h2>
            <p>{item?.description || "Loading"}</p>
            <h2>price</h2>
            <p>{item?.price}$</p>
            <h2>comments</h2>
            {item?.comments.length > 1 ? (
              <div className="comments">
                {item?.comments?.map((comm, index) => {
                  if (index !== 0) {
                    return (
                      <div key={index} className="justify-content-center">
                        <div className="d-flex">
                          <h3 className="name"> {comm.name}</h3>
                          <p className="stars">
                            {comm.rate}{" "}
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{
                                "--fa-primary-color": "#b6c110",
                                "--fa-secondary-color": "#c3d00b",
                              }}
                            />{" "}
                          </p>
                        </div>
                        <p className="nameunderline"></p>
                        <p className="comment">{comm.Comment}</p>
                        <p className="cunderline"></p>
                      </div>
                    );
                  } else {
                    return <span></span>;
                  }
                })}
              </div>
            ) : (
              `NO comments yet on ${item?.name || "Loading"} , add yours ? `
            )}
          </Col>
          

          {currentuser?.name&&item ? <Ratings name={item?.name} id={item?.id} /> : <div className="d-flex justify-content-center">
          <Link to="/" > Create account </Link>{"  "} Or {" "}<Link to="/signin"> Sign in </Link> 
            {' '}to write ur comment on {item?.name}{" "}

            
            </div>}

        </Row>
      </Container>
    </>
  );
}

export default DetailedMeal;
