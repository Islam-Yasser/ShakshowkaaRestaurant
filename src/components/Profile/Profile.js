import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";
function Profile() {
  const { currentuser } = useAuth();

  return (
    <>
      <Container>
        <Row>
          <Col className="col-6 mt-5">
            <h3 className="text-center">{currentuser.name}'s Profile</h3>
            <Row>
              {currentuser.order?.map((ord) =>
                ord.items?.map((item, index) => (
                  <Col className="col-6 col-md-4">
                    <Card className="card" key={index}>
                      <Card.Img
                        variant="top"
                        src={item.image}
                        className="image"
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                          Quantity of item : {item.quantity}
                        </Card.Text>
                        <Card.Text>Place of Shippment : {ord.addressOfShipment} </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        Total price for this item
                        is {item.quantity * item.price}$
                      </Card.Footer>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>

          <Col className="col-6 mt-5">
            <h3 className="text-center">Information</h3>
            <Form className="light-style flex-grow-1 container-p-y main">
              <div className="card overflow-hidden ">
                <div className="row no-gutters row-bordered row-border-light">
                  <div className="col-md-9">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="account-general"
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                              type="text"
                              className="form-control mb-3 opacity-75"
                              value={currentuser.username}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control mb-3 opacity-75"
                              value={currentuser.name}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">E-mail</label>
                            <input
                              type="text"
                              className="form-control mb-3 opacity-75"
                              value={currentuser.email}
                            />
                            <label className="form-label">Phone Number</label>
                            <input
                              type="tel"
                              className="form-control mb-3 opacity-75"
                              value={currentuser.phone}
                            />
                            <div className="form-group">
                              <label className="form-label">
                                Current password
                              </label>
                              <input
                                type="password"
                                className="form-control mb-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right mt-3 mb-5">
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
                &nbsp;
                <button type="button" className="btn btn-default">
                  Cancel
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
