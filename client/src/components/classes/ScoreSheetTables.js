import React, { useState, useEffect } from "react";
import Loading from '../reusables/Loading'
import { Table, Input, Button } from 'reactstrap';
import { dbServices } from "../../services/services";
import { fetchScoreData, saveScoreSheet } from "../../AppStore/actions/ResultActions";

const ScoreSheetTables = ({ currentSubject, ClassName, uid }) => {

    const [scoreDisplayData, setScore] = useState([])
    const [textChange, settextChange] = useState(true)


    useEffect(() => {
        let tempData = [];
        fetchScoreData(ClassName, currentSubject, setScore, tempData, uid)
    }, [currentSubject])

    const changeHandler = async (e) => {
        let value = parseInt(e.target.value, 10) || 0;  //assign an integer to value OR 0 if NaN
        let currentIndex = parseInt(e.target.id, 10) //assign an integer to value OR 0 if NaN

        let tempStateData = scoreDisplayData //Create a dummy array variable to hold scoreDisplayData 

        tempStateData[currentIndex][e.target.name] = value //NB: scoreDisplayData  === [{ fName: element.fName, sName: element.sName, Test1: 0, Test2: 0, Exam: 0 }]
        setScore(tempStateData)

        settextChange(!textChange) //this is use to update state(causes change to DOM) so a re-render occur
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if (scoreDisplayData.length === 0) {
            alert(`Atleast 1 'Student's Score' must be must added`)
        }

        //If score is not enter for any student
        else if (scoreDisplayData.length !== 0) {
            let checkifAllScoreFieldArray = scoreDisplayData.filter(
                // To check a key is available in an object === obj.hasOwnProperty("key")
                (element) => !element.hasOwnProperty("Test1") || !element.hasOwnProperty("Test2") || !element.hasOwnProperty("Exam") || !element.hasOwnProperty("BForward")
            )
            console.log(checkifAllScoreFieldArray)

            if (checkifAllScoreFieldArray.length > 0) {
                alert("'Test 1', Test 2' or 'Exam' or 'Total B/Forward'" + 'for ' + checkifAllScoreFieldArray[0].fName + " " + checkifAllScoreFieldArray[0].sName + ' cannot be empty')
            }
            else {
                //save scoreSheet to DB
                saveScoreSheet(ClassName, currentSubject, scoreDisplayData, settextChange, textChange, uid)
            }

        }


    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column '>

            {scoreDisplayData.length === 0 ?
                <div></div>
                :
                scoreDisplayData === undefined ?
                    <Loading /> :

                    <div >

                        <Table className='text-success' bordered hover striped>
                            <thead>
                                <tr>
                                    <th>STUDENT NAME </th>
                                    <th>TEST 1</th>
                                    <th>TEST 2</th>
                                    <th>EXAM</th>
                                    <th>TOTAL B/FORWARD</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    scoreDisplayData.length !== 0 &&
                                    scoreDisplayData.map((scoreToDisplay, index) => {

                                        return (
                                            < tr key={index}>
                                                <td>{scoreToDisplay.fName} {scoreToDisplay.sName}</td>
                                                <td>
                                                    <Input type="number" id={index} name="Test1" value={scoreToDisplay.Test1} onChange={changeHandler} placeholder="TEST 1 SCORE" />
                                                </td>

                                                <td>
                                                    <Input type="number" id={index} name="Test2" value={scoreToDisplay.Test2} onChange={changeHandler} placeholder="TEST 2 SCORE" />
                                                </td>
                                                <td>
                                                    <Input type="number" id={index} name="Exam" value={scoreToDisplay.Exam} onChange={changeHandler} placeholder="EXAM SCORE" />
                                                </td>
                                                <td>
                                                    <Input type="number" id={index} name="BForward" value={scoreToDisplay.BForward} onChange={changeHandler} placeholder="TOTAL B/FORWARD" />
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </Table >
                        <div className='d-flex align-self-center justify-content-lg-center '>
                            <Button className='text-light font-weight-bold'
                                color='success'
                                onClick={onSubmit}>Save Score Data</Button>
                        </div>
                    </div>
            }
        </div >


    );
};

export default ScoreSheetTables;