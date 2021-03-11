import React from 'react';
import { CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
const CardComp = ({ bgData }) => {
    return (
        <Link className="nav-link active text-light" to={`/blood_details/${bgData.bg_id}`} >
            <Button color='light' className='m-3 d-flex flex-column align-items-center border border-danger shadow' style={{ width: '170px' }}>

                <CardTitle className='d-flex border rounded-circle justify-content-center align-items-center bg-danger m-1' style={{ width: '100px', height: '100px' }}>
                    <h1
                        className='text-center font-weight-bolder text-light' style={{ fontSize: '45px' }}>
                        {bgData.bg}<sup>{bgData.rhd}</sup></h1>
                </CardTitle>
                <div className='text-center'> Available Quantity: <h2>{bgData.qty} pints</h2> </div>
            </Button >

        </Link >


    );
};

export default CardComp;