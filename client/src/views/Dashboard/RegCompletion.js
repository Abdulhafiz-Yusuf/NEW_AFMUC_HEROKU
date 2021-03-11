import React, { useState } from 'react'
import { Card, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NaijaStates, trueorfalse, NaijaLGA, bloodGroup } from '../../data'
import { useDispatch } from "react-redux";
import { completeRegistration } from '../../appStore/_actions/userAction'


/*==========================
REGISTRATION COMPLETION PAGE
=============================*/

export default function RegCompletion(props) {

    const dispatch = useDispatch();
    const [profile, setProfile] = useState({
        email: props.email,
        email_verified: props.email_verified,
        last_login: props.updated_last,
        username: '',
        phone: '',
        user_loc_state: 'Abia',
        loc_lga: NaijaLGA['Abia'][0],
        donor: '',
        bg: 'A - positive(A +)'
    })
    let LGAs = NaijaLGA[profile.user_loc_state]
    const handleChange = (e) => {
        const value = e.target.value
        setProfile({
            ...profile,
            [e.target.name]: value
        })
        console.log(value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const dataToSubmit = {
            email: 'me@gmail.com',
            email_verified: false,
            username: profile.username,
            phone: profile.phone,
            user_loc_state: profile.user_loc_state,
            loc_lga: profile.loc_lga,
            donor: profile.donor,
            bg: profile.bg
        }
        // dispatch(completeRegistration(dataToSubmit))
        if (dataToSubmit.username === '' || dataToSubmit.phone === '') {
            alert('Field cannot be empty')
        }
        else {
            console.log(dataToSubmit)
            dispatch(completeRegistration(dataToSubmit))
                .then(response => {
                    if (response.payload.success)
                        alert('Congratulations! You have successfully registered with 9jaBloodbank')
                })
        }
    }
    return (
        <div>
            <div style={{ height: '130px' }}></div>
            <Card className='container w-50 shadow-lg p-3'>
                <div className='d-flex justify-content-lg-center '>
                    <h2>Registration Completion</h2>
                </div>

                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" value={profile.username} onChange={handleChange} placeholder="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">phone</Label>
                        <Input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="080xxxxxxx" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">State</Label>
                        <Input type="select" name="user_loc_state" value={profile.user_loc_state} onChange={handleChange} >
                            {NaijaStates.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="state">L.G.A</Label>
                        <Input type="select" name="loc_lga" value={profile.loc_lga} onChange={handleChange}>
                            {LGAs.map((lga, index) => (
                                <option key={index} value={lga}> {lga}</option>
                            ))
                            }
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleSelect">Will you like to be a Donor</Label>
                        <Input type="select" name="donor" value={profile.donor} onChange={handleChange}>
                            {trueorfalse.map((item, index) => (
                                <option key={index} value={item.value}> {item.key}</option>
                            ))
                            }

                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="bg">Blood Group</Label>
                        <Input type="select" name="bg" value={profile.bg} onChange={handleChange}>
                            {bloodGroup.map((bg, index) => (
                                <option key={index} value={bg}>{bg}</option>
                            ))
                            }
                        </Input>
                    </FormGroup>
                    <div className='d-flex justify-content-lg-center '>
                        <Button className='' onClick={onSubmit}>Submit</Button>
                    </div>

                </Form>

            </Card >
            <div style={{ height: '20px' }}></div>
        </div>
    )
}


