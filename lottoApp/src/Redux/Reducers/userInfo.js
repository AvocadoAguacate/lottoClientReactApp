const userInfo = (state = '', action) => {
    switch (action.type) {
        case 'ADD_ID':
            return action.payload
    }
    return state
}

export default userInfo