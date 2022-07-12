import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import {NavigationContainer, LogoContainer, NavLink, NavLinks} from"./navigation.styles";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  
  const currentUser = useSelector(selectCurrentUser)
  const selectorState = useSelector(state=>state)
  const isCartOpen  = useSelector(selectIsCartOpen)
  const signOut = async () => {
    await signOutUser();
  };
  return (
    <Fragment>
      <NavigationContainer>

   
    <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>

          {currentUser ? (
            <span className="nav-link" onClick={signOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
        </NavigationContainer>

      <Outlet /> 
  
    </Fragment>
  );
};

export default Navigation;
