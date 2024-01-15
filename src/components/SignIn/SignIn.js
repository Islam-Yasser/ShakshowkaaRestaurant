import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";

fontawesome.library.add(faCheck);

function SignIn() {
  const { signin } = useAuth();
  const navi = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(2, "can't be smaller 2 ")
      .max(12, "can't be longer 12")
      .required("Password is required"),
  });
  const handleformsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formik.values.email);
      let flag = await signin(formik.values.email, formik.values.password);
      if (flag) {
        navi("/home");
        window.location.reload();
      }
      else{
        Swal.fire({
          title: "Error!",
          text: "Aww ,You are not registered in our website please register first from signUp .",
          icon: "error",
          confirmButtonText: "Got it !",
          timer: 3500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,
  });
  const {currentuser}=useAuth();
  const navi1 = useNavigate();
  if (Object.keys(currentuser).length > 1) {
    navi1('/home')
  }

  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <Card className="d-flex mt-5 w-50">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleformsubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              {formik.errors.email && formik.touched.email && (
                <div className="alert p-2 mt-2 alert-danger">
                  {formik.errors.email}
                </div>
              )}
              {!formik.errors.email && formik.touched.email ? (
                <FontAwesomeIcon
                  className="ms-1"
                  icon="fa-solid fa-check"
                  bounce
                  style={{ color: "#00ff4c" }}
                />
              ) : null}
              <Form.Control
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              {formik.errors.password && formik.touched.password && (
                <div className="alert p-2 mt-2 alert-danger">
                  {formik.errors.password}
                </div>
              )}
              {!formik.errors.password && formik.touched.password ? (
                <FontAwesomeIcon
                  className="ms-1"
                  icon="fa-solid fa-check"
                  bounce
                  style={{ color: "#00ff4c" }}
                />
              ) : null}
              <Form.Control
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}

export default SignIn;
