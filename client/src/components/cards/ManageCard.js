import React from 'react'
import { Link } from 'react-router-dom'
import { CardTitle, Button } from 'reactstrap';


function ManageCard({ currentClass, student, subject, NoOfSubjects, NoOfStudents }) {

    if (student && subject) {
        return (
            <div className='d-flex'>
                < Link className="nav-link active text-light" to={`/${currentClass}/${student}`} >
                    <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                        <CardTitle className='d-flex justify-content-center align-items-center  m-1' style={{ width: '100px', height: '100px' }}>
                            <h3
                                className='text-center font-weight-bolder text-success' >
                                Manage Students</h3>
                        </CardTitle>
                        <div className='text-center'> <em>Total Number of Students: {NoOfStudents}</em>
                            <h6 className='font-weight-bolder'>                            </h6>
                        </div>

                    </Button >
                </Link >
                < Link className="nav-link active text-light" to={`/${currentClass}/${subject}`} >
                    <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                        <CardTitle className='d-flex justify-content-center align-items-center  m-1' style={{ width: '100px', height: '100px' }}>
                            <h3
                                className='text-center font-weight-bolder text-success' >
                                Manage Subjects</h3>
                        </CardTitle>
                        <div className='text-center'> <em>Total Number of Subjects: {NoOfSubjects}</em>
                            <h6 className='font-weight-bolder'>                            </h6>
                        </div>
                    </Button >
                </Link >
            </div>

        )
    }
}
export default ManageCard
