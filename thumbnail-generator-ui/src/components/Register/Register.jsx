import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await dispatch(register(data));
    if (response) {
      setMessage(response.data);
      setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
    } else {
      setMessage("Fill out the form");
    }
  };

  return (
    <div className="register">
      <Container className="container">
        <FormControl>
          <InputLabel htmlFor="firstname">Firstname</InputLabel>
          <Input
            id="firstname"
            type="text"
            autoComplete="none"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lastname">Lastname</InputLabel>
          <Input
            id="lastname"
            type="text"
            autoComplete="none"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            autoComplete="none"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" onChange={handleInputChange} />
        </FormControl>
        <Button id="button" variant="contained" onClick={handleClick}>
          Register
        </Button>
        {message && <span>{message}</span>}
      </Container>
    </div>
  );
};

export default Register;
