import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import UserTodoReducer from './UserTodoReducer';
import createEncryptor from "redux-persist-transform-encrypt"

const encryptor = createEncryptor({
    secretKey: "my-super-secret-key",
    onError: function (error) {
        // Handle the error.
    }
})
const persistConfig = {
    key: "FrontEndroot",
    storage,
    whiteList: ['UserTodoReducer'],
    transforms: [encryptor],
}


const RootReducer = combineReducers({
    UserTodo: UserTodoReducer
});

export default persistReducer(persistConfig, RootReducer);