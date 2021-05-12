import React, { useState, useEffect } from "react";
import db from '../../db'
import Loading from './Loading'
import { Table, Input, Button } from 'reactstrap';

const EditableTable = ({ ClassName }) => {

    const [scoreDisplayData, setScore] = useState([])


    const [textChange, settextChange] = useState(true)


    useEffect(() => {
        // //FOR TESTING PURPOSE
        // db.allDocs({
        //     Include_docs: true
        // })
        //.then(result => console.log(result.rows))
        let tempData = []
        db.get(ClassName)
            .then(result => {
                console.log(result)
                if (result.scores) {
                    console.log('Scores: ' + result.scores)
                    setScore(result.scores)
                }
                else if (result.students) {
                    console.log(result.students)
                    result.students.forEach((element, index) => {
                        tempData = tempData.concat({ fName: element.fName, sName: element.sName, Test1: 0, Test2: 0, Exam: 0 })
                    })
                    setScore(scoreDisplayData.concat(tempData))
                }

            }).catch(err => {
                if (err) {
                    console.log(err)
                }
            })


    }, [])

    const changeHandler = async (e) => {
        let value = parseInt(e.target.value, 10) || 0;  //assing a integer to value OR 0 if NaN
        let currentIndex = parseInt(e.target.id, 10) //assing a integer to value 
        let tempStateData = scoreDisplayData
        tempStateData[currentIndex][e.target.name] = value
        setScore(tempStateData)
        settextChange(!textChange)
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if (scoreDisplayData.length === 0) {
            alert(`Atleast 1 'Student's Score' must be must added`)
        }
        db.get(ClassName)
            .then(doc => {
                db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    subjects: doc.subjects,
                    students: doc.students,
                    scores: scoreDisplayData
                }).then(result => {
                    if (result) {
                        settextChange(!textChange)
                        alert('Scores Saved Successfully')
                    }
                }).catch(function (err) {
                    if (err)
                        console.log('not updated')
                });
            }).catch(err => {
                if (err)
                    db.put({
                        _id: ClassName,
                        scores: scoreDisplayData,
                    }).then(result => {
                        if (result) {
                            settextChange(!textChange)
                            alert('Scores Saved Successfully')
                        }
                    }).catch(function (err) {
                        if (err)
                            console.log('not posted');
                    });
            })

    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column '>

            {scoreDisplayData.length === 0 ?
                <div></div>
                :
                scoreDisplayData === undefined ?
                    <Loading /> :

                    <div>
                        <Table className='text-success' bordered hover striped>
                            <thead>
                                <tr>

                                    <th>STUDENT NAME </th>
                                    <th>TEST 1</th>
                                    <th>TEST 2</th>
                                    <th>EXAM</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    scoreDisplayData.length !== 0 &&
                                    scoreDisplayData.map((currentData, index) => {

                                        return (
                                            < tr key={index}>
                                                <td>{currentData.fName} {currentData.sName}</td>
                                                <td>
                                                    <Input type="number" id={index} name="Test1" value={currentData.Test1} onChange={changeHandler} placeholder="TEST 1 SCORE" />
                                                </td>

                                                <td>
                                                    <Input type="number" id={index} name="Test2" value={currentData.Test2} onChange={changeHandler} placeholder="TEST 2 SCORE" />
                                                </td>
                                                <td>
                                                    <Input type="number" id={index} name="Exam" value={currentData.Exam} onChange={changeHandler} placeholder="EXAM SCORE" />
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
        </div>


    );
};

export default EditableTable;