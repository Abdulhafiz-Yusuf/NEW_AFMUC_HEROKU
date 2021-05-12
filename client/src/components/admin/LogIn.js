import React, { useEffect } from 'react';
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { dbServices } from '../../services/services';
import Header from '../Header';
// const AppDAO = require('../../db/dao').default
// const Crud = require('../../db/crud').default
// import Promise from "bluebird";
/**
 * To bycut barbel erro during webpack compilation
 * // SKIP_PREFLIGHT_CHECK = true
 */




//IMPORTING IPCRENDERER
// const ipcRenderer = window.require('electron').ipcRenderer;



export default function App() {

    const [profile, setProfile] = React.useState({
        username: '',
        password: '',
    })


    useEffect(() => {
        //initial DB with Admin Credentials
        dbServices.initalizeAdminCredentials()
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setProfile({
            ...profile,
            [e.target.name]: value
        })

    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (profile.username === '' | profile.password === '') {
            alert('username or password cannot be empty')
        }
        else {
            //authenticate Admin
            dbServices.authenticateAdmin(profile)
        }

    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <Header />
            <Card className='container w-50 shadow-lg p-3 d-flex flex-column align-items-center'>
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
                <div className='d-flex justify-content-lg-center '>
                    <Button className='text-light font-weight-bold'
                        color='success'
                        onClick={onSubmit}>Submit</Button>
                </div>

            </Card >
        </div>
    )
}


