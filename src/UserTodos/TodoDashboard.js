import React, { Component } from 'react';
import { Table, Space, Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import * as ActionCreator from '../ReduxStore/Actions';
import { store } from '../ReduxStore/Store';

class TodoDashboard extends Component {
    onEdit = async (key, e) => {
        debugger;
        await store.dispatch({ type: "Loading", value: false })
        debugger;
        let TodoList = this.props.UserTodo.TodoList;
        TodoList = TodoList.filter(Todo => Todo.key == key)
        let InsertTodo = this.props.UserTodo.InsertTodo;
        InsertTodo["TodoDate"] = TodoList[0].DateAdded;
        InsertTodo["TodoAction"] = TodoList[0].Action;
        store.dispatch({ type: "UserID", value: TodoList[0].key })
        store.dispatch({ type: "InsertTodo", value: InsertTodo })
        store.dispatch({ type: "visible", value: true })
        await store.dispatch({ type: "Flag", value: "U" })
    }
    Cancel = (key, e) => {
        debugger;
        return false;
    }
    Confirm = (key, e) => {
        debugger;
        let TodoList = this.props.UserTodo.TodoList;
        TodoList = TodoList.filter(Todo => Todo.key != key)
        this.props.AddTodo(TodoList);
    }
    render() {
        debugger;
        const columns = [

            {
                title: 'Action',
                dataIndex: 'Action',
                key: 'Action',
            },
            {
                title: 'DateAdded',
                dataIndex: 'DateAdded',
                key: 'DateAdded',
            },
            {
                title: 'Operation',
                key: 'Operation',
                render: (text, record) => (
                    <Space size="middle">
                        <a href=" #" onClick={(e) => { this.onEdit(record.key, e); }}>Edit</a>
                        <Popconfirm
                            title="Are you sure, Do you want delete this Todo?"
                            onConfirm={(e) => { this.Confirm(record.key, e); }}
                            onCancel={(e) => { this.Cancel(record.key, e); }}
                            okText="Yes"
                            cancelText="No"
                        ><a href=" #">Delete</a></Popconfirm>

                    </Space>
                ),
            },
        ];
        debugger;
        let data = JSON.parse(JSON.stringify(this.props.UserTodo.TodoList));
        let DataSource = [];
        for (let i = 0; i < data.length; i++) {
            DataSource.push(data[i])
            DataSource[i].DateAdded = DataSource[i].DateAdded.split("T")[0];
        }

        return (
            <div>
                <Table columns={columns} pagination={{ pageSize: 5 }} dataSource={DataSource} />
            </div>
        );
    }
}
const mapStatetoProps = state => {
    debugger;
    return {
        UserTodo: state.UserTodo
    };
}
const mapDispatchtoProps = dispatch => {
    return {
        AddTodo: (payload) => dispatch(ActionCreator.AddTodoDetails(payload)),
    };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(TodoDashboard);

