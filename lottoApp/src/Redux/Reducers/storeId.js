const storeId = (state = '', action) => {
    switch (action.type) {
        case 'ADD_STORE_ID':
            return action.payload
    }
    return state
}

export default storeId