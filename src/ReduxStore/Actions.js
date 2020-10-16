function AddTodos(TodoList) {
    return {
        type: 'TodoList', value: TodoList
    };
}

function AddUsers(UserList) {
    return {
        type: 'UserList', value: UserList
    };
}
export const AddTodoDetails = (Todo) => {
    debugger;
    return function (dispatch) {
        dispatch(AddTodos(Todo))
        // setTimeout(() => {
        //     dispatch(AddTodos(Todo))
        // }, 3000)
    };
}
export const AddUserDetails = (UserList) => {
    debugger;
    return function (dispatch) {
        dispatch(AddUsers(UserList))
        // setTimeout(() => {
        //     dispatch(AddUsers(UserList))
        // }, 3000)
    };
}
export const HideVisibleAction = (HideVisible) => {
    debugger;
    return function (dispatch) {
        setTimeout(() => {
            dispatch(HideVisible)
        }, 3000)
    };
}
function ClearField() {
    return {
        type: 'CLEAR_FIELD'
    };
}
export const ClearFieldStore = () => {
    debugger;
    return function (dispatch) {
        dispatch(ClearField())
    };
}