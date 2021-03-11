import React from 'react'
import { useSelector } from "react-redux";
import { Table, Card, Button } from 'reactstrap'
import Loading from '../../components/Loading'
function BookingPage() {
    const booking = useSelector(state => state.BloodBankReducer.booking);

    return (

        <div className='w-100 d-flex flex-row justify-content-center align-items-center' >
            {!booking ?
                <h2 className='text-danger text-center mb-3 font-weight-bold'> Sorry!! You have no Booked Items .... </h2>
                :
                booking.length === 0 ?
                    <Loading /> :

                    booking.length > 0 &&
                    <Card className='text-danger'>
                        <h2 className='text-danger text-center mb-3 font-weight-bold'> Booked Items</h2>
                        <Table className='text-danger' bordered hover striped>
                            <thead>
                                <tr>
                                    <th>Blood Group </th>
                                    <th>Center Name</th>
                                    <th>Location</th>
                                    <th>Qantity</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map((book, index) => {
                                    return (
                                        < tr key={index}>
                                            <th scope="row">{book.bg}<sup>{book.rhd}</sup></th>
                                            <td>{book.centername}</td>
                                            <td>{book.loclga}, {book.locstate}</td>
                                            <td>{book.qty}</td>
                                            <td>
                                                {book.payment_status}
                                                <Button className='ml-2 text-light bg-danger font-weight-bold'>Pay Now</Button>
                                            </td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </Table>
                    </Card >
            }
        </div>
    )
}

export default BookingPage
