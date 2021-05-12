import React from 'react';
import { CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom'




const CardComp = ({ Class, ClassSection }) => {
    let lowerCaseClassSection;
    let lowerCaseClass;
    if (Class) {
        lowerCaseClass = Class.class_name.toLocaleLowerCase()
        console.log({ FromCard: lowerCaseClass })
        return (
            < Link className="nav-link active text-light" to={`/${lowerCaseClass}/classroom`} >
                <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                    <CardTitle className='d-flex justify-content-center align-items-center  m-1' style={{ width: '100px', height: '100px' }}>
                        <h4 className='text-center font-weight-bolder text-success' >
                            {Class.class_name}
                        </h4>
                    </CardTitle>
                    <div className='text-center'> <em>Class Teacher:</em> <h6 className='font-weight-bolder'>{Class.teacher_name}</h6> </div>
                </Button >
            </Link >
        )
    }
    if (ClassSection) {
        lowerCaseClassSection = ClassSection.cat_name.toLocaleLowerCase()
        return (
            < Link className="nav-link active text-light" to={`/${lowerCaseClassSection}/Classes`} >
                <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                    <CardTitle className='d-flex justify-content-center align-items-center  m-1' style={{ width: '100px', height: '100px' }}>

                        <h5 className='text-center font-weight-bolder text-success' >
                            {ClassSection.cat_name} SECTION
                                </h5>

                    </CardTitle>
                    <div className='text-center'> <em>Head of Section:</em> <h6 className='font-weight-bolder'>{ClassSection.hod_name}</h6> </div>
                </Button >
            </Link >
        )
    }


};

export default CardComp;
