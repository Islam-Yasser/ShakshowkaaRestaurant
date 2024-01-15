import { Container } from "react-bootstrap";

function Unfound() {
    return ( <>
      <Container className="h-100 w-100 d-flex justify-content-center align-items-center mt-5">
        <div className="d-flex flex-column d-flex justify-content-center align-items-center">
            <h1>Error you have written invalid url !</h1>
        </div>
      </Container>


    </> );
}

export default Unfound;