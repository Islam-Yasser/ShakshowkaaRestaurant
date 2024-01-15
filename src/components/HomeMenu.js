import React, { useEffect, useState } from "react";
import { useAPI } from "./MealsContextProvider";
import Spin from "./Spinners";
import Meal from "./Meal";
import { Button, Col, Form, Row } from "react-bootstrap";

function MenuList() {
  const { Data } = useAPI();
  const { getCategories } = useAPI();

  const [maindatat, setmaindata] = useState([]);
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState("all dishes");
  const [search, setsearch] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setsearch(e.target.value);
  };

  async function getcategories() {
    try {
      const cat = await getCategories();
      return cat;
    } catch {
      return null;
    }
  }
  useEffect(() => {
    setmaindata(Data);
    const setup = async () => {
      const cat = await getcategories();
      setcategories(cat);
    };
    setup();
  }, [Data]);

  return (
    <>
      <Row className="w-100 h-100 d-flex flex-flow-column">
        <Row className="d-flex justify-content-center align-items-center mt-3 mb-5">
          <div className="w-50 ">
            <Form.Control
              id="search"
              name="search"
              type="text"
              placeholder="Search for dishes .."
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
          </div>
        </Row>
        <Col className="d-flex justify-content-around">
          <Button
            variant={`${category === "all dishes" ? "secondary" : "dark"}`}
            className="text-center text-capitalize"
            onClick={(e) => {
              e.preventDefault();
              setcategory("all dishes");
            }}
          >
            all dishes
          </Button>
          {categories ? (
            categories.map((item) => (
              <Button
                variant={`${category === item ? "secondary" : "dark"}`}
                className="text-center text-capitalize"
                onClick={(e) => {
                  e.preventDefault();
                  setcategory(item);
                }}
              >
                {item}
              </Button>
            ))
          ) : (
            <Spin />
          )}
        </Col>
      </Row>
      <Row>
        {" "}
        {maindatat ? (
          maindatat.map((meal) => {
            if (category === "all dishes" && ( meal.name.includes(search) ||
            (meal.ingredients.includes(search)))) {
              return <Meal Key={meal.id} value={meal} />;
            } else {
              if (category === meal.category&& ( meal.name.includes(search) ||
              (meal.ingredients.includes(search)))) {
                return <Meal Key={meal.id} value={meal} />;
              }
            }
          })
        ) : (
          <Spin />
        )}
      </Row>
    </>
  );
}

export default MenuList;
