import React, { useRef, useState } from "react";
import "./SignUp.module.css";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
fontawesome.library.add(faCheck);

function SignUp() {
  const [loading, setloading] = useState(false);
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const name = useRef();
  const phonenumber = useRef();
  const { signup } = useAuth();
  const navi = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, "Too Short!")
      .max(26, "Too Long!")
      .required("Required"),
    name: yup
      .string()
      .min(3, "Too Short!")
      .max(26, "Too Long!")
      .required("Required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(2, "can't be smaller 2 ")
      .max(12, "can't be longer 12")
      .required("Password is required"),
    passwordconfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phonenumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(11)
      .max(11),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      phonenumber: "",
      password: "",
      passwordconfirmation: "",
    },

    validationSchema,
  });
  const handleformsubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      await signup(
        formik.values.email,
        formik.values.password,
        formik.values.name,
        formik.values.username,
        formik.values.phonenumber
        
      );
      navi("/home");
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  const { currentuser } = useAuth();
  const navi1 = useNavigate();
  if (Object.keys(currentuser).length > 1) {
    navi1("/home");
  }

  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center mb-5">
      <Card className="d-flex mt-5 w-50">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleformsubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="UserName">User Name</Form.Label>
              {formik.errors.username && formik.touched.username && (
                <div className="alert p-2 mt-2 alert-danger">
                  {formik.errors.username}
                </div>
              )}
              {!formik.errors.username && formik.touched.username ? (
                <FontAwesomeIcon
                  className="ms-1"
                  icon="fa-solid fa-check"
                  bounce
                  style={{ color: "#00ff4c" }}
                />
              ) : null}
              <Form.Control
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                ref={username}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="UserName">Name</Form.Label>
              {formik.errors.name && formik.touched.name && (
                <div className="alert p-2 mt-2 alert-danger">
                  {formik.errors.name}
                </div>
              )}
              {!formik.errors.name && formik.touched.name ? (
                <FontAwesomeIcon
                  className="ms-1"
                  icon="fa-solid fa-check"
                  bounce
                  style={{ color: "#00ff4c" }}
                />
              ) : null}
              <Form.Control
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                ref={name}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
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
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                ref={email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="phone">Phone Number</Form.Label>
              {formik.errors.phonenumber && formik.touched.phonenumber && (
                <div className="alert p-2 mt-2 alert-danger">
                  {formik.errors.phonenumber}
                </div>
              )}
              {!formik.errors.phonenumber && formik.touched.phonenumber ? (
                <FontAwesomeIcon
                  className="ms-1"
                  icon="fa-solid fa-check"
                  bounce
                  style={{ color: "#00ff4c" }}
                />
              ) : null}
              <Form.Control
                id="phonenumber"
                name="phonenumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phonenumber}
                ref={phonenumber}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
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
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                ref={password}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password-confirm">
                Password Confirmation
              </Form.Label>
              {formik.errors.passwordconfirmation &&
                formik.touched.passwordconfirmation && (
                  <div className="alert p-2 mt-2 alert-danger">
                    {formik.errors.passwordconfirmation}
                  </div>
                )}
              {!formik.errors.passwordconfirmation &&
              formik.touched.passwordconfirmation ? (
                <FontAwesomeIcon
                  className="ms-1"
                  icon="fa-solid fa-check"
                  bounce
                  style={{ color: "#00ff4c" }}
                />
              ) : null}

              <Form.Control
                id="passwordconfirmation"
                name="passwordconfirmation"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordconfirmation}
                required
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-3">
          Already have an account? <Link to="/signin">Log In</Link>
        </div>
      </Card>
    </div>
  );
}

export default SignUp;
