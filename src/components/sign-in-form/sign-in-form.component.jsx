import {
  //  useEffect,
  useState,
} from "react";
// import { getRedirectResult } from "firebase/auth";
import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log(response);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User does not exist");
          break;
        case "auth/wrong-password":
          alert("Incorrect passoword");
          break;

        default:
          console.log(error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formFields);
  };

  // useEffect(
  //   () => async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       await createUserDocumentFromAuth(response.user);
  //     }
  //   },
  //   []
  // );

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user);
  // };

  return (
    <div className="sign-up-container">
      <h1>Already have an account?</h1>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={logGoogleUser} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
