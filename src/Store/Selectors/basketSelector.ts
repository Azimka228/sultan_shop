import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";

const selectSelf = (state: RootState) => state
export const basketBalanceSelector = createSelector(selectSelf, state => state.basket.balance)
export const basketWalletSelector = createSelector(selectSelf, state => state.basket.wallet)
export const basketItemsSelector = createSelector(selectSelf, state => state.basket.items)


