import React from 'react'
import { Card, Label } from 'reactstrap';
import './result.css'
import Logo from './logo.jpg'

import * as Data from './ResultData'
import { Table } from './ResultTables';
import { dbServices } from '../../services/services';
import { getResultData } from '../../AppStore/actions/ResultActions';




//IMPORTING IPCRENDERER


function Results({ uid }) {

    const [students, setStudent] = React.useState([])
    const [scores, setScore] = React.useState({})
    const [subjects, setSubjects] = React.useState([])
    const [currentData, setCurrentData] = React.useState({})

    React.useEffect(() => {
        // fetch resultData from db and store in State
        getResultData(setCurrentData, setScore, setStudent, setSubjects, uid)
    }, [])
    console.log(currentData)

    return (


        <div  >
            {
                students.map((student, id) => {
                    return (
                        <Card key={id} id='result' className='h-90 d-flex justify-content-center align-items-center flex-column' >
                            <div className='d-flex'>
                                <img style={{ width: '100px', height: '100px' }} src={Logo} alt='Logo' />
                                <div className='d-flex ml-3 flex-column align-items-center mb-1'>

                                    <h2 className='text-success text-center font-weight-bold' >AFMUC INTERNATIONAL MISSIONARY SCHOOL</h2>
                                    <h5 className='w-75 mt-0 text-success text-center font-weight-bold' >Aker/Saipem Road, Aker Junction, Azumini, Rumuolumeni, Portharcourt, Rivers State<br />
                                        Tel: 0810 324 2265, 0803 704 8190
                                        E-mail: afmuc1@yahoo.com
                                    </h5>
                                </div>


                            </div >
                            <h5 className='text-danger text-center font-weight-bold' >{currentData.selectedSection} SECTION RESULT SHEET</h5>
                            <div className='mt-3 w-100 d-flex flex-row justify-content-between'>
                                <Label className='font-weight-bold w-50 text-danger'>STUDENT'S NAME: <span className='font-weight-bold w-50 text-success'>{student.fName} {student.sName}</span></Label>
                                <Label className='font-weight-bold w-25 text-danger'>TERM: <span className='font-weight-bold w-50 text-success'>{currentData.term}</span></Label>
                                <Label className='font-weight-bold w-25 text-danger'>SESSION: <span className='font-weight-bold w-50 text-success'>{currentData.session}</span></Label>
                            </div>
                            <div className=' w-100 d-flex flex-row justify-content-between'>
                                <label className='font-weight-bold w-50 text-danger'>CLASS: <span className='font-weight-bold w-50 text-success' > {currentData.selectedClass}</span></label>
                                <Label className='font-weight-bold w-25 text-danger'>NUMBER IN CLASS: <span className='font-weight-bold w-50 text-success'>{students.length}</span></Label>
                                <Label className='font-weight-bold w-25 text-danger'>{ } </Label>
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
                                <Label className='font-weight-bold w-100 text-success'>Class Teacher's Remark: ___________________________________________________________________________________________</Label>
                                <Label className='font-weight-bold w-100 text-success'>___________________________________________________________________________________ Signature: ____________________</Label>
                                <Label className='font-weight-bold w-100 text-success'>Group Director's Remark: __________________________________________________________________________________________</Label>
                                <Label className='font-weight-bold w-100 text-success'>___________________________________________________________________________________ Signature: ____________________</Label>
                            </div>
                        </Card >

                    )
                })
            }
        </div >


    )
}

export default Results;

