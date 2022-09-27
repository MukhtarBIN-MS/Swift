import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../margin";
import { AccountContext } from "./accountContext";
import { useHistory } from "react-router";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [typing, setTyping] = useState(null);

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const username = useRef();

  const history = useHistory();

  const [eml, setEml] = useState("");
  const [usernm, setUsernm] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const HandleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/users/register", user);
        switchToSignin();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={HandleRegister}>
        <Input
          type="email"
          required
          value={eml}
          ref={email}
          
          onChange={(e) => setEml(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          required
          value={pass}
          ref={password}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />
        <Input
          type="password"
          required
          value={confirmPass}
          ref={confirmPassword}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
        />
        <Input
          type="text"
          required
          value={usernm}
          ref={username}
          onChange={(e) => setUsernm(e.target.value)}
          placeholder="Choose username"
        />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
