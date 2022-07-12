import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {   useEffect } from "react";
import {
  auth,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
// import { createAction } from "./utils/reducers/reducers.utils";
import { setCurrentUser } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Auth from "./routes/auth/auth.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";

const App = () => {

  const dispatch =useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      
      dispatch(setCurrentUser(user))
      // dispatch(createAction(setCurrentUser(user)));
    });
    return unsubscribe;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<CheckOut/>} />
      </Route>
    </Routes>
  );
};

export default App;
