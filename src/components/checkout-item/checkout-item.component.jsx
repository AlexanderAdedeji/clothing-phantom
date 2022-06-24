import React from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";
const CheckoutItem = ({ cartItem }) => {
  const {
    removeItemFromCart,
    reduceCartItemQuantity,
    addItemToCart,
    
  } = useContext(CartContext);
  const { name, imageUrl, price, quantity, id } = cartItem;

  const removeItemHandler =()=>removeItemFromCart(id)
  const reduceItemHandler =()=>reduceCartItemQuantity(cartItem)
  const increaseItemHandler =()=>addItemToCart(cartItem)
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={reduceItemHandler}>&#10094;</div>
        <span className="value">{quantity} </span>
        <div className="arrow" onClick={increaseItemHandler}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={removeItemHandler}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
