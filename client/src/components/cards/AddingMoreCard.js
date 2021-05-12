import React from 'react'
import { Link } from 'react-router-dom'
import { CardTitle, Button } from 'reactstrap';

function AddingMoreCard({ sectionName, addtype }) {
    const upperCaseProp = addtype.toLocaleUpperCase() //convert the upper case addtype props to Uppercase to be use in card 
    return (
        <div className='d-flex flex-column align-items-center '>
            {
                sectionName ?
                    <Link className="nav-link active text-light" to={`/${sectionName}/add${addtype}`} >
                        <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                            <CardTitle className='d-flex justify-content-center align-items-center  m-1' style={{ width: '100px', height: '100px' }}>
                                <h6 className='text-success text-center mt-2 font-weight-bold'>
                                    CLICK HERE TO ADD/DELETE MORE {upperCaseProp}</h6>
                            </CardTitle>
                            <h3 className='text-success font-weight-bold' style={{ fontSize: '60px' }}>+</h3>
                        </Button >
                    </Link >
                    :
                    <Link className="nav-link active text-light" to={`/add${addtype}`} >
                        <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                            <CardTitle className='d-flex justify-content-center align-items-center  m-1' style={{ width: '100px', height: '100px' }}>
                                <h6 className='text-success mt-2 text-center font-weight-bold'>
                                    CLICK HERE TO ADD/DELETE MORE {upperCaseProp}</h6>
                            </CardTitle>
                            <h3 className='text-success font-weight-bold' style={{ fontSize: '60px' }}>+</h3>
                        </Button >
                    </Link >
            }
        </div>
    )
}

export default AddingMoreCard
