import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Button } from 'reactstrap';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [styles, setStyles] = useState()
    useEffect(() => {

        if (window.location.pathname === '/' || window.location.pathname === '/resultsgenerator')
            setStyles({ display: 'none' })
        else {
            setStyles({ display: 'flex', flexDirection: 'column', justifyContent: 'start' })
        }
    }, [])



    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropDownToggle = () => setDropdownOpen(prevState => !prevState);


    return (
        <div className='fixed-top rounded mb-5' style={styles}>
            <Navbar
                color="success"
                light expand="md">
                <NavbarBrand to="/" className='font-weight-bold'> AFMUC Logo </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <ul className="nav">
                            <li className="nav-item">
                                <Dropdown color='success' className='bg-success m-2 text-light' isOpen={dropdownOpen} toggle={dropDownToggle}>
                                    <DropdownToggle color='success' caret>
                                        Dropdown
      </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            <Link className='text-success' to='/allclassSection'>Classes</Link>
                                        </DropdownItem>
                                        <DropdownItem>Some Action</DropdownItem>
                                        <DropdownItem text>Dropdown Item Text</DropdownItem>
                                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Foo Action</DropdownItem>
                                        <DropdownItem>Bar Action</DropdownItem>
                                        <DropdownItem>Quo Action</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                            </li>
                            <li className="nav-item">
                                <Button color='success' className='bg-success m-2 text-light' onClick={() => window.location = '/admin'}>
                                    Change Password
                                    </Button>
                            </li>
                            <li className="nav-item">
                                <Button color='success ' className='bg-success m-2 text-light' onClick={() => window.location = '/'}>
                                    LogOut
                                    </Button>
                            </li>
                            <li className="nav-item">
                                <Button color='success ' className='bg-success m-2 text-light' onClick={() => window.location = '/resultsgenerator'}>
                                    Result
                                    </Button>
                            </li>
                        </ul>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}

export default NavBar;