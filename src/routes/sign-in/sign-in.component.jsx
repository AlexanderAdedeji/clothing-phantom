import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form-component";



const SignIn = () => {
  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    },
    []
  );

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In WIth Google Pop Up</button>
      <button onClick={logGoogleRedirectUser}>
        Sign In WIth Google Redirect
      </button>

      <SignUpForm/>
    </div>
  );
};

export default SignIn;
