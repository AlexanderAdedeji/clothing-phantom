import { Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
const dispatch = useDispatch()
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryArray = await getCategoriesAndDocuments();
  

      dispatch(setCategoriesMap(categoryArray))
    };

    getCategoriesMap();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
