import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { BsFillPersonFill } from 'react-icons/bs';
import { Button } from 'reactstrap';

const Auth0LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button className="border border-light text-light" onClick={() => logout()} color=" "
            style={{ width: '130px' }}>
            <BsFillPersonFill />
            <p>Logout</p>
        </Button>

    )
}

export default Auth0LogoutButton
