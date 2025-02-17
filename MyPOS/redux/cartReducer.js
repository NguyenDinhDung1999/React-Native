const initialState = {
    cart: [],
    products: [
        { id: '1', name: 'Sản phẩm 1', price: 100, code: 'SP001' },
        { id: '2', name: 'Sản phẩm 2', price: 200, code: 'SP002' },
        { id: '3', name: 'Sản phẩm 3', price: 300, code: 'SP003' },
    ],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProduct = state.cart.find(item => item.id === action.payload.id);
            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };

        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.payload] };

        case 'REMOVE_PRODUCT':
            return { ...state, products: state.products.filter(item => item.id !== action.payload) };

        default:
            return state;
    }
};

export default cartReducer;
