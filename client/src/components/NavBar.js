import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Button } from 'reactstrap';

//Logo
import Logo from './logo.jpg'

const NavBar = () => {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [styles, setStyles] = useState({ display: 'flex', flexDirection: 'column', justifyContent: 'start' })

    useEffect(() => {
        console.log(history)
        if (window.location.pathname === '/' || window.location.pathname === '/results')
            setStyles({ display: 'none' })
        else {
            setStyles({ display: 'flex', flexDirection: 'column', justifyContent: 'start' })
        }
    }, [])
    return (
        <div className='fixed-top rounded mb-4' style={styles}>


            <Navbar color="success d-flex flex-column" light expand="sm">
                <NavbarToggler onClick={toggle} />
                <div className='d-flex justify-content-center '>
                    <NavbarBrand to="/" className='font-weight-bold'>
                        <img style={{ width: '100px', height: '100px' }} src={Logo} alt='Logo' />
                    </NavbarBrand>
                    <div>
                        <h2 className='text-light text-center' >AFMUC INTERNATIONAL MISSIONARY SCHOOL</h2>
                        <h4 className='text-light text-center' >STUDENT RESULT MANAGEMENT SYSTEM</h4>
                    </div>
                </div>
                <Collapse className='w-50 light justify-content-center' isOpen={isOpen} navbar>
                    <Nav className="mr-auto d-flex flex-column w-100" navbar>
                        <ul className="nav d-flex justify-content-between alighn-items-between w-100">

                            <li className="nav-item">
                                <Link to='/allclassSection'>
                                    <Button color='success' className='bg-success m-2 text-light' >
                                        All Sections
                                    </Button>
                                </Link>

                            </li>


                            {/* <li className="nav-item">
                                <Link to='/allclassSection'>
                                    <Button color='success' className='bg-success m-2 text-light' >
                                        All Classes
                                    </Button>
                                </Link>

                            </li> */}



                            <li className="nav-item">
                                <Link to='/gotoClass'>
                                    <Button color='success' className='bg-success m-2 text-light' >
                                        Go to Class
                                    </Button>
                                </Link>

                            </li>
                            <li className="nav-item">
                                <Link to='/resultsgenerator'>
                                    <Button color='success' className='bg-success m-2 text-light' >
                                        Result
                                    </Button>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/'>
                                    <Button color='success ' className='bg-success m-2 text-light' onClick={() => setStyles({ display: 'none' })} >
                                        LogOut
                                    </Button>
                                </Link>

                            </li>
                        </ul>
                    </Nav>
                </Collapse>


            </Navbar>




        </div >
    );
}

export default NavBar;