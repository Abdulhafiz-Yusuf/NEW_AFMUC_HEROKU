import React, { useState, useEffect } from 'react';
import { Card, Form, Label, Input, Button, FormGroup } from 'reactstrap';
import { dbServices } from '../../services/services';
import Header from '../Header';
import SideBar from '../SideBar/SideBar';
import SubjectTable from './SubjectTable';



function ManageSubject(props) {
    const className = props.match.params.ClassRoomName.toLocaleLowerCase()
    console.log(className)
    const [AllmySubjects, setAllmySubjects] = useState([])
    const [mySubjects, setmySubjects] = useState({ subjectName: '', teacherName: '', })

    useEffect(() => {
        //fetch subjects and display in table
        dbServices.getSubjects(className, setAllmySubjects, AllmySubjects);
    }, [])



    const changeHandler = (e) => {
        const value = e.target.value;
        const upperCaseValue = value.toLocaleUpperCase()
        setmySubjects({
            ...mySubjects,
            [e.target.name]: upperCaseValue
        })

    }
    const AddmySubjectsHandler = () => {
        if (mySubjects.subjectName === '' | mySubjects.teacherName === '') {
            alert(`"Subject Name" or "Teacher's Name" cannot be empty `)
        }
        else {

            let checkConflictArray = AllmySubjects.filter(Class => Class.subjectName === mySubjects.subjectName)

            if (checkConflictArray.length === 0) {
                setAllmySubjects(AllmySubjects.concat(mySubjects))
            }
            else {
                console.log({ checkConflictArray })
                alert(`${mySubjects.subjectName} already added`)
            }
        }
    }



    return (
        <div className='d-flex flex-row' >

            <div className='container d-flex justify-content-center align-items-center flex-column '>

                <h4 className='justify-self-center text-center text-success mt-4 font-weight-bold' >{className.toLocaleUpperCase()}</h4>
                <h4 className='justify-self-center text-center text-success mt-4 font-weight-bold' >Register Subject(s) Below</h4>
                <Card className='container shadow-lg p-3 mb-5 d-flex'>
                    <Form className='d-flex   flex-column '>
                        <FormGroup className='d-flex flex-row mr-0 justify-content-start'>
                            <Label for="username" className='font-weight-bold w-25 text-success'>Subject Name:</Label>
                            <Input type="text" name="subjectName" value={mySubjects.subjectName} onChange={changeHandler} placeholder="e.g: Mathematics, English language " />
                        </FormGroup >
                        <FormGroup className='d-flex flex-row ' >
                            <Label for="username" className='font-weight-bold w-25 text-success'>Teacher's Name:</Label>
                            <Input type="text" name="teacherName" value={mySubjects.teacherName} onChange={changeHandler} placeholder="e.g Ustaz Zulqarnain" />
                        </FormGroup>
                    </Form>
                    <div className='d-flex align-self-center justify-content-lg-center '>
                        <Button className='text-light font-weight-bold'
                            color='success'
                            onClick={AddmySubjectsHandler}>Add Subjects</Button>
                    </div>
                </Card>
                <SubjectTable AllmySubjects={AllmySubjects} setAllmySubjects={setAllmySubjects} className={className} />
            </div>

        </div>
    )
}

export default ManageSubject
