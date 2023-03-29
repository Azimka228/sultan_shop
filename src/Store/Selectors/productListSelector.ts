import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";

const selectSelf = (state: RootState) => state
export const mainItemsSelector = createSelector(selectSelf, state => state.productList.productsList)


