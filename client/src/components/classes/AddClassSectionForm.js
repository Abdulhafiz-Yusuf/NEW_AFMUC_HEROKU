import React, { useState, useEffect, useContext } from 'react';
import { Table, Card, Form, Label, Input, Button, FormGroup } from 'reactstrap';
import { globalStore } from '../../AppStore/globalStore';
import { useHistory } from 'react-router-dom';
import { dbServices } from '../../services/services';
import { fetchAllSections, saveAllSection } from '../../AppStore/actions/ResultActions';


function AddclassCategoryForm(props) {

    const uid = props.user.uid
    const history = useHistory();

    const [ClassSection, setClassSection] = useState([])
    const [Section, setSection] = React.useState({ cat_name: '', hod_name: '', })

    useEffect(() => {
        //fetchAllSection
        fetchAllSections(setClassSection, uid)
    }, [])


    const changeHandler = (e) => {
        const value = e.target.value;
        const upperCaseValue = value.toLocaleUpperCase()
        setSection({
            ...Section,
            [e.target.name]: upperCaseValue
        })

    }
    const AddSectionHandler = () => {
        if (Section.cat_name === '' | Section.hod_name === '') {
            alert(`"Section Name" or "Head of Section" cannot be empty `)
        }

        if (ClassSection.length === 0 & !(Section.cat_name === '' | !Section.hod_name === '')) {
            console.log(Section)
            setClassSection(ClassSection.concat(Section))
        }
        if (ClassSection.length !== 0) {
            let checkConflictArray1 = ClassSection.filter(section => section.cat_name === Section.cat_name)
            if (checkConflictArray1.length === 0) {
                setClassSection(ClassSection.concat(Section))
            }
            else {
                console.log({ checkConflictArray1 })
                alert(`${Section.cat_name} section already added`)
            }
        }
    }


    const DeleteHandler = (e) => {
        const currentIndex = e.target.id

        let newAllSection = [...ClassSection];
        newAllSection.splice(currentIndex, 1)
        setClassSection(newAllSection)

    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (ClassSection.length === 0) {
            alert(`Atleast one section must be must added`)
        }

        else {
            //save all sections to DB
            saveAllSection(history, ClassSection, uid)

        }




    }

    return (
        <div className='d-flex flex-row' >

            <div className='container d-flex justify-content-center align-items-center flex-column '>
                <h4 className='justify-self-center text-center text-danger mt-4 font-weight-bold' >Register Section(s) Below</h4>
                <Card className='container shadow-lg p-3 mb-5 d-flex'>
                    <Form className='d-flex   flex-column '>
                        <FormGroup className='d-flex flex-row mr-0 justify-content-start'>
                            <Label for="username" className='font-weight-bold w-25 text-success'>Section Name:</Label>
                            <Input type="text" name="cat_name" value={Section.cat_name} onChange={changeHandler} placeholder="e.g: Nursery, Basic, JSS, SSS" />
                        </FormGroup >
                        <FormGroup className='d-flex flex-row ' >
                            <Label for="username" className='font-weight-bold w-25 text-success'>Head of Section:</Label>
                            <Input type="text" name="hod_name" value={Section.hod_name} onChange={changeHandler} placeholder="e.g Ustaz Zulqarnain" />
                        </FormGroup>
                    </Form>
                    <div className='d-flex align-self-center justify-content-lg-center '>
                        <Button className='text-light font-weight-bold'
                            color='success'
                            onClick={AddSectionHandler}>Add Section</Button>
                    </div>
                </Card>
                <Table className='text-success' bordered hover striped>
                    <thead>
                        <tr>

                            <th>Section Name</th>
                            <th>HOD Name</th>
                            <th>Number of Classes Registered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ClassSection.length !== 0 &&
                            ClassSection.map((section, index) => {
                                return (
                                    < tr key={index}>
                                        <td>{section.cat_name}</td>
                                        <td>{section.hod_name}</td>
                                        <td>0</td>
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

export default AddclassCategoryForm
