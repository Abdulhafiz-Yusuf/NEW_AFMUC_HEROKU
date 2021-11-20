import React, { useState, useEffect } from 'react'
import ManageCard from '../cards/ManageCard'
import { Label, Input } from 'reactstrap';
import ScoreSheetTable from './ScoreSheetTables';
import { fetchStudentsAndSubjectsAndScores } from '../../AppStore/actions/ResultActions';
import { useHistory } from 'react-router-dom';


function ClassRoom(props) {
    const subjectName = props.match.params.subjectName
    // const history = useHistory()
    const uid = props.user.uid

    let ClassName = props.match.params.myClassName.toLocaleLowerCase()
    const [students, setstudents] = useState([])
    const [allSubjects, setAllSubject] = useState({ subjects: [], })

    const [scoreDisplayData, setScore] = useState({})

    useEffect(() => {

        //fetch All subjects and scores for subject
        fetchStudentsAndSubjectsAndScores(ClassName, setstudents, setAllSubject, setScore, allSubjects, uid)

        if (subjectName) {
            alert('ERROR OCCURED!\n \nPlease ensure to enter ' + subjectName + ' score for each student')
        }
    }, [])

    const subjectChangeHandler = (e) => {
        const value = e.target.value;
        const upperCaseValue = value.toLocaleUpperCase()
        setAllSubject({
            ...allSubjects,
            currentSubject: upperCaseValue
        })
    }
    return (
        <div className='d-flex'>


            <div className='container d-flex justify-content-center align-items-center flex-column '>

                <h4 className='text-danger font-weight-bold' >
                    {ClassName.toLocaleUpperCase()}</h4>

                {/* Display the Manage Cards for Students and Subjects */}

                <ManageCard currentClass={ClassName} NoOfSubjects={allSubjects.subjects.length}
                    NoOfStudents={students.length} student='managestudents' subject='managesubjects' />

                <div>
                    {/* Dropdown options for Subjects */}
                    {
                        // Display this message if no Subject and Student Availabe for the Class
                        allSubjects.subjects.length === 0 || students.length === 0 ?
                            <h6 className='text-danger font-weight-bold' >
                                <em>You have either no 'Subject' or 'Student' registered for this class.
                                    <br />Please use  the buttons above to add Subjects and Students
                                </em></h6>
                            :
                            // the subjects Option drop
                            < div >
                                <h4 className='text-success text-center font-weight-bold' >Scoresheet for
                                    <i className='text-danger'> {allSubjects.currentSubject}</i></h4>
                                <div className='d-flex'>
                                    < Label for="exampleSelect">Change Subject:</Label>
                                    <Input type="select" name="currentSubject" value={allSubjects.currentSubject}
                                        onChange={subjectChangeHandler} >
                                        {
                                            allSubjects.subjects.map((state, index) => (
                                                <option key={index} value={state.subjectName}>{state.subjectName}</option>
                                            ))
                                        }
                                    </Input>
                                </div>
                            </div>
                    }

                </div>
                {
                    students.length !== 0 &&
                    < ScoreSheetTable ClassName={ClassName} students={students} scoreDisplayData={scoreDisplayData.score}
                        currentSubject={allSubjects.currentSubject} uid={uid} />
                }
            </div>
        </div >
    )
}

export default ClassRoom
