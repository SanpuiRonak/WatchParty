import { type Component } from 'solid-js';
import { Navbar, Container, Nav, Button } from 'solid-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from '@solidjs/router';
import { userID } from '../signals/userID';


const App: Component = () => {
    const navigate = useNavigate();
    

    const createRoom = () => {
        const roomID = uuidv4();
        navigate(`/${userID()}/${roomID}`)
    }

   


    return (
        <Navbar bg="dark" expand="sm" variant='dark'>
            <Container>
                <Navbar.Brand href="/">
                    <img alt="Watch Party Logo" src="/assets/logo.png" width="30" height="30" />
                    {" Watch Party"}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" class="justify-content-end">
                    <Nav>
                        <Nav.Link >Join</Nav.Link>
                    </Nav>
                    <Button variant="primary" onClick={createRoom}>Create Room</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default App;
