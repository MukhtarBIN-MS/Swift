import React, { useContext, useRef } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../margin";
import { loginCall } from "../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { AccountContext } from "./accountContext";
import { AuthContext } from "../../context/AuthContext";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();
    loginCall({email:email.current.value, password:password.current.value}, dispatch);
  };
console.log(user);

  return (
    <BoxContainer>
      <FormContainer onSubmit={submitHandler}>
        <Input type="email" required ref={email} placeholder="Email" />
        <Input
          className="loginInput"
          type="password"
          required
          ref={password}
          placeholder="Password"
        />

        <SubmitButton type="submit">{ isFetching ? <CircularProgress color="white" size="20px" /> : 'Login'}</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
