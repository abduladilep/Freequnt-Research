// import React from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Form.css";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { message } from "antd";
import Logo from "../Navbar/Logo";

function Form() {
  const [validationErrors, setValidationErrors] = useState({});
  const [countriesData, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    state: "",
    city: "",
    dob: "",
    age: "",
    gender: "",
  });

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .matches(
        /^[A-Za-z]+$/,
        "Only alphabetic characters are allowed for firstname"
      )
      .required("First Name is Required"),
    lastname: Yup.string()
      .matches(
        /^[A-Za-z]+$/,
        "Only alphabetic characters are allowed for lastname"
      )
      .required("Last Name is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    dob: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 14)),
        "You must be at least 14 years old"
      )
      .required("Date of Birth is Required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("State is required"),
    age: Yup.string().required("State is required"),
    gender: Yup.string().required("State is required"),
  });

  useEffect(() => {
    axios.get("http://localhost:5001/api/user/service").then((response) => {
      setData(response.data);
    });
  }, []);

  const changeCountry = (event) => {
    setCountry(event.target.value);
    setStates(
      countriesData.find((ctr) => ctr.name === event.target.value).states
    );
    setFormData({
      ...formData,
      country: event.target.value,
    });
  };

  const changeState = (event) => {
    setState(event.target.value);
    setCities(states.find((state) => state.name === event.target.value).cities);
    setFormData({
      ...formData,
      state: event.target.value,
    });
  };

  const changecity = (event) => {
    setCity(event.target.value);
    setFormData({
      ...formData,
      city: event.target.value,
    });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age.toString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const age = calculateAge(value);
      setFormData({
        ...formData,
        [name]: value,
        age: age,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      axios
        .post("http://localhost:5001/api/user/formdata", formData)
        .then((response) => {
          console.log("server response: " + response.data);
          message.success("Details Saved Succefully!");
        })
        .catch((error) => {
          console.error("Error", error);
          message.error("An error occurred while processing the transaction.");
        });
    } catch (error) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setValidationErrors(errors);
      message.error("An error occurred while Validating!");
    }
  };

  return (
    <div className="maindiv">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.5 }}>
          <Logo />
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <div className="Form">
              <div className="mb-5 text-white">
                <h1>Registration</h1>
              </div>
              {/* </div> */}

              <Container>
                <form onSubmit={handleSubmit}>
                  <Row className=" custom-row mb-5">
                    <Col sm={12} className="mb-3">
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Fistname"
                        className="form-control"
                        value={formData.firstname}
                        onChange={handleInputChange}
                      />
                      {validationErrors.firstname && (
                        <span className="text-danger">
                          {validationErrors.firstname}
                        </span>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3">
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Lastname"
                        className="form-control"
                        value={formData.lastname}
                        onChange={handleInputChange}
                      />
                      {validationErrors.lastname && (
                        <span className="text-danger">
                          {validationErrors.lastname}
                        </span>
                      )}
                    </Col>
                    <Col sm={12} className="mb-3 ">
                      <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {validationErrors.email && (
                        <span className="text-danger">
                          {validationErrors.email}
                        </span>
                      )}
                    </Col>
                    <Col sm={4} className="mb-3">
                      <select
                        name="country"
                        value={country}
                        className="form-control"
                        placeholder="Select "
                        onChange={changeCountry}
                      >
                        <option>Select Country</option>
                        {countriesData.map((country) => (
                          <option key={country.name} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {validationErrors.country && (
                        <span className="text-danger">
                          {validationErrors.country}
                        </span>
                      )}
                    </Col>
                    <Col sm={4} className="mb-3">
                      <select
                        name="state"
                        className="form-control"
                        placeholder="Select Country"
                        onChange={changeState}
                        value={state}
                      >
                        <option value="">Select State</option>
                        {states.map((stateItem, index) => (
                          <option key={index} value={stateItem.name}>
                            {stateItem.name}
                          </option>
                        ))}
                      </select>
                      {validationErrors.state && (
                        <span className="text-danger">
                          {validationErrors.state}
                        </span>
                      )}
                    </Col>
                    <Col sm={4} className="mb-3">
                      <select
                        name="country"
                        value={city}
                        className="form-control"
                        placeholder="Select city"
                        onChange={changecity}
                      >
                        <option value="">Select city</option>
                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {validationErrors.city && (
                        <span className="text-danger">
                          {validationErrors.city}
                        </span>
                      )}
                    </Col>
                    <Col sm={6} className="mb-3">
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        placeholder="DOB"
                        value={formData.dob}
                        onChange={handleInputChange}
                        max="2009-12-31"
                      />
                    </Col>
                    {validationErrors.dob && (
                      <span className="text-danger">
                        {validationErrors.dob}
                      </span>
                    )}
                    <Col className="mb-3">
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleInputChange}
                        readOnly={true}
                      />
                      {validationErrors.age && (
                        <span className="text-danger">
                          {validationErrors.age}
                        </span>
                      )}
                    </Col>
                    <Col sm={6} className="mb-3 text-white">
                      <label>Gender:</label>
                      {validationErrors.gender && (
                        <span className="text-danger">
                          {validationErrors.gender}
                        </span>
                      )}
                      <div className="form-check form-check-inline text-white">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          id="male"
                          className="form-check-input"
                          checked={formData.gender === "male"}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="male" className="form-check-label">
                          Male
                        </label>
                      </div>
                      <div className="form-check  text-white form-check-inline">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          id="female"
                          checked={formData.gender === "female"}
                          className="form-check-input"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="female" className="form-check-label">
                          Female
                        </label>
                      </div>
                    </Col>
                    <div>
                      <Button
                        type="submit"
                        style={{
                          width: "150px",
                          height: "40px",
                          backgroundColor: "blue",
                          color: "white",
                          margin: "0 auto",
                          display: "block",
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Row>
                </form>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Form;
