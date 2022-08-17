import React, {useEffect} from 'react'
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
import {useDispatch, useSelector} from "react-redux";
import { loadUsers } from './redux/actions';

const Home = () => {

    const dispatch = useDispatch();
    const {users} = useSelector(state => state.data);

    useEffect(() => {
        dispatch(loadUsers());
    }, []);
    
    return (
        <>
        <Navbar bg="primary" variant="dark" className="justify-content-center">
            <Navbar.Brand>Python Flask SQLAlchemy Redux CRUD Application</Navbar.Brand>
        </Navbar>
        <Container>
            <Row>
                <Col md={4}>Form</Col>
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
                                            <Button style={{marginRight: "5px"}} variant="danger">
                                                Delete
                                            </Button>
                                            <Button variant="secondary">
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
