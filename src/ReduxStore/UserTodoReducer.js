import * as actionTypes from './ConstantNames';

const initialState = {
    Loading: false,
    TabCheck: "Todo",
    DateBox: "",
    InsertTodo: {
        TodoDate: "",
        TodoAction: ""
    },
    InsertUser: {
        UserName: "",
        UserEmail: ""
    },
    TodoList: [],
    UserList: [],
    visible: false,
    UserID: "",
    Flag: "I",
    ActionError: false,
    DateError: false,
    nameError: false,
    EmailError: false,
    Error: false,
};

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "RESET_TODOUSER":
            return initialState;
        case actionTypes.USERID:
            return {
                ...state, UserID: action.value
            };
        case actionTypes.FLAG:
            return {
                ...state, Flag: action.value
            };
        case actionTypes.LOADING:
            return {
                ...state, Loading: action.value
            };
        case actionTypes.VISIBLE:
            return {
                ...state, visible: action.value
            };
        case actionTypes.TABCHECK:
            return {
                ...state, TabCheck: action.value
            };
        case actionTypes.DATEBOX:
            return {
                ...state, DateBox: action.value
            };
        case actionTypes.INSERTTODO:
            return {
                ...state, InsertTodo: action.value
            };
        case actionTypes.INSERTUSER:
            return {
                ...state, InsertUser: action.value
            };
        case actionTypes.TODOLIST:
            return {
                ...state, TodoList: action.value
            };
        case actionTypes.USERLIST:
            return {
                ...state, UserList: action.value
            };

        case actionTypes.ACTIONERROR:
            return {
                ...state, ActionError: action.value
            };
        case actionTypes.DATEERROR:
            return {
                ...state, DateError: action.value
            };
        case actionTypes.NAMEERROR:
            return {
                ...state, nameError: action.value
            };
        case actionTypes.EMAILERROR:
            return {
                ...state, EmailError: action.value
            };
        case actionTypes.ERROR:
            return {
                ...state, Error: action.value
            };
        case "CLEAR_FIELD":
            return {
                ...state,
                Loading: false,
                TabCheck: "Todo",
                InsertTodo: {
                    TodoDate: "",
                    TodoAction: ""
                },
                InsertUser: {
                    UserName: "",
                    UserEmail: ""
                },
                visible: false,
                UserID: "",
                Flag: "I",
                DateBox: "",
                ActionError: false,
                DateError: false,
                nameError: false,
                EmailError: false,
                Error: false,
            }
        default:
            return state;
    }
}
export default TodoReducer;