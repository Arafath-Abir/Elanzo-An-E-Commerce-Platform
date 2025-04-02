import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (parseInt(existingItem.quantity) || 0) + 1;
            } else {
                const item = { ...action.payload };
                // Ensure price is a number
                item.price = parseFloat(item.price || 0);
                
                // Handle offer data
                if (item.offer?.isActive) {
                    item.offer = {
                        ...item.offer,
                        discountPercentage: parseFloat(item.offer.discountPercentage || 0),
                        discountedPrice: parseFloat(item.price) * (1 - parseFloat(item.offer.discountPercentage || 0) / 100)
                    };
                }
                
                // Set initial quantity
                item.quantity = 1;
                
                state.push(item);
            }
        },
        deleteFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity = (parseInt(item.quantity) || 0) + 1;
                // Recalculate offer price if needed
                if (item.offer?.isActive) {
                    item.offer.discountedPrice = parseFloat(item.price) * (1 - parseFloat(item.offer.discountPercentage) / 100);
                }
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity = Math.max(1, (parseInt(item.quantity) || 2) - 1);
                // Recalculate offer price if needed
                if (item.offer?.isActive) {
                    item.offer.discountedPrice = parseFloat(item.price) * (1 - parseFloat(item.offer.discountPercentage) / 100);
                }
            }
        },
        clearCart: (state) => {
            return [];
        }
    }
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;