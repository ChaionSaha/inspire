const { createSlice, configureStore } = require("@reduxjs/toolkit")

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload.item;
            const quantity = action.payload.quantity;
            let existing = state.cart.find(cartItem => cartItem.id === item.id);

            if (existing)
            {
                existing.quantity += quantity;
                const newCart = state.cart.map(cartItem => cartItem.id === item.id ? existing : cartItem);
                state.cart = newCart;
            }
            else {
                state.cart.push({ ...item, quantity });
            }
        },

        removeFromCart(state, action) {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },

        incrementItem(state, action) {
            const item = action.payload.item;
            const quantity = action.payload.quantity;
            let existing = state.cart.find(cartItem => cartItem.id === item.id);

            if (existing)
            {
                existing.quantity += quantity;
                const newCart = state.cart.map(cartItem => cartItem.id === item.id ? existing : cartItem);
                state.cart = newCart;
            }
        },

        decrementItem(state, action) {
            const item = action.payload.item;
            const quantity = action.payload.quantity;
            let existing = state.cart.find(cartItem => cartItem.id === item.id);

            if (existing) {
                existing.quantity -= quantity;
                const newCart = state.cart.map(cartItem => cartItem.id === item.id ? existing : cartItem);
                state.cart = newCart;
            }
        }
    }
})

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

export default store;
export const { addToCart, removeFromCart, incrementItem, decrementItem } = cartSlice.actions;