import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BsFillPersonFill } from 'react-icons/bs';
import { Button } from 'reactstrap';

const LoginButton = () => {

    const { loginWithRedirect, user } = useAuth0();
    const loginBtnHandle = () => {
        loginWithRedirect()
        console.log(user)

    }
    return (
        <>
            <Button className="border border-light text-light font-weight-bold" onClick={loginBtnHandle} color=" "
                style={{ width: '130px' }}>
                <BsFillPersonFill />
                <p>Login/Register</p>
            </Button>
        </>
    )
}

export default LoginButton
