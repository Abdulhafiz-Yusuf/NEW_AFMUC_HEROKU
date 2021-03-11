import React, { useEffect } from 'react';
import { Table, Card, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking, fetchBloodbyId } from '../appStore/_actions/BloodBankAction';
import { viewPageAction } from '../appStore/_actions/userAction';
//import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading';
export default function BloodDetailPage(props) {
    /*
TASK
    ====
    1.  Use useEffect to fetch bcDetail with id equal to id in props.match.params.bgId 
    2.  Use bcDetail.bg to fetch bcDetailPage Data where bg === req.body.bcDetail.bg
    3.  Display bcDetailPage Data in tables
    */

    let history = useHistory();
    const dispatch = useDispatch()
    const bgId = props.match.params.bgId;
    // const stateUser = useSelector(state => state.UserReducer.user);
    // const booking = useSelector(state => state.BloodBankReducer.booking);

    //const { user, loginWithRedirect } = useAuth0;
    const [user, setUser] = useState({
        users_id: 1,
        email: 'talk2abdulhafiz@gmail.com'
    })
    useEffect(() => {
        dispatch(fetchBloodbyId(bgId))
    }, [dispatch, bgId])

    const bcDetail = useSelector(state => state.BloodBankReducer.bcDetail);
    const bgDetail = useSelector(state => state.BloodBankReducer.bgDetail);


    const bookingHandler = (e) => {
        const id = e.target.id;
        console.log({ bcDetail: bcDetail[id], user: user, bgDetail: bgDetail[id] })
        if (user) {
            dispatch(addBooking(user.users_id, bcDetail[id], bgDetail[id]))
                .then(response => {
                    if (response.payload) {
                        dispatch(viewPageAction('booking'))
                        history.push('/testPage')
                        alert('Booked Successfully')

                    }
                }
                )
        }
        else {
            //      loginWithRedirect()
        }
    }
    return (
        <div className=' container mt-5 mb-5' >
            <div style={{ height: '100px' }}></div>

            {bgDetail.length === 0 & bcDetail.length === 0 ?
                <Loading />
                :
                bgDetail.length > 0 & bcDetail.length === 0 ?
                    <h2 className='text-danger text-center mb-3 font-weight-bold'>
                        Sorry!! No  Available {bgDetail[0].bg}<sup>{bgDetail[0].rhd}</sup> Blood Group....</h2>
                    :
                    < Card className='text-danger d-flex justify-content-center align-items-center' >
                        <h2 className='text-danger text-center mb-3 font-weight-bold'> </h2>

                        <h1 className='text-center font-weight-bolder text-danger' >Available {bgDetail[0].bg}<sup>{bgDetail[0].rhd}</sup> Blood Group</h1>

                        <Table className='text-danger' bordered hover striped>
                            <thead>
                                <tr>

                                    <th>Center Name</th>
                                    <th>Location</th>
                                    <th>Qantity</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bcDetail.map((bg, index) => {
                                    return (
                                        < tr key={index}>
                                            <td>{bg.centername}</td>
                                            <td>{bg.loclga} L.G.A,<br />{bg.locstate} State</td>
                                            <td>{bg.qty}</td>
                                            <td >
                                                <Button
                                                    id={index}
                                                    onClick={bookingHandler}
                                                    className='ml-2 text-light bg-danger font-weight-bold'>Book Now</Button>

                                            </td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </Table>
                    </Card >
            }
        </div >
    )
}
