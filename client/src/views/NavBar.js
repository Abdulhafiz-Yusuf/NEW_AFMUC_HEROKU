import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Button } from 'reactstrap';
import LoginButton from '../components/Auth0LoginButton';
import LogoutButton from '../components/Auth0LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
// import backgroundImage from './blood.jpeg'
const NavBar = (props) => {

    const { isAuthenticated } = useAuth0()

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='bg-danger container fixed-top rounded mb-5 '
        // style={{ backgroundImage: "url(/blood.jpeg)", backgroundRepeat: 'no-repeat', height: '300px' }}
        >

            <Navbar

                color="danger"
                light expand="md">
                <NavbarBrand to="/" className='font-weight-bold'> 9jaBlood</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <ul className="nav">
                            <li className="nav-item">
                                <Button color='danger'>
                                    <Link className="nav-link active text-light font-weight-bold" to="/">Home</Link>
                                </Button>
                            </li>
                            <li className="nav-item">
                                <Button color='danger '>
                                    <Link className="nav-link active text-light font-weight-bold" to="/med-center">Medical Center</Link>
                                </Button>
                            </li>
                            <li className="nav-item">
                                <Button color='danger'>
                                    <Link className="nav-link active text-light font-weight-bold" to="/:userId/form">Find a Donor</Link>
                                </Button>
                            </li>

                            <li className="nav-item">
                                <Button color='danger '>
                                    <Link className="nav-link active text-light font-weight-bold" to='/testPage'>Testing Page</Link>
                                </Button>
                            </li>
                        </ul>
                    </Nav>
                    {!isAuthenticated ? <LoginButton /> :
                        <LogoutButton />
                    }

                </Collapse>

            </Navbar>
        </div >
    );
}

export default NavBar;