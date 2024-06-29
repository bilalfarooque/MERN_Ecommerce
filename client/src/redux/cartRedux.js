import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        //redux toolkit method to oysh items
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
        state.totalQuantity = state.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        );
      }
    },
    sucessOrder:(state,action)=>{
      state.totalQuantity = 0 ,
      state.items = []
      state.totalPrice = 0
  }
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, sucessOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
