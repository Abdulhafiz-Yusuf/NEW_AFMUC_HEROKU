import React from 'react'
import { Card, Label } from 'reactstrap';
import './result.css'


import * as Data from './ResultData'
import { Table } from './ResultTables';
import { dbServices } from '../../services/services';
import BackPrintBtn from './BackPrintBtn';



//IMPORTING IPCRENDERER


function Results() {

    const [students, setStudent] = React.useState([])
    const [scores, setScore] = React.useState({})
    const [subjects, setSubjects] = React.useState([])
    const [currentData, setCurrentData] = React.useState({})

    React.useEffect(() => {
        // fetch resultData from db and store in State
        dbServices.getResultData(setCurrentData, setScore, setStudent, setSubjects)


    }, [])


    return (
        <div>
            <BackPrintBtn />
            <div  >
                {
                    students.map((student, id) => {
                        return (
                            <Card key={id} id='result' className='h-100 d-flex justify-content-center align-items-center flex-column' >
                                <div className='d-flex flex-column align-items-center mb-1'>

                                    <h2 className='text-success text-center font-weight-bold' >AFMUC INTERNATIONAL MISSIONARY SCHOOL</h2>
                                    <h5 className='mt-0 text-success text-center font-weight-bold' >Aker/Saipem Road, Aker Junction, Azumini, Rumuolumeni, Portharcourt, Rivers State<br />
                                                                        Tel: 0810 324 2265, 0803 704 8190
                                                                E-mail: afmuc1@yahoo.com
                                                                                </h5>
                                    <h5 className='text-success text-center font-weight-bold' >NURSERY SECTION RESULT SHEET</h5>
                                </div >
                                <div className='mt-3 w-100 d-flex flex-row justify-content-between'>
                                    <Label className='font-weight-bold w-50 text-success'>Student's Name: {student.fName} {student.sName}</Label>
                                    <Label className='font-weight-bold w-25 text-success'>Term: {currentData.term}</Label>
                                    <Label className='font-weight-bold w-25 text-success'>Session: {currentData.session}</Label>
                                </div>
                                <div className=' w-100 d-flex flex-row justify-content-between'>
                                    <label className='font-weight-bold w-50 text-success'>Class: {currentData.selectedClass}</label>
                                    <Label className='font-weight-bold w-25 text-success'>Number in Class: {students.length}</Label>
                                    <Label className='font-weight-bold w-25 text-success'>{ } </Label>
                                </div>
                                <div className='mt-3 w-100 d-flex flex-row justify-content-between'>
                                    {Table.affectiveDomainTable(Data.affectiveDomainTableLabel)}
                                    {Table.pysochomotorTale(Data.pysochomotorTableLabel)}
                                </div>
                                <div className='mt-3 w-100 d-flex flex-row justify-content-between'>
                                    {Table.physicalAndHealth()}
                                    {Table.attendanceTable(Data.attendanceTableLabel)}
                                </div>
                                <div className='mt-4 w-100 d-flex flex-row justify-content-start'>
                                    {Table.performanceTable(Data.performanceTableLabel, subjects, id, scores, currentData)}
                                </div>

                                <div className='mt-3 w-100 d-flex flex-row justify-content-between'>
                                    {Table.keyToRating(Data.ratingData)}
                                    {Table.keyToGrading(Data.gradingData)}
                                </div>
                                <div className='mt-4 w-100 d-flex flex-row justify-content-between'>
                                    {
                                        currentData.nextTermBeing &&
                                        <Label className='font-weight-bold w-50 text-success'>Next Term Begins: {currentData.nextTermBeing}</Label>
                                    }
                                </div >
                                <div className='mt-3 w-100 d-flex flex-column justify-content-between'>
                                    <Label className='font-weight-bold w-100 text-success'>Class Teacher's Remark: _______________________________________________________________________________________________</Label>
                                    <Label className='font-weight-bold w-100 text-success'>_______________________________________________________________________________________ Signature: ____________________</Label>
                                    <Label className='font-weight-bold w-100 text-success'>Group Director's Remark: ______________________________________________________________________________________________</Label>
                                    <Label className='font-weight-bold w-100 text-success'>_______________________________________________________________________________________ Signature: ____________________</Label>
                                </div>
                            </Card >

                        )
                    })
                }
            </div >

        </div >
    )
}

export default Results;

