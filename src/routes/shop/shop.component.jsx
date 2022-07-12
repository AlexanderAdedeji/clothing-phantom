import { Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesAsync,
  setCategoriesMap,
} from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
