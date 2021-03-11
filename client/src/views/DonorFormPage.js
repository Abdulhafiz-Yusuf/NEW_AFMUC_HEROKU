import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from "react-redux";
import React, { useState } from 'react'
import { Card, Button, } from 'reactstrap';
import { makeADonor } from '../appStore/_actions/userAction';

const DonorForm = () => {
    const dispatch = useDispatch()
    //    const { user, loginWithRedirect } = useAuth0()
    const [user, setUser] = useState({
        email: 'talk2abdulhafiz@gmail.com',
        id: 1
    })



    const donorbtnHandler = () => {
        if (user)
            dispatch(makeADonor(user.id))
        else
            alert('no user')
        // loginWithRedirect()
    }
    return (
        <div className='container mt-5'>
            <div style={{ height: '100px' }}></div>
            {user ?
                <>
                    <Card className='container w-50 shadow-lg p-3 d-flex flex-column align-items-center'>
                        <div className='d-flex justify-content-center '>
                            <h2 className='text-center'>Do You Want to be Donor Now</h2>
                        </div>

                        <Button color='success' onClick={donorbtnHandler} className='w-50 justify-self-center' >Make me a Donor Now!</Button>

                    </Card >
                </> :
                <div>
                </div>

            }
        </div>
    )
}

export default DonorForm
