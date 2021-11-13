import React, { useContext, useEffect, useState } from 'react';
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { globalStore } from '../../AppStore/globalStore';
import { dbServices } from '../../services/services';
import { singUp } from '../../AppStore/actions/UserActions'
import { Link, useHistory } from 'react-router-dom'

function SignUp() {
    const { state, dispatch } = useContext(globalStore)

    const history = useHistory()
    const [profile, setProfile] = React.useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
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

    const onSubmit = (e) => {
        e.preventDefault()
        if (profile.username === '' || profile.email === '' || profile.password === '' || profile.confirmPassword === '') {
            alert('username or password cannot be empty')
        }

        if (profile.password !== profile.confirmPassword) {
            alert('Password does not match')
        }


        else {
            //authenticate Admin
            // dbServices.authenticateAdmin(profile)


            //Register User
            singUp(history, dispatch, profile.username, profile.email, profile.password, profile.section, setError, setLoading)
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <div style={{ marginTop: '-100px' }}></div>
            <Card className='container w-25 shadow-lg pt-3 d-flex flex-column align-items-center'>
                <h4 className='text-success font-weight-bold'>Register</h4>
                <Form >
                    <FormGroup >
                        <Label for="username" className='text-success font-weight-bold'>Username</Label>
                        <Input type="text" name="username" value={profile.username} onChange={handleChange} placeholder="username" />
                    </FormGroup>
                    <FormGroup >
                        <Label for="username" className='text-success font-weight-bold'>Email Address</Label>
                        <Input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="example@gmail.com" />
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
                <div className='d-flex justify-content-lg-center '>
                    <Button className='text-light font-weight-bold'
                        color='success'
                        onClick={onSubmit}>Register</Button>
                </div>


                <h6 className='mt-3 mb-3'>Already have an account?
                    <Link to='/'>  Login</Link>
                </h6>

            </Card >
        </div>
    )
}

export default SignUp
