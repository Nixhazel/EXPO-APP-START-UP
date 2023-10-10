import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Customer } from '_/@types/models';

export type CustomerState = Partial<Customer>;

const initialState: CustomerState = {};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (_, action: PayloadAction<Customer>) => {
      return action.payload as Customer;
    },
    modifyCustomer: (state, action: PayloadAction<Partial<Customer>>) => {
      return { ...state, ...action.payload };
    },
    resetCustomer: () => {
      return {};
    },
  },
});

export const { addCustomer, modifyCustomer, resetCustomer } = customerSlice.actions;
