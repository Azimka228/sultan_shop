import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";

const selectSelf = (state: RootState) => state
export const filterSortBySelector = createSelector(selectSelf, state => state.productListFilter.sortBy)
export const filterByMaxPriceSelector = createSelector(selectSelf, state => state.productListFilter.maxPrice)
export const filterByMinPriceSelector = createSelector(selectSelf, state => state.productListFilter.minPrice)
export const filterCurrentPageSelector = createSelector(selectSelf, state => state.productListFilter.currentPage)
export const filterCountPerPageSelector = createSelector(selectSelf, state => state.productListFilter.countPerPage)
export const filterSortByItemTypeSelector = createSelector(selectSelf, state => state.productListFilter.sortByItemType)
export const sortByListSelector = createSelector(selectSelf, state => state.productListFilter.sortByList)
export const itemsCopySelector = createSelector(selectSelf, (state) => state.productListFilter.productsListCopy)
export const itemsSelector = createSelector(selectSelf, (state) => state.productListFilter.productsList)

