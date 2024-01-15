import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import "./Head.css";
import { useAuth } from "./context/AuthContext";
import Unauthorized from "./Unauthorized/AccessUnauthorized";

function Head() {
  const{currentuser}=useAuth()
  if(Object.keys(currentuser).length === 1)
  {
    return <Unauthorized/>
  }
  return (
    <Row>
      <Col sm="12" className="justify-content-center text-center">
        <div className="head">Menu</div>
        <div className="d-flex justify-content-center">
          <p className="underline"></p>
        </div>
      </Col>
      <Col>
      <Container>
        
      </Container>
      </Col>

    </Row>
  );
}
export default Head;
