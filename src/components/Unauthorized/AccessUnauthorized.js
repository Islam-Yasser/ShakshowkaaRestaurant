import { faFaceGrinBeamSweat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import fontawesome from "@fortawesome/fontawesome";
import UnsignedNav from "./unsignedNav";
import { Link } from "react-router-dom";

fontawesome.library.add(faFaceGrinBeamSweat);

function Unauthorized() {
  return (
    <>
      <Container className="h-100 w-100 d-flex justify-content-center align-items-center mt-5">
        <div className="d-flex flex-column d-flex justify-content-center align-items-center">
            <h1>Hungrrry ?</h1>
          <h3>
            <Link to="/" >Create account</Link> Or <Link to="/signin">Sign in</Link> 
            {' '}to buy our meals and fill ur stomach{" "}
            <FontAwesomeIcon icon={faFaceGrinBeamSweat} bounce />
          </h3>
        </div>
      </Container>
    </>
  );
}

export default Unauthorized;
