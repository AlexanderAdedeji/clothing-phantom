import React from "react";
import { useEffect, useContext } from "react";
import { useSelector,useDispatch } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import "./checkout.styles.scss";
const CheckOut = () => {

  const dispatch = useDispatch()


  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  useEffect(() => {
    dispatch(setIsCartOpen (false));
  }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((item) => (
        <CheckoutItem cartItem={item} key={item.id} />
      ))}
      <span className="total">Total: ${total}</span>
    </div>
  );
};

export default CheckOut;
