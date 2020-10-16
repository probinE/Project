import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Button } from 'antd';
import ModelWindow from "./ModelWindow";
import TodoDashboard from "./TodoDashboard";
import UserDashboard from "./UserDashboard";
import { connect } from 'react-redux';
import { store } from '../ReduxStore/Store';
import * as ActionCreator from '../ReduxStore/Actions';
const { TabPane } = Tabs;
class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false
        };
    }
    async componentDidMount() {
        this.props.ClearField();
        await store.dispatch({ type: "RESET_TODOUSER" })
    }
    showModal = (e) => {
        debugger;
        let TabCheck = e.currentTarget.id;
        this.props.ClearField();
        if (TabCheck === "User") {
            this.setState({
                visible: true,
            });
            store.dispatch({ type: "TabCheck", value: "User" })
        }
        else {
            store.dispatch({ type: "TabCheck", value: "Todo" })
        }
        store.dispatch({ type: "visible", value: true })
        store.dispatch({ type: "Loading", value: false })
        store.dispatch({ type: "Flag", value: "I" })

    };
    handleCancel = e => {
        debugger;
        store.dispatch({ type: "visible", value: false })
    };
    OnchangeTodo = e => {
        debugger;
        store.dispatch({ type: "ActionError", value: false })
        let InsertTodo = this.props.UserTodo.InsertTodo;
        InsertTodo[e.target.name] = e.target.value;
        store.dispatch({ type: "InsertTodo", value: InsertTodo })
    }
    OnchangeTodoDate = e => {
        debugger;
        store.dispatch({ type: "DateError", value: false })
        let InsertTodo = this.props.UserTodo.InsertTodo;
        if (e != null) {
            InsertTodo["TodoDate"] = e;
        }
        else {
            InsertTodo["TodoDate"] = "";
        }
        store.dispatch({ type: "InsertTodo", value: InsertTodo })
    }
    OnchangeUser = e => {
        debugger;
        if (e.target.name == "UserName") {
            store.dispatch({ type: "nameError", value: false })
        }
        if (e.target.name == "UserEmail") {
            store.dispatch({ type: "EmailError", value: false })
        }
        let InsertUser = this.props.UserTodo.InsertUser;
        InsertUser[e.target.name] = e.target.value;
        store.dispatch({ type: "InsertUser", value: InsertUser })
    }
    handleOk = e => {
        debugger;
        if (this.props.UserTodo.TabCheck === "Todo") {
            this.InsertTodo();
        }
        else {
            this.InsertUser();
        }
    };
    InsertTodo = async (e) => {
        debugger;
        await store.dispatch({ type: "Error", value: false })
        await store.dispatch({ type: "ActionError", value: false })
        await store.dispatch({ type: "DateError", value: false })
        let InsertTodo = this.props.UserTodo.InsertTodo;
        if (InsertTodo.TodoAction == "") {
            await store.dispatch({ type: "Error", value: true })
            await store.dispatch({ type: "ActionError", value: true })
        }
        if (InsertTodo.TodoDate == "") {
            await store.dispatch({ type: "Error", value: true })
            await store.dispatch({ type: "DateError", value: true })
        }
        if (this.props.UserTodo.Error === true) {
            return false;
        }
        let TodoList = this.props.UserTodo.TodoList;
        let UpdateTodo;
        if (this.props.UserTodo.Flag == "U") {
            UpdateTodo = TodoList.filter(Todo => Todo.key == this.props.UserTodo.UserID)
            if (UpdateTodo.length > 0) {
                for (let i = 0; i < TodoList.length; i++) {
                    if (TodoList[i].key == UpdateTodo[0].key) {
                        TodoList[i].Action = InsertTodo.TodoAction;
                        TodoList[i].DateAdded = InsertTodo.TodoDate;
                    }
                }
            }
        }
        else {
            let UniqueID = (new Date().getTime()).toString(10);;
            TodoList.push({ key: UniqueID, Action: InsertTodo.TodoAction, DateAdded: InsertTodo.TodoDate });
        }
        await store.dispatch({ type: "Loading", value: true })
        debugger;
        this.props.AddTodo(TodoList);
        debugger;
        this.props.HideVisible({ type: "visible", value: false });
    }
    InsertUser = async (e) => {
        debugger;
        await store.dispatch({ type: "Error", value: false })
        await store.dispatch({ type: "nameError", value: false })
        await store.dispatch({ type: "EmailError", value: false })
        let InsertUser = this.props.UserTodo.InsertUser;
        if (InsertUser.UserName == "") {
            await store.dispatch({ type: "Error", value: true })
            await store.dispatch({ type: "nameError", value: true })
        }
        if (InsertUser.UserEmail == "") {
            await store.dispatch({ type: "Error", value: true })
            await store.dispatch({ type: "EmailError", value: true })
        }
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(InsertUser.UserEmail)) {
            await store.dispatch({ type: "Error", value: true })
            await store.dispatch({ type: "EmailError", value: true })
        }
        if (this.props.UserTodo.Error === true) {
            return false;
        }
        let UserList = this.props.UserTodo.UserList;
        let UpdateUser;
        if (this.props.UserTodo.Flag == "U") {
            UpdateUser = UserList.filter(User => User.key == this.props.UserTodo.UserID)
            if (UpdateUser.length > 0) {
                for (let i = 0; i < UserList.length; i++) {
                    if (UserList[i].key == UpdateUser[0].key) {
                        UserList[i].name = InsertUser.UserName;
                        UserList[i].EmailID = InsertUser.UserEmail;
                    }
                }
            }
        }
        else {
            let UniqueID = (new Date().getTime()).toString(10);;
            UserList.push({ key: UniqueID, name: InsertUser.UserName, EmailID: InsertUser.UserEmail });
        }

        await store.dispatch({ type: "Loading", value: true })
        this.props.AddUser(UserList);
        this.props.HideVisible({ type: "visible", value: false });

    }

    render() {
        return (
            <div className="container">
                <h5>Todos Users</h5>
                <Tabs defaultActiveKey={this.props.UserTodo.TabCheck}>
                    <TabPane tab="Todos" key="Todo">
                        <Button style={styles.Button} type="primary" id="Todo" onClick={this.showModal}>Add Todos</Button>
                        <TodoDashboard props={this.state} />
                    </TabPane>
                    <TabPane tab="Users" key="User">
                        <Button style={styles.Button} type="primary" id="User" onClick={this.showModal}>Add Users</Button>
                        <UserDashboard {...this.state} />
                    </TabPane>
                </Tabs>
                <ModelWindow
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    OnchangeTodo={this.OnchangeTodo}
                    OnchangeUser={this.OnchangeUser}
                    OnchangeTodoDate={this.OnchangeTodoDate}
                    props={this.state}
                />
            </div>

        );
    }
}
const styles = {
    Button: {
        borderRadius: '5px'
    }
}
const mapStatetoProps = state => {
    return {
        UserTodo: state.UserTodo
    };
}
const mapDispatchtoProps = dispatch => {
    return {
        AddTodo: (payload) => dispatch(ActionCreator.AddTodoDetails(payload)),
        AddUser: (payload) => dispatch(ActionCreator.AddUserDetails(payload)),
        HideVisible: (payload) => dispatch(ActionCreator.HideVisibleAction(payload)),
        ClearField: () => dispatch(ActionCreator.ClearFieldStore()),
    };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Todos); 
