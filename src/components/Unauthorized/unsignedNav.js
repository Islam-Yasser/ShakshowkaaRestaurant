import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UnsignedNav() {
const {currentuser}=useAuth();
  if(!currentuser?.name){
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="d-flex justify-content-around">
        <Link to="/" className="navbar-brand">
            Contact Us
          </Link>
        <Link to="/" className="navbar-brand">
            Shakshowkaa
          </Link>
        <Link to="/home" className="navbar-brand">
            Menu
          </Link>
        </Container>
      </Navbar>
    </Container>
  );}

}

export default UnsignedNav;
