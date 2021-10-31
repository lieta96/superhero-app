import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { userLogin } from '../contextLogin';
import { team } from '../contextTeam';




export default function NavbarSuperhero(){
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Superheros App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/login">
                        {
                            userLogin? "Log out": "Login"
                        }
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}