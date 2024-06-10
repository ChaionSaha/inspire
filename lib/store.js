const { createSlice, configureStore } = require("@reduxjs/toolkit")

const initialState = {
    cart: [],
    billingInfo: {},
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload.item;
            const quantity = action.payload.quantity;
            let existing = state.cart.find(cartItem => (cartItem.id === item.id) && (cartItem.selectedSize.value === item.selectedSize.value));

            if (existing)
            {
                existing.quantity += quantity;
                const newCart = state.cart.map(cartItem => (cartItem.id === item.id) && (cartItem.selectedSize.value === item.selectedSize.value) ? existing : cartItem);
                state.cart = newCart;
            }
            else {
                state.cart.push({ ...item, quantity });
            }
        },

        removeFromCart(state, action) {
            const item = action.payload;
            state.cart = state.cart.filter(cartItem => (cartItem.id !== item.id) || (cartItem.selectedSize.value !== item.selectedSize.value));
        },

        incrementItem(state, action) {
            const item = action.payload;
            let existing = state.cart.find(cartItem => (cartItem.id === item.id) && (cartItem.selectedSize.value === item.selectedSize.value));

            if (existing)
            {
                existing.quantity += 1;
                const newCart = state.cart.map(cartItem => (cartItem.id === item.id) && (cartItem.selectedSize.value === item.selectedSize.value) ? existing : cartItem);
                state.cart = newCart;
            }
        },

        decrementItem(state, action) {
            const item = action.payload;
            let existing = state.cart.find(cartItem => (cartItem.id === item.id) && (cartItem.selectedSize.value === item.selectedSize.value));

            if (existing) {
                if(existing.quantity > 1)
                    existing.quantity -= 1;
                const newCart = state.cart.map(cartItem => (cartItem.id === item.id) && (cartItem.selectedSize.value === item.selectedSize.value) ? existing : cartItem);
                state.cart = newCart;
            }
        },

        addBillingInfo(state, action) {
            state.billingInfo = action.payload;
        },

        removeBillingInfo(state) {
            state.billingInfo = {};
        }
    }
})

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

export default store;
export const { addToCart, removeFromCart, incrementItem, decrementItem, addBillingInfo, removeBillingInfo } = cartSlice.actions;