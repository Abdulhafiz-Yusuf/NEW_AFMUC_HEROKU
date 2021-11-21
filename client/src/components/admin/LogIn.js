//Login.js
import React, { useContext, useState } from 'react';
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { globalStore } from '../../AppStore/globalStore';
import { useHistory } from 'react-router-dom'
import LoadScreen from '../common/LoadScreen'
import { login } from '../../AppStore/actions/UserActions';
import { Link } from 'react-router-dom'

export default function Login() {
    const history = useHistory()

    const { state, dispatch } = useContext(globalStore)

    console.log(state)

    const [error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)

    const [profile, setProfile] = React.useState({
        email: '',
        password: '',
    })


    function handleChange(e) {
        const value = e.target.value;
        setProfile(
            {
                ...profile,
                [e.target.name]: value
            }
        )

    }

    const onLogIn = (e) => {
        e.preventDefault()

        if (profile.password === '' || profile.email === '') {
            alert('Email or password cannot be empty')
        }


        else {
            //authenticate Admin
            //dbServices.authenticateAdmin(profile)
            setLoading(true)
            login(dispatch, profile.email, profile.password, setError, setLoading, history)

        }
    }


    const renderButton = () => {
        if (Loading) {
            return (
                <LoadScreen size='small' text='Loging in....' height='100px' />
            )
        }
        else {
            return (

                <div className='d-flex justify-content-lg-center '>
                    <Button className='text-light font-weight-bold'
                        color='success'
                        onClick={onLogIn}>Submit</Button>
                </div>

            )
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            {/* <div style={{ height: '0px' }}></div> */}

            <Card className='container w-50 shadow-lg pt-3 pb-4 d-flex flex-column align-items-center'>
                <h4 className='text-success font-weight-bold'>Login</h4>
                <Form style={{ width: '80vh' }}>
                    <FormGroup >
                        <Label for="username" className='text-success font-weight-bold'>Email</Label>
                        <Input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className='text-success font-weight-bold'>password</Label>
                        <Input type="password" name="password" value={profile.password} onChange={handleChange} placeholder="xxxxxxx" />
                    </FormGroup>
                </Form>

                <Label className='text-danger font-weight-bold m-2 font-italic text-center '>
                    {error}
                </Label>
                {/* <h6 className='mt-3 mb-3 text-danger'>Forgot Password?
                 <Link to='/signup'>  Reset</Link>
                </h6> */}

                {renderButton()}

                <h6 className='mt-3 mb-3'>Dont have an account?
                    <Link to='/signup'>  Register</Link>
                </h6>
            </Card >
        </div>
    )
}


