import React, { useState, useEffect } from 'react';
import { Table, Card, Form, Label, Input, Button, FormGroup } from 'reactstrap';

import { dbServices } from '../../services/services';
import Header from '../Header';
import SideBar from '../SideBar/SideBar';


function ManageStudent(props) {
    const ClassName = props.match.params.ClassRoomName.toLocaleLowerCase()

    const gender = ['MALE', 'FEMALE']
    const [AllmyStudent, setAllmyStudent] = useState([])
    //const [studentInScores, setstudentInScores] = useState({})
    const [myStudent, setmyStudent] = useState({ fName: '', sName: '', gender: gender[0] })

    const [Scores, setScore] = useState(null)

    useEffect(() => {
        //fetch All Students
        dbServices.getStudentsAndScore(ClassName, setAllmyStudent, AllmyStudent, setScore)

    }, [])


    const changeHandler = (e) => {
        const value = e.target.value;
        const upperCaseValue = value.toLocaleUpperCase()
        setmyStudent({
            ...myStudent,
            [e.target.name]: upperCaseValue
        })


    }
    const AddmyStudentHandler = () => {
        if (myStudent.fName === '' || myStudent.sName === '') {
            alert(`"Student First Name" or "Student Surname" cannot be empty `)
        }
        else {

            let checkConflictArray = AllmyStudent.filter(students => students.fName === myStudent.fName && students.sName === myStudent.sName)
            if (checkConflictArray.length === 0) {
                setAllmyStudent(AllmyStudent.concat(myStudent))
            }
            else {
                alert(`${myStudent.fName} ${myStudent.sName} already added`)
            }
        }
    }

    const DeleteHandler = (e) => {
        const currentIndex = e.target.id
        let newAllmyStudent = [...AllmyStudent];
        newAllmyStudent.splice(currentIndex, 1)
        setAllmyStudent(newAllmyStudent)

        if (Scores) {
            for (const key in Scores) {
                if (Scores.hasOwnProperty.call(Scores, key)) {
                    Scores[key].splice(currentIndex, 1);
                }
            }
            setScore(Scores)
            dbServices.deleteStudentfromScore(ClassName, Scores)
        }



    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (AllmyStudent.length === 0) {
            alert(`No Student added`)

        }

        else {
            //Save Students to DB
            dbServices.saveStudents(ClassName, AllmyStudent)
        }
    }

    return (
        <div className='d-flex flex-row' >
            <SideBar />
            <div style={{ height: '100px', width: '150px' }} ></div>


            <div className='container d-flex justify-content-center align-items-center flex-column '>
                <Header />
                <h4 className='justify-self-center text-center text-success mt-4 font-weight-bold' >{ClassName.toLocaleUpperCase()}</h4>
                <h4 className='justify-self-center text-center text-success mt-4 font-weight-bold' >Register Student(s) Below</h4>
                <Card className='container shadow-lg p-3 mb-5 d-flex'>
                    <Form className='d-flex   flex-column '>
                        <FormGroup className='d-flex flex-row mr-0 justify-content-start'>
                            <Label for="username" className='font-weight-bold w-25 text-success'>Student First Name:</Label>
                            <Input type="text" name="fName" value={myStudent.fName} onChange={changeHandler} placeholder="e.g: Student First Name" />
                        </FormGroup >
                        <FormGroup className='d-flex flex-row mr-0 justify-content-start'>
                            <Label for="username" className='font-weight-bold w-25 text-success'>Student Surname Name:</Label>
                            <Input type="text" name="sName" value={myStudent.sName} onChange={changeHandler} placeholder="e.g: Student Surname" />
                        </FormGroup >
                        <FormGroup className='d-flex flex-row ' >
                            <Label for="username" className='font-weight-bold w-25 text-success'>Gender</Label>
                            <Input type="select" name='gender' value={myStudent.sGender} onChange={changeHandler} >
                                {gender.map((state, index) => (
                                    <option key={index}>{state}</option>
                                ))
                                }
                            </Input>
                        </FormGroup>
                    </Form>
                    <div className='d-flex align-self-center justify-content-lg-center '>
                        <Button className='text-light font-weight-bold'
                            color='success'
                            onClick={AddmyStudentHandler}>Add Student</Button>
                    </div>
                </Card>
                <Table className='text-success' bordered hover striped>
                    <thead>
                        <tr>

                            <th>Student Name</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            AllmyStudent.map((myStudent, index) => {
                                return (
                                    < tr key={index}>
                                        <td>{myStudent.fName} {myStudent.sName}</td>

                                        <td>{myStudent.gender}</td>
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
                    <Button className='text-light font-weight-bold'
                        color='success'
                        onClick={onSubmit}>Submit</Button>
                </div>

            </div>
        </div>

    )
}

export default ManageStudent
