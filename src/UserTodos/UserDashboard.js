import React, { Component } from 'react';
import { Table, Space, Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import * as ActionCreator from '../ReduxStore/Actions';
import { store } from '../ReduxStore/Store';
class UserDashboard extends Component {

    onEdit = async (key, e) => {
        debugger;
        await store.dispatch({ type: "Loading", value: false })
        debugger;
        let UserList = this.props.UserTodo.UserList;
        UserList = UserList.filter(User => User.key == key)

        let InsertUser = this.props.UserTodo.InsertUser;
        InsertUser["UserName"] = UserList[0].name;
        InsertUser["UserEmail"] = UserList[0].EmailID;
        store.dispatch({ type: "UserID", value: UserList[0].key })
        store.dispatch({ type: "InsertUser", value: InsertUser })
        store.dispatch({ type: "visible", value: true })
        await store.dispatch({ type: "Flag", value: "U" })
    }
    Cancel = (key, e) => {
        debugger;
        return false;
    }
    Confirm = (key, e) => {
        debugger;
        let UserList = this.props.UserTodo.UserList;
        UserList = UserList.filter(User => User.key != key)
        this.props.AddUser(UserList);
    }
    render() {
        debugger;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a href=" #" onClick={(e) => { this.onEdit(record.key, e); }}>Edit</a>
                        <Popconfirm
                            title="Are you sure, Do you want delete this User?"
                            onConfirm={(e) => { this.Confirm(record.key, e); }}
                            onCancel={(e) => { this.Cancel(record.key, e); }}
                            okText="Yes"
                            cancelText="No"
                        ><a href=" #">Delete</a></Popconfirm>

                    </Space>
                ),
            },
        ];
        let data = JSON.parse(JSON.stringify(this.props.UserTodo.UserList));
        return (
            <div>
                <Table columns={columns} pagination={{ pageSize: 5 }} dataSource={data} />
            </div>
        );
    }
}
const mapStatetoProps = state => {

    return {
        UserTodo: state.UserTodo
    };
}
const mapDispatchtoProps = dispatch => {
    return {
        AddUser: (payload) => dispatch(ActionCreator.AddUserDetails(payload)),
    };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(UserDashboard);