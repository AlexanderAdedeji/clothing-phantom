import {
  useState,
} from "react";
// import { getRedirectResult } from "firebase/auth";
import {useDispatch} from 'react-redux'
import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    debugger
    dispatch(googleSignInStart());
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
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

  // const logGoogleUser = async () => {
  //    await signInWithGooglePopup();


  // };

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
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
