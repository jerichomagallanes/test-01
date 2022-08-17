import React, {useEffect, useState} from 'react'
import {
    Navbar, 
    Table, 
    Container, 
    Row, 
    Col, 
    Button, 
    ButtonGroup, 
    Form
} from "react-bootstrap";
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux";
import { loadUsers, deleteUser, addUser, loadSingleUser, updateUser } from './redux/actions';

const initialState = {
    name: "",
    email: ""
}

const Home = () => {
    const [state, setState] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const {users, message, user} = useSelector(state => state.data);

    const {name, email} = state;

    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    useEffect(() => {
        if (user) {
            setState({ ...user });
        }
    }, [user]);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({ ...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !email){
            toast.error("Please fill all  input fields")
        } else {
            if(!editMode){
                dispatch(addUser(state));
                setState({name: "", email: ""});
            } else {
                dispatch(updateUser(state, userId))
                setState({name: "", email: ""});
                setEditMode(false);
                setUserId(null);
            }
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure that you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };

    const handleUpdate = (id) => {
        dispatch(loadSingleUser(id));
        setUserId(id);
        setEditMode(true);
    };
    
    return (
        <>
        <Navbar bg="primary" variant="dark" className="justify-content-center">
            <Navbar.Brand>Python Flask SQLAlchemy Redux CRUD Application</Navbar.Brand>
        </Navbar>
        <Container>
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder='Name'
                            name="name"
                            value={name || ""}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="email"
                            placeholder='Email'
                            name="email"
                            value={email || ""}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-2">
                            <Button type="submit" variant="primary" size="lg">
                                {editMode ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col md={8}>
                    <Table bordered hover>
                        <thead>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </thead>
                        {users && users.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button 
                                                style={{marginRight: "5px"}} 
                                                variant="danger"
                                                onClick={() => handleDelete(item.id)}>
                                                Delete
                                            </Button>
                                            <Button variant="secondary" onClick={() => handleUpdate(item.id)}>
                                                Update
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home
