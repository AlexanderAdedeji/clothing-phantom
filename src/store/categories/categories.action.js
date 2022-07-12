import { createAction } from "../../utils/reducers/reducers.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.type";


export const setCategoriesMap = (categoriesArray)=>createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)