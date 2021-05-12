import React, { useEffect, useState } from 'react'
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Header from '../Header'

//DATEPICKER AND ITS CSS
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SideBar from '../SideBar/SideBar';
import { dbServices } from '../../services/services';


function ResultsGenerator() {

    const [ResultGenData, setResultGenData] = useState({
        class: [],
        noOfClasses: 0,
        term: 'FIRST TERM',
        selectedClass: '',
        session: '',
        nextTermBeing: new Date()
    })

    useEffect(() => {
        let tempClassValue = []
        dbServices.getResultGeneratorData(ResultGenData, setResultGenData, tempClassValue)
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;

        setResultGenData({
            ...ResultGenData,
            [e.target.name]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const Data = {
            term: ResultGenData.term,
            selectedClass: ResultGenData.selectedClass,
            session: ResultGenData.session,
            nextTermBeing: ResultGenData.nextTermBeing.toDateString()
        }
        if (ResultGenData.session === '') {
            alert("'Session' cannot be empty")
        }
        else {
            //save resultData
            console.log(Data)
            dbServices.saveresultData(Data)
        }
    }
    return (
        <div >
            <SideBar />
            <div className='container d-flex justify-content-center align-items-center flex-column '>
                <Header />
            </div>
            <Card className='container border w-50 shadow-lg p-3 d-flex align-items-center'>
                <h4 className='text-success text-center font-weight-bold' >                    RESULT GENERATOR</h4>                <Form >
                    <FormGroup className='d-flex w-100' >
                        <Label for="Class" className='text-success font-weight-bold pr-3'>Class:</Label>
                        <Input type="select" name="selectedClass" value={ResultGenData.selectedClass} onChange={handleChange} >
                            {
                                ResultGenData.class.map((item, index) =>
                                    < option key={index} > {item.class_name}</option>
                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup className='d-flex w-100'>
                        <Label for="Class" className='text-success font-weight-bold pr-3'>Term</Label>
                        <Input type="select" name="term" value={ResultGenData.term} onChange={handleChange} >
                            <option >FIRST TERM</option>
                            <option >SECOND TERM</option>
                            <option >THIRD TERM</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className='d-flex w-100' >
                        <Label for="Session" className='text-success font-weight-bold pr-3'>Session</Label>
                        <Input type="text" name="session" value={ResultGenData.session} onChange={handleChange} placeholder="e.g 2021/2022" />
                    </FormGroup  >
                    <div className='d-flex w-100 mb-3'>
                        <Label for="Next Term Resumption Date" className='text-success font-weight-bold pr-3'>Next Term Begin on</Label>
                        <DatePicker selected={ResultGenData.nextTermBeing} calendarClassName="rasta-stripes" onChange={date => { setResultGenData({ ...ResultGenData, nextTermBeing: date }); }} />
                    </div>
                </Form >
                <div className='d-flex justify-content-lg-center '>
                    {/* using this button to test CONTEXT API */}
                    <Button className='text-light font-weight-bold pr-3'
                        color='success'
                        onClick={onSubmit}>Submit</Button>
                </div>
            </Card >
        </div >
    )
}

export default ResultsGenerator
