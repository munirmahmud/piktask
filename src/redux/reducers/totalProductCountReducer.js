const initialValue = [];
export const totalProductCountReducer = (state = initialValue, action) => {
    switch (action.type) {
        case "TOTAL_PRODUCT_COUNT":
            return action.payload;
        default:
            return state;
    }
}