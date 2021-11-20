import React, { useEffect, useState } from 'react'
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';


//DATEPICKER AND ITS CSS
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { dbServices } from '../../services/services';
import { getResultGeneratorData, saveresultData } from '../../AppStore/actions/ResultActions';


function ResultsGenerator(props) {
    const uid = props.user.uid
    const [ResultGenData, setResultGenData] = useState({
        section: [],
        selectedSection: '',
        class: [],
        noOfClasses: 0,
        term: 'FIRST TERM',
        selectedClass: '',
        session: '',
        nextTermBeing: new Date()
    })

    useEffect(() => {
        let tempClassValue = []
        getResultGeneratorData(ResultGenData, setResultGenData, tempClassValue, uid)
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
            selectedSection: ResultGenData.selectedSection,
            selectedClass: ResultGenData.selectedClass,
            nextTermBeing: ResultGenData.nextTermBeing.toDateString(),
            session: ResultGenData.session
        }
        if (ResultGenData.session === '') {
            alert("'Session' cannot be empty")
        }
        else {
            //save resultData
            console.log(Data)
            saveresultData(Data, uid)
        }
    }


    return (
        <div>

            <div className='d-flex justify-content-center align-items-center flex-column'>

                <Card className='container border w-50 shadow-lg p-3 d-flex align-items-center'>
                    <h4 className='text-danger mb-5 text-center font-weight-bold' >                    RESULT GENERATOR</h4>                <Form >
                        <FormGroup className='d-flex w-100' >
                            <Label for="Class" className='text-success font-weight-bold pr-3'>Session:</Label>
                            <Input type="select" name="selectedSection" value={ResultGenData.selectedSection} onChange={handleChange} >
                                {ResultGenData.section.length > 0 &&
                                    ResultGenData.section.map((item, index) =>
                                        < option key={index} > {item.cat_name}</option>
                                    )
                                }
                            </Input>
                        </FormGroup>



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
            </div>
        </div >
    )
}

export default ResultsGenerator
