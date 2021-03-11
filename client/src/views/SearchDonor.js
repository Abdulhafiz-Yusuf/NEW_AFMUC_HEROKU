import React, { useState } from 'react';
import { Table, Card, } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
//import { searchDonor, } from '../appStore/_actions/userAction';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';





function SearchDonor() {


    const bcDetail = useSelector(state => state.BloodBankReducer.bcDetail);

    const bgDetail = useSelector(state => state.BloodBankReducer.bgDetail);

    // const dispatch = useDispatch()

    const searchHandler = (value, category) => {
        console.log(value)

        // const dataToSubmit = {
        //     user_loc_state: searcText.loc_state,
        //     loc_lga: searcText.loc_lga,
        // }
        // dispatch(completeRegistration(dataToSubmit))
        // console.log(dataToSubmit)
        // dispatch(searchDonor(dataToSubmit))
        // .then(response => {
        //     if (response.payload.success)
        //         alert('Congratulations! You have successfully registered with 9jaBloodbank')
        // })
    }


    return (
        <div className=' container mt-5 mb-5'>
            <div style={{ height: '100px' }}></div>


            <SearchBar bGsearchHandler={filter => searchHandler(filter, 'bloodgroup')} locSearchHandler={filter => searchHandler(filter, 'location')} />


            <div style={{ height: '50px' }}></div>
            {
                !bgDetail.length ?
                    <Loading />
                    :
                    bgDetail &&
                    <Card className='text-danger d-flex justify-content-center align-items-center' >
                        <h2 className='text-danger text-center mb-3 font-weight-bold'> </h2>

                        {/* <h1 className='text-center font-weight-bolder text-danger' >Available {bgDetail[0].bg}<sup>{bgDetail[0].rhd}</sup> Blood Group</h1> */}

                        <Table className='text-danger' bordered hover striped>
                            <thead>
                                <tr className='text-center'>
                                    <th >Donor Name</th>
                                    <th>Location</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bcDetail.map((bg, index) => {
                                    return (
                                        < tr key={index} className='text-center'>
                                            <td>{bg.centername}</td>
                                            <td>{bg.loclga} L.G.A,<br />{bg.locstate} State</td>
                                            <td>{bg.qty}</td>
                                            {/* <td >
                                                <Button
                                                    id={index}
                                                    onClick={bookingHandler}
                                                    className='ml-2 text-light bg-danger font-weight-bold'>Book Now</Button>

                                            </td> */}
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

export default SearchDonor
