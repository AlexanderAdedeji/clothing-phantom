import { useReducer, createContext } from "react";
import { createAction } from "../utils/reducers/reducers.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cartCount: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  reduceCartItem: () => {},
  total: 0,
});

const CART_REDUCER_ACTION = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_CART: "TOGGLE_CART",
};

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  total: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_REDUCER_ACTION.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_REDUCER_ACTION.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in Cart Reducer`);
  }
};
export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, total, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const toggleCartReducer = () => {
    dispatch(createAction(CART_REDUCER_ACTION.TOGGLE_CART, !isCartOpen));
  };

  const udateCartItemsReducers = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(
      createAction(CART_REDUCER_ACTION.SET_CART_ITEMS, {
        cartItems: newCartItems,
        total: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    udateCartItemsReducers(newCartItems);
  };
  const removeItemFromCart = (productToRemoveId) => {
    const newCartItems = removeCartItem(cartItems, productToRemoveId);
    udateCartItemsReducers(newCartItems);
  };

  const reduceCartItemQuantity = (productToRemove) => {
    const newCartItems = reduceCartItem(cartItems, productToRemove);
    udateCartItemsReducers(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen: toggleCartReducer,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    total,
    reduceCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
