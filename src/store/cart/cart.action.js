import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducers/reducers.utils";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.TOGGLE_CART, boolean);

const addCartItem = (cartItems, productToAdd) => {
  let existingCartItem = cartItems.find((item) => item.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceCartItem = (cartItems, cartItemToReduce) => {
  let existingCartItem = cartItems.find(
    (item) => item.id === cartItemToReduce.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToReduce.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToReduce.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeCartItem = (cartItems, productToRemoveId) => {
  let newCartItem = cartItems.filter((item) => item.id !== productToRemoveId);
  return newCartItem;
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemoveId) => {
  const newCartItems = removeCartItem(cartItems, productToRemoveId);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const reduceCartItemQuantity = (cartItems, productToRemove) => {
  const newCartItems = reduceCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
