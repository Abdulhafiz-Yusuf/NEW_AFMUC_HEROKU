import React, { useContext, useEffect, useState } from 'react';
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { globaltore } from '../../AppStore/globalStore';
import { dbServices } from '../../services/services';
import { Link } from 'react-router-dom'
import LoadScreen from '../LoadScreen'
import { login } from '../../AppStore/actions/UserActions';


export default function App() {


    const { state, dispatch } = useContext(globaltore)
    console.log(state)

    const [Loading, setLoading] = useState(false)
    const [profile, setProfile] = React.useState({
        username: '',
        password: '',
    })


    // useEffect(() => {
    //     //initial DB with Admin Credentials
    //     dbServices.initalizeAdminCredentials()
    // }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setProfile({
            ...profile,
            [e.target.name]: value
        })

    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (profile.username === '' || profile.password === '') {
            alert('username or password cannot be empty')
        }


        else {
            //authenticate Admin
            //dbServices.authenticateAdmin(profile)
            login(dispatch, profile.username, profile.password, setLoading)

        }
    }


    const renderButton = () => {
        if (Loading) {
            return (<LoadScreen size='small' text='Loging in....' />)
        }
        else {
            return (
                <div className='d-flex justify-content-lg-center '>
                    <Button className='text-light font-weight-bold'
                        color='success'
                        onClick={onSubmit}>Submit</Button>
                </div>
            )
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <div style={{ marginTop: '-100px' }}></div>
            <Card className='container w-25 shadow-lg pt-3 pb-4 d-flex flex-column align-items-center'>
                <h4 className='text-success font-weight-bold'>Login</h4>
                <Form >
                    <FormGroup >
                        <Label for="username" className='text-success font-weight-bold'>Username</Label>
                        <Input type="text" name="username" value={profile.username} onChange={handleChange} placeholder="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className='text-success font-weight-bold'>password</Label>
                        <Input type="password" name="password" value={profile.password} onChange={handleChange} placeholder="xxxxxxx" />
                    </FormGroup>
                </Form>

                {/* <h6 className='mt-3 mb-3 text-danger'>Forgot Password?
                 <Link to='/signup'>  Reset</Link>
                </h6> */}

                {renderButton()}

                {/* <h6 className='mt-3 mb-3'>Dont have an account?
                 <Link to='/signup'>  Register</Link>
                </h6> */}
            </Card >
        </div>
    )
}


