import React from 'react'
import { Card } from 'reactstrap'



function Profile({ user, bg }) {

    return (
        <div className='w-100 d-flex flex-row justify-content-center align-items-center' >
            <Card className='w-100 m-1'>
                <h2 className='text-danger text-center mb-3 font-weight-bold'> Profile </h2>
                <div className='d-flex w-100 text-danger border-bottom'>
                    <div className='w-25'><p className='ml-5'> First Name:  </p> </div>
                    <div> <p className='text-uppercase font-weight-bold'>{user.f_name}</p></div>
                    <hr />
                </div>
                <div className='d-flex w-100 text-danger border-bottom'>
                    <div className='w-25 '><p className='ml-5'> Last Name:  </p> </div>
                    <div> <p className='text-uppercase font-weight-bold '>{user.l_name}</p></div>
                    <hr />
                </div>

                <div className='d-flex w-100 text-danger border-bottom'>
                    <div className='w-25 '><p className='ml-5'> Phone:  </p>  </div>
                    <div> <p className='text-uppercase font-weight-bold '>+234 {user.phone}</p> </div>
                </div>
                <div className='d-flex w-100 text-danger border-bottom'>
                    <div className='w-25 '><p className='ml-5'> State of Resident:  </p>  </div>
                    <div> <p className=' text-uppercase font-weight-bold '>{user.user_loc_state}</p> </div>
                </div>
                <div className='d-flex w-100 text-danger border-bottom'>
                    <div className='w-25 '><p className='ml-5'> L.G.A: </p>  </div>
                    <div> <p className=' text-uppercase font-weight-bold '>{user.loc_lga}</p> </div>
                </div>
                <div className='d-flex w-100 text-danger border-bottom'>
                    <div className='w-25 '><p className='ml-5'> Blood Group:  </p>  </div>
                    <div> <p className='text-uppercase font-weight-bold '>{bg.bg}<sup>{bg.rhd}</sup></p> </div>
                </div>
                <div className='d-flex w-100 text-danger border-bottom'>
                    <div className='w-25 '><p className='ml-5'> Are you a Donor:  </p>  </div>
                    <div> <p className='font-weight-bold '>{user.donor}</p> </div>
                </div>

            </Card >

        </div >
    )
}

export default Profile
