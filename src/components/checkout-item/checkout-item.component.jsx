import React from "react";
import { useDispatch,useSelector } from "react-redux";


import "./checkout-item.styles.scss";
import {
  addItemToCart,
  reduceCartItemQuantity,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems)

  const { name, imageUrl, price, quantity, id } = cartItem;

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems,id));
  const reduceItemHandler = () => dispatch(reduceCartItemQuantity(cartItems,cartItem));
  const increaseItemHandler = () => dispatch(addItemToCart(cartItems,cartItem));
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={reduceItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity} </span>
        <div className="arrow" onClick={increaseItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
