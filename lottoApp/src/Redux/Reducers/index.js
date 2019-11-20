import { combineReducers } from 'redux'
import userInfo from './userInfo'
import storeId from './storeId'

export default combineReducers({
    userInfo,
    storeId
})