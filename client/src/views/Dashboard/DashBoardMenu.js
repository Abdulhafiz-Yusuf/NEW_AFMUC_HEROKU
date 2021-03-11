import React from 'react'
import { useDispatch } from "react-redux";
import { Button, Card } from 'reactstrap';
import { viewPageAction } from '../../appStore/_actions/userAction'
import me from '../../assets/me.jpg'
function DashBoardMenu({ user }) {
    const dispatch = useDispatch();
    return (
        <div className='d-flex flex-column w-25 border '>
            <Card className='text-danger  w-75 border d-flex justify-content-center align-items-center m-1 align-self-center'>
                <img src={me} alt='Passport' className='border rounded-circle ' style={{ height: '190px', width: '150px' }} />
                <div className='text-uppercase font-weight-bold'>{`${user.f_name} `} {user.l_name}</div>
                <div>+234 {user.phone}</div>
            </Card>
            <Button className='bg-danger m-2 text-light' onClick={() => dispatch(viewPageAction('profile'))}>
                My profile
            </Button>

            <Button className='bg-danger m-2 text-light' onClick={() => dispatch(viewPageAction('booking'))}>
                booking
            </Button>


            <Button className='bg-danger m-2 text-light' onClick={() => dispatch(viewPageAction('payment'))}>
                payment
             </Button>
        </div>
    )
}
export default DashBoardMenu
