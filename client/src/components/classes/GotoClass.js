import React, { useEffect, useState } from 'react'
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';


//DATEPICKER AND ITS CSS
import { dbServices } from '../../services/services';


function ResultsGenerator() {

    const [ResultGenData, setResultGenData] = useState({
        class: [],
        selectedClass: ''
    })

    useEffect(() => {
        let tempClassValue = []
        dbServices.getResultGeneratorData(ResultGenData, setResultGenData, tempClassValue)
    }, [])

    const handleChange = (e) => {
        const value = e.target.value
        console.log(value)
        setResultGenData({
            ...ResultGenData,
            [e.target.name]: value
        })
    }
    console.log(ResultGenData)
    const onSubmit = (e) => {
        e.preventDefault()
        // const Data = {
        //     term: ResultGenData.term,
        //     selectedClass: ResultGenData.selectedClass,
        //     session: ResultGenData.session,
        //     nextTermBeing: ResultGenData.nextTermBeing.toDateString()
        // }

        window.location = `${ResultGenData.selectedClass.toLocaleLowerCase()}/classroom`

    }
    return (
        <div >

            <div className='d-flex justify-content-center align-items-center flex-column'>


                <Card className='container border w-50 shadow-lg p-3 d-flex align-items-center'>
                    <h4 className='text-danger mb-5 text-center font-weight-bold' > SPECIFY A DESIRED CLASS</h4>
                    <Form >
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
