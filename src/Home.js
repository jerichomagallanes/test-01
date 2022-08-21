import React, {useEffect, useState} from 'react'
import {
    Table, 
    Button, 
    Form,
    Card
} from "react-bootstrap";
import Select from 'react-select';
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux";
import { loadUsers, deleteUser, addUser, updateUser } from './redux/actions';

const initialState = {
    name: "",
    email: ""
}

const Home = () => {
    const [state, setState] = useState(initialState);

    const [userIdToModify, setUserIdToModify] = useState("");
    const [userNameToModify, setUserNameToModify] = useState("");
    const [updatedUserName, setUpdatedUserName] = useState("");
    const [selectModifyState, setSelectModifyState] = useState(null);

    const [userIdToDelete, setUserIdToDelete] = useState("");
    const [userNameToDelete, setUserNameToDelete] = useState("");
    const [selectDeleteState, setSelectDeleteState] = useState(null);

    const dispatch = useDispatch();
    const {users, message} = useSelector(state => state.data);

    const {name, email} = state;

    const [isFromGet, setIsFromGet] = useState(false);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    useEffect(() => {
        if (users && isFromGet) {

            var firstUserId = users[0]?.id;
            var firstUserName = users[0]?.name;

            setUserIdToModify(firstUserId);
            setUserNameToModify(firstUserName);
            setSelectModifyState({value: firstUserName, label: firstUserId});
            setUpdatedUserName({"name": firstUserName});

            setUserIdToDelete(firstUserId);
            setUserNameToDelete(firstUserName);
            setSelectDeleteState({value: firstUserName, label: firstUserId});

            setIsFromGet(false);
            
        }
    }, [users]);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({ ...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !email){
            toast.error("Please fill all  input fields");
        } else {
            dispatch(addUser(state));
            setState({name: "", email: ""});
        }
    };

    const handleGet = (e) => {
        e.preventDefault();
        dispatch(loadUsers());
        setIsFromGet(true);
    };

    const handleDelete = (id) => {
        if(!userIdToDelete){
            toast.error("Please fill all  input fields");
        } else {
            if (window.confirm("Are you sure that you want to delete this user?")) {
                dispatch(deleteUser(id));
                setUserIdToDelete("");
                setUserNameToDelete("");
                setSelectDeleteState(null);
            }
        }
    };

    const handleUpdate = (id) => {
        console.log(updatedUserName);
        if(!userIdToModify || !userNameToModify){
            toast.error("Please fill all  input fields");
        } else {
            dispatch(updateUser(updatedUserName, id));
            setUserIdToModify("");
            setUserNameToModify("");
            setUpdatedUserName("");
            setSelectModifyState(null);
        }
    };

    const handleSelectModify = (selectedOption) => {
        var userId = selectedOption.label;
        var userName = users.find(obj => {
            return obj.id === userId;
        }).name;
        setUserIdToModify(userId);
        setUserNameToModify(userName);
        setUpdatedUserName({"name": userName});
        setSelectModifyState({value: userName, label: userId});
    };

    const handleModifyName = (e) => {
        let {name, value} = e.target;
        setUpdatedUserName({ ...updatedUserName, [name]: value});
        setUserNameToModify(value);
    };


    const handleSelectDelete = (selectedOption) => {
        var userId = selectedOption.label;
        var userName = users.find(obj => {
            return obj.id === userId;
          }).name;
        setUserIdToDelete(userId);
        setUserNameToDelete(userName);
        setSelectDeleteState({value: userName, label: userId});
    };
    
    return (
        <div className='app'>
            <div className='card'>
                <Card>
                    <Card.Header>Add User</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                type="text"
                                placeholder='Please input your name...'
                                name="name"
                                value={name || ""}
                                onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                type="email"
                                placeholder='Please input your email...'
                                name="email"
                                value={email || ""}
                                onChange={handleChange} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit">
                                    Add User
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <div className='card'>
                <Card>
                    <Card.Header>Get Users</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody> {
                                users.map((user, index) => {
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        </Table>
                        <div className="d-grid gap-2">
                            <Button variant="info" type="submit" onClick={handleGet}>
                                Get Users
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className='card'>
                <Card>
                    <Card.Header>Modify User Name</Card.Header>
                    <Card.Body>
                        <Select 
                            placeholder="Please select id to modify the username"
                            value={selectModifyState}
                            options={users.map((user) => {
                                return { value: user.name, label: user.id }
                            })}
                            getOptionValue={option=>option.label}
                            onChange={handleSelectModify} />
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                type="text"
                                placeholder='Please input the new name...'
                                name="name"
                                onChange={handleModifyName}
                                value={userNameToModify} />
                            </Form.Group>
                        </Form>
                        <div className="d-grid gap-2">
                            <Button variant="warning" type="submit" onClick={() => handleUpdate(userIdToModify)}>
                                Modify User Name
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className='card'>
                <Card>
                    <Card.Header>Delete User</Card.Header>
                    <Card.Body>
                        <Select 
                            placeholder="Please select id to delete" 
                            value={selectDeleteState}
                            options={users.map((user) => {
                                return { value: user.name, label: user.id }
                            })} 
                            getOptionValue={option=>option.label}
                            onChange={handleSelectDelete} />
                        <div className="d-grid gap-2">
                            <Button variant="danger" type="submit" onClick={() => handleDelete(userIdToDelete)}>
                                Delete User
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div> 
        </div>
    )
}

export default Home
