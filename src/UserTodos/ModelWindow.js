import React from 'react';
import { Modal, Input, DatePicker } from 'antd';
import { Label } from '@mobiscroll/react-lite';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
export const ModelWindow = ({ handleOk, handleCancel, props, OnchangeTodo, OnchangeTodoDate, OnchangeUser }) => {
    debugger;
    const ReduxState = useSelector(state => state);
    let Title;
    var dateDisplay;

    if (ReduxState.UserTodo.InsertTodo.TodoDate == null || ReduxState.UserTodo.InsertTodo.TodoDate == "") {
        dateDisplay = "";
    }
    else {
        dateDisplay = moment(ReduxState.UserTodo.InsertTodo.TodoDate);
    }

    // if (dateDisplay == null || dateDisplay == "") {
    //     dateDisplay = "";
    // }
    // else {
    //     dateDisplay = dateDisplay.split("T")[0];
    //     dateDisplay = moment(dateDisplay);
    // }

    if (ReduxState.UserTodo.TabCheck === "Todo") {
        Title = "Add New Todo";
    }
    else {
        Title = "Add New User";
    }
    return (
        <Modal
            title={Title}
            visible={ReduxState.UserTodo.visible}
            onSave={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="Cancel" style={{ backgroundColor: "#40a9ff", color: "white" }} onClick={handleCancel}>
                    Cancel
            </Button>,
                <Button key="Save" type="primary" style={{ backgroundColor: "#40a9ff", color: "white" }} loading={ReduxState.UserTodo.loading} onClick={handleOk}>
                    {ReduxState.UserTodo.Loading === false ? "Save" : (<React.Fragment><CircularProgress size={20} /><span>Inserting</span></React.Fragment>)}
                </Button>
                ,
            ]}
        >
            {ReduxState.UserTodo.TabCheck === "Todo" ?
                (<React.Fragment> <div style={{ padding: "10px" }}>
                    <Label>Action</Label>
                    <Input placeholder="Action" name="TodoAction" style={ReduxState.UserTodo.ActionError === true && ReduxState.UserTodo.Error === true ? { border: "1px solid #ef1a04" } : { border: "1px solid #d9d9d9" }} value={ReduxState.UserTodo.InsertTodo.TodoAction} onChange={OnchangeTodo} />
                </div>
                    <div style={{ padding: "10px" }}>
                        <Label>Date Added</Label>
                        <br />
                        <DatePicker name="TodoDate" value={dateDisplay} style={ReduxState.UserTodo.DateError === true && ReduxState.UserTodo.Error === true ? { border: "1px solid #ef1a04", width: "100%" } : { border: "1px solid #d9d9d9", width: "100%" }} onChange={OnchangeTodoDate} />
                    </div></React.Fragment>) :
                (<React.Fragment> <div style={{ padding: "10px" }}>
                    <Label>Name</Label>
                    <Input placeholder="Name" name="UserName" style={ReduxState.UserTodo.nameError === true && ReduxState.UserTodo.Error === true ? { border: "1px solid #ef1a04" } : { border: "1px solid #d9d9d9" }} value={ReduxState.UserTodo.InsertUser.UserName} onChange={OnchangeUser} />
                </div>
                    <div style={{ padding: "10px" }}>
                        <Label>Email</Label>
                        <br />
                        <Input placeholder="Email" name="UserEmail" style={ReduxState.UserTodo.EmailError === true && ReduxState.UserTodo.Error === true ? { border: "1px solid #ef1a04" } : { border: "1px solid #d9d9d9" }} value={ReduxState.UserTodo.InsertUser.UserEmail} onChange={OnchangeUser} />
                    </div></React.Fragment>)
            }
        </Modal>
    )
}

export default ModelWindow;
