import React from 'react'

import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from '../Header';
import { dbServices } from '../../services/services';

/**DESCRIPTION: A FORM COMPONENT THAT CHANGES THE ADMIN PASSWORD. 
 * ===========TASKS============
 * 1.   DISPLAY SIDEBAR AND THE FORM TO COLLECT "NEW PASSWORD" AND "PASSWORD AGAIN" 
 * 2.   ONSUBMISSION:
 *      A.  THE COMPONENT CHECKS IF USER ENTER IF USER ENTERS VALUE OR NOT 
 *      B.  THE COMPONENT CHECKS IF THE TWO PASSWORD FIELD ENTERED MATCHED
 *      C.  IF VALUE ENTERED AND MATCHED, THE COMPONENTS FETCHED CURRENT userId FROM DB AND RESET PASSWORD TO VALUE ENTERED
 * 
 */
function ChangePwd() {

    console.log(window.location.pathname)
    const [profile, setProfile] = React.useState({
        password: '',
        confirmPassword: '',
    })


    const onSubmit = (e) => {
        e.preventDefault()
        if (profile.confirmPassword === '' || profile.password === '') {
            alert('"New Password" and "Password Again" fields can not be empty')
        }
        else if (profile.confirmPassword !== profile.password) {
            alert('Passwrod not match! Ensure "New confirm password" and "Confirm confirm password" match')
        }

        //Change Password in DB
        dbServices.changePasswordinDb(profile)

    }

    const handleChange = (e) => {
        const value = e.target.value;
        setProfile({
            ...profile,
            [e.target.name]: value
        })

    }


    return (
        <div>
            {/* * 1.   DISPLAY SIDEBAR AND THE FORM TO COLLECT "NEW PASSWORD" AND "PASSWORD AGAIN"  */}


            <div className='d-flex justify-content-center align-items-center flex-column'>
                {/* HEADER HERE */}
                <Header />

                {/* FORM START HERE */}
                <Card className='container w-50 shadow-lg p-3 d-flex flex-column align-items-center'>
                    <h4 className='text-success font-weight-bold'>Change confirm password</h4>
                    <Form >
                        <FormGroup >
                            <Label for="new password" className='text-success font-weight-bold'>New Password</Label>
                            <Input type="text" name="password" value={profile.Password} onChange={handleChange} placeholder="new password" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirm password" className='text-success font-weight-bold'>Password Again</Label>
                            <Input type="text" name="confirmPassword" value={profile.confirmPassword} onChange={handleChange} placeholder="confirm password" />
                        </FormGroup>
                    </Form>
                    <div className='d-flex justify-content-lg-center '>
                        <Button className='text-light font-weight-bold'
                            color='success'
                            onClick={onSubmit}>Submit</Button>
                    </div>

                </Card >
            </div>
        </div >
    )
}

export default ChangePwd
