import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
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
    const response = await dispatch(login(data));
    if (response) {
      setMessage("Login successful");
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } else {
      setMessage("Fill out the form");
    }
  };
  return (
    <div className="login">
      <Container className="container">
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" onChange={handleInputChange} />
        </FormControl>
        <Button id="button" variant="contained" onClick={handleClick}>
          Login
        </Button>
        {message && <span>{message}</span>}
      </Container>
    </div>
  );
};

export default Login;
