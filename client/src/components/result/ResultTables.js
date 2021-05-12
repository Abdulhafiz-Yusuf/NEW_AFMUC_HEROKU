import React from 'react'


export const Table = {
    pysochomotorTale: (pysochomotor) => {
        return (
            <table id='doubleTable' className='text-success border' >
                <thead>
                    <tr>
                        <th colSpan="6" className='text-center'>1. PSYCHOMOTOR </th>
                    </tr>
                    <tr>
                        <th className='text-center'></th>
                        <th className='text-center'>5</th>
                        <th className='text-center'>4</th>
                        <th className='text-center'>3</th>
                        <th className='text-center'>2</th>
                        <th className='text-center'>1</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pysochomotor.length !== 0 &&
                        pysochomotor.map((item, index) => {
                            return (
                                < tr key={index}>
                                    <td style={{ width: '250px' }}>{item}</td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    },
    affectiveDomainTable: (pysochomotor) => {
        return (
            <table id='doubleTable' className=' text-success border' >
                < thead >
                    <tr>
                        <th colSpan="6" className='text-center'> 2. AFFECTIVE DOMAIN </th>
                    </tr>
                    <tr>
                        <th className='text-center'></th>
                        <th className='text-center'>5</th>
                        <th className='text-center'>4</th>
                        <th className='text-center'>3</th>
                        <th className='text-center'>2</th>
                        <th className='text-center'>1</th>
                    </tr>
                </thead >
                <tbody className='w-100'>
                    {
                        pysochomotor.length !== 0 &&
                        pysochomotor.map((item, index) => {
                            return (
                                < tr key={index}>
                                    <td style={{ width: '250px' }} >{item}</td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    },
    attendanceTable: (attendeance) => {
        return (
            <table id='doubleTableminus' className='text-success border ' >
                <thead>
                    <tr>
                        <th colSpan="2" className='text-center'> 3. ATTENDANCE </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendeance.length !== 0 &&
                        attendeance.map((item, index) => {
                            return (
                                < tr key={index}>
                                    <td id='doubleTD'>{item}</td>
                                    <td id='doubleTD'></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    },

    physicalAndHealth: () => {
        return (
            <table id='doubleTablePlus' className='text-success border ' >
                <thead>
                    <tr>
                        <th colSpan="4" className='text-center'> 4. PHYSICAL DEVELOPMENT & HEALTH </th>
                    </tr>
                </thead>
                <tbody>
                    < tr className='text-center'>
                        <th colSpan="2" id='doubleTD'>HEALTH</th>
                        <th colSpan="2" id='doubleTD'>WEIGHT</th>
                    </tr>

                    < tr className='text-center'>
                        <td id='quarterTD'>Beginning of Term</td>
                        <td id='quarterTD'>End of Term</td>

                        <td id='quarterTD'>Beginning of Term</td>
                        <td id='quarterTD'>End of Term</td>
                    </tr>

                    < tr className='text-right'>
                        <td id='quarterTD'>m</td>
                        <td id='quarterTD'>m</td>

                        <td id='quarterTD'>kg</td>
                        <td id='quarterTD'>kg</td>

                    </tr>

                </tbody>
            </table >
        )
    },
    keyToRating: (key) => {
        return (
            <table id='rating' className=' text-success border' >
                < thead >
                    <tr>
                        <th colSpan="2" className='text-center'> KEY TO RATING </th>
                    </tr>
                </thead >
                <tbody className='w-100'>
                    {
                        key.length !== 0 &&
                        key.map((item, index) => {
                            return (
                                < tr key={index}>
                                    <td >{item}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    },

    keyToGrading: (key) => {
        return (
            <table id='grading' className=' text-success border' >
                < thead >
                    <tr>
                        <th colSpan="2" className='text-center'> KEY TO GRADING</th>
                    </tr>
                </thead >
                <tbody className='w-100'>
                    {
                        key.length !== 0 &&
                        key.map((item, index) => {
                            return (
                                < tr key={index}>
                                    <td >{item}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    },
    performanceTable: (performanceTableLabel, subjects, id, scores, currentData) => {
        var SumOfFinalPercentage = 0;
        console.log(subjects.length)
        return (

            <div style={{ width: '99%' }} >
                <table id='performanceTABLE' className='text-success text-center w-100 border' >
                    <thead>
                        <tr>
                            <th colSpan={performanceTableLabel.length + 1} className='text-center'> 5. PERFORMANCE IN SUBJECTS (COGNITIVE) </th>
                        </tr>
                    </thead>

                    <tbody >
                        <tr>
                            <td></td>
                            {
                                performanceTableLabel.map((label, labIndex) => {
                                    return (
                                        <td key={labIndex}>{label}</td>
                                    )
                                })
                            }
                        </tr>
                        {
                            subjects.length !== 0 &&
                            subjects.map((subject, subIndex) => {
                                if (!scores[subject.subjectName][id]) {
                                    window.location = `/${currentData.selectedClass}/classroom/${subject.subjectName}`
                                }
                                else {
                                    if (!(scores[subject.subjectName][id].hasOwnProperty("Test1")) || !(scores[subject.subjectName][id].hasOwnProperty("Test2")) || !(scores[subject.subjectName][id].hasOwnProperty("Exam"))) {
                                        alert("ERROR OCCURED! Please enter score for all students on every subject score sheet")
                                    }
                                    else {
                                        let IntparsedExam = parseInt(scores[subject.subjectName][id].Exam, 10) || 0
                                        let IntparsedTest1 = parseInt(scores[subject.subjectName][id].Test1, 10) || 0
                                        let IntparsedTest2 = parseInt(scores[subject.subjectName][id].Test2, 10) || 0
                                        let termTotal = IntparsedTest1 + IntparsedTest2 + IntparsedExam
                                        let IntparsedBForward = parseInt(scores[subject.subjectName][id].BForward, 10) || 0
                                        let cumulativeTotal = termTotal + IntparsedBForward
                                        let finalPercentage = cumulativeTotal / 2
                                        SumOfFinalPercentage = SumOfFinalPercentage + finalPercentage
                                        return (
                                            <tr key={subIndex} >
                                                <td className='text-left'>{subject.subjectName}</td>

                                                {/* Test 1  */}
                                                <td>{IntparsedTest1}</td>

                                                {/* Test 2 */}
                                                <td>{IntparsedTest2}</td>

                                                {/* Exam  */}
                                                <td>{IntparsedExam}</td>

                                                {/* Term Total  */}
                                                <td>{termTotal}
                                                </td>

                                                {/* Total B/Forward  */}
                                                <td>{IntparsedBForward}

                                                </td>
                                                {/* Cummulative Total  */}
                                                <td>{cumulativeTotal}
                                                </td>

                                                {/* Final %  */}
                                                <td>{finalPercentage}
                                                </td>

                                                {/* Grade  */}
                                                <td>{
                                                    finalPercentage >= 75 ? ("A")
                                                        :
                                                        finalPercentage >= 60 & finalPercentage <= 74 ? "B"
                                                            :
                                                            finalPercentage >= 50 & finalPercentage <= 59 ? "C"
                                                                :
                                                                "F"}
                                                </td>
                                                <td></td>
                                            </tr>

                                        )
                                    }//end of  else let ....

                                }//End of else if (!(scores[subject.subjectName][id].hasOwnProperty("Test1"))) .....
                            })
                        }





                    </tbody>
                </table >
                <div className='d-flex justify-content-end w-100'>
                    <div className='text-danger font-weight-bold border border-success text-center' style={{ width: '170px' }}>
                        {/* NOTE: SumOfFinalPercentage/subjects.length(Number of Subject) gives average */}
                        AVERAGE: {(SumOfFinalPercentage / subjects.length).toPrecision(4)}%
                        </div>
                </div>



            </div >


        )
    }
}

    // < div className = 'mt-4 w-100 d-flex flex-row justify-content-between' >
    //     {/* <Label className='font-weight-bold w-25 text-success'>No. of Distinction: {Distinction}</Label> */ }
    //     < Label className = 'font-weight-bold w-25 text-success' > No.of Credits: {}</Label>
    //                 <Label className='font-weight-bold w-25 text-success'>No. of Passes:{ }</Label>
    //                 <Label className='font-weight-bold w-25 text-success'>No. of Failed:{ }</Label>
    //             </div >