import React, { useState, useEffect } from 'react';
import { Table, Card, Form, Label, Input, Button, FormGroup } from 'reactstrap';
import { dbServices } from '../../services/services';
import Header from '../Header';
import SideBar from '../SideBar/SideBar';



function AddclassClassesForm(props) {
    const sectionName = props.match.params.sectionname.toLocaleLowerCase()
    console.log(sectionName)
    const [Classes, setClasses] = useState([])
    const [myClass, setmyClass] = useState({ class_name: '', teacher_name: '', })

    useEffect(() => {
        //fetchAllClassess
        dbServices.fetchAllClasses(sectionName, setClasses, Classes)
    }, [])

    const changeHandler = (e) => {
        const value = e.target.value;
        const upperCaseValue = value.toLocaleUpperCase()
        setmyClass({
            ...myClass,
            [e.target.name]: upperCaseValue
        })

    }
    const AddmyClassHandler = () => {
        if (myClass.class_name === '' | myClass.teacher_name === '') {
            alert(`"Class Name" or "Class Teacher's Name" cannot be empty `)
        }
        else {

            let checkConflictArray = Classes.filter(Class => Class.class_name === myClass.class_name)

            if (checkConflictArray.length === 0) {
                setClasses(Classes.concat(myClass))
            }
            else {
                console.log({ checkConflictArray })
                alert(`${myClass.class_name} class already added`)
            }
        }
    }
    // const EditHandler = (e) => {
    //     const currentIndex = e.target.id

    //     let tempStateData = [...Classes] //Create a dummy array variable to hold Classes 
    //     setmyClass(tempStateData[currentIndex])
    //     db.get(sectionName)
    //         .then(doc => {
    //             db.put({
    //                 _id: sectionName,
    //                 _rev: doc._rev,
    //                 Classes: Classes,
    //                 no_of_classes: 0
    //             }).then(result => {

    //                 // setClasses(tempStateData)
    //                 //settextChange(!textChange) //this is use to update state(causes change to DOM) so a re-render occur
    //                 //setClasses(Classes.concat(myClass))
    //             })
    //         })
    // }
    const DeleteHandler = (e) => {
        const currentIndex = e.target.id
        let newClasses = [...Classes];
        newClasses.splice(currentIndex, 1)
        setClasses(newClasses)

    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (Classes.length === 0) {
            alert(`Atleast one myClass must be must added`)
        }
        else {
            //saveClasses to DB
            dbServices.saveClasses(sectionName, Classes)
        }
    }

    return (
        <div className='d-flex flex-row' >
            <SideBar />
            {/* THE DIV BELOW SERVE AS TOP PADDING   */}
            <div style={{ height: '100px', width: '150px' }} ></div>
            <div className='container d-flex justify-content-center align-items-center flex-column '>
                <Header />
                <h4 className='justify-self-center text-center text-success mt-4 font-weight-bold' > {sectionName.toLocaleUpperCase()} SECTION</h4>

                <h4 className='justify-self-center text-center text-success mt-4 font-weight-bold' >Register Class(es)</h4>
                <Card className='container shadow-lg p-3 mb-5 d-flex'>
                    <Form className='d-flex   flex-column '>
                        <FormGroup className='d-flex flex-row mr-0 justify-content-start'>
                            <Label for="username" className='font-weight-bold w-25 text-success'>Class Name:</Label>
                            <Input type="text" name="class_name" value={myClass.class_name} onChange={changeHandler} placeholder="e.g: Nursery 1, Basic 2, JSS 3, SSS 1 " />
                        </FormGroup >
                        <FormGroup className='d-flex flex-row ' >
                            <Label for="username" className='font-weight-bold w-25 text-success'>Class Teacher Name:</Label>
                            <Input type="text" name="teacher_name" value={myClass.teacher_name} onChange={changeHandler} placeholder="e.g Ustaz Zulqarnain" />
                        </FormGroup>
                    </Form>
                    <div className='d-flex align-self-center justify-content-lg-center '>
                        <Button className='text-light font-weight-bold'
                            color='success'
                            onClick={AddmyClassHandler}>Add Class</Button>
                    </div>
                </Card>


                <Table className='text-success' bordered hover striped>
                    <thead>
                        <tr>

                            <th>Class Name</th>
                            <th>Class Teacher Name</th>
                            <th>Number of Subjects Registered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Classes.map((myClass, index) => {
                            return (
                                < tr key={index}>
                                    <td>{myClass.class_name}</td>
                                    <td>{myClass.teacher_name}</td>
                                    <td>0</td>
                                    <td >
                                        {/* <Button className='ml-2 text-light bg-success font-weight-bold'
                                            id={index}
                                            onClick={EditHandler}
                                        >
                                            Edit
                                        </Button> */}
                                        <Button className='ml-2 text-light bg-success font-weight-bold'
                                            id={index}
                                            onClick={DeleteHandler}
                                        >
                                            Delete
                                        </Button>


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

export default AddclassClassesForm
