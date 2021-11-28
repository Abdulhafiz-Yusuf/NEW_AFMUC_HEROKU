import React, { useState } from 'react';
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { singUp } from '../../AppStore/actions/UserActions'
import { Link } from 'react-router-dom'
import LoadScreen from '../common/LoadScreen';

function SignUp() {

    const [profile, setProfile] = React.useState({
        username: '',
        fullName: '',
        email: '',
        section: '',
        password: '',
        confirmPassword: ''
    })
    const [Error, setError] = useState()
    const [Loading, setLoading] = useState()



    const handleChange = (e) => {
        const value = e.target.value;
        setProfile({
            ...profile,
            [e.target.name]: value
        })


    }

    const onSignUp = (e) => {
        e.preventDefault()
        if (profile.username === '' || profile.email === '' || profile.password === '' || profile.confirmPassword === '') {
            alert('username or password cannot be empty')
        }

        if (profile.password !== profile.confirmPassword) {
            alert('Password does not match')
        }


        else {
            setLoading(true)
            //Register User
            singUp(profile.username, profile.email, profile.password, profile.section, setError, setLoading)
        }
    }



    const renderButton = () => {
        if (Loading) {
            return (
                <LoadScreen size='small' text='Please Wait....' height='100px' />
            )
        }
        else {
            return (
                <div className='d-flex justify-content-lg-center '>
                    <Button className='text-light font-weight-bold'
                        color='success'
                        onClick={onSignUp}>Register</Button>
                </div>

            )
        }
    }


    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <div style={{ marginTop: '-100px' }}></div>
            <Card className='container w-25 shadow-lg pt-3 d-flex flex-column align-items-center'>
                <h4 className='text-success font-weight-bold'>Registration</h4>
                <Form >
                    <FormGroup >
                        <Label for="username" className='text-success font-weight-bold'>Username</Label>
                        <Input type="text" name="username" value={profile.username} onChange={handleChange} placeholder="username" />
                    </FormGroup>
                    <FormGroup >
                        <Label for="username" className='text-success font-weight-bold'>Email Address</Label>
                        <Input type="email" name="email" value={profile.email} onChange={handleChange} placeholder=" e.g myname@gmail.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className='text-success font-weight-bold'>Password</Label>
                        <Input type="password" name="password" value={profile.password} onChange={handleChange} placeholder="xxxxxxx" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className='text-success font-weight-bold'>Confirm password</Label>
                        <Input type="password" name="confirmPassword" value={profile.confirmPassword} onChange={handleChange} placeholder="xxxxxxx" />
                    </FormGroup>
                </Form>
                <Label className='text-danger font-weight-bold m-2 font-italic text-center '>
                    {Error}
                </Label>
                {renderButton()}

                <h6 className='mt-3 mb-3'>Already have an account?
                    <Link to='/'>  Login</Link>
                </h6>

            </Card >
        </div>
    )
}

export default SignUp
