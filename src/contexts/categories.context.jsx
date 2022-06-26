import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import {SHOP_DATA} from "../shop-data.js";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  // useEffect(()=>{
  //   console.log(SHOP_DATA)
  //   addCollectionAndDocuments('categories',SHOP_DATA)
  // },[])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
  
      setCategoriesMap(categoryMap)
    };

    getCategoriesMap();
  }, []);

  const [categoriesMap, setCategoriesMap] = useState({});
  const value = {
    categoriesMap,

  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
