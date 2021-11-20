import React from 'react'
import { Table, Button } from 'reactstrap';

import { dbUpdateSubject } from '../../AppStore/actions/ResultActions';


function SubjectTable({ AllmySubjects, setAllmySubjects, history, ClassName, uid }) {

    const DeleteHandler = (e) => {
        const currentIndex = e.target.id

        let newAllmySubjects = [...AllmySubjects];
        newAllmySubjects.splice(currentIndex, 1)
        setAllmySubjects(newAllmySubjects)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (AllmySubjects.length === 0) {
            alert(`Atleast one mySubjects must be must added`)
        }
        else {
            dbUpdateSubject(history, ClassName, AllmySubjects, uid)
        }
    }
    return (
        <div class='w-100'>
            <Table className='text-success' bordered hover striped>
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Teacher Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        AllmySubjects.length !== 0 &&
                        AllmySubjects.map((mySubjects, index) => {
                            return (
                                < tr key={index}>
                                    <td>{mySubjects.subjectName}</td>
                                    <td>{mySubjects.teacherName}</td>

                                    <td >
                                        <Button
                                            id={index}
                                            onClick={DeleteHandler}
                                            className='ml-2 text-light bg-success font-weight-bold'>Delete</Button>

                                    </td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>

            <div className='d-flex align-self-center justify-content-lg-center '>
                <Button className='text-light font-weight-bold mb-5'
                    color='success'
                    onClick={onSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default SubjectTable
