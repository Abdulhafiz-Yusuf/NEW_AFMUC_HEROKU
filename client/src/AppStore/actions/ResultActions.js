import
// firebase,
{ db }
    from '../../services/firebase/FirebaseConfig'

//Firestore Refs
const SectiontDataRef = db.collection('section');




//RESULT ACTIONS
export const saveAllSection = (history, ClassSection, uid) => {
    console.log(ClassSection)
    SectiontDataRef.doc(uid)
        .set(
            {
                category: ClassSection,
                no_of_classes: 0
            }
        )
        .then(() => {
            history.push({
                pathname: '/allclassSection',
                // state: {}
            });
            alert('Section(s) added successful!')

        }).catch(function (err) {
            if (err)
                console.log('not updated')
        });
}

export const fetchAllSections = (setClassSection, uid) => {
    console.log(uid)
    SectiontDataRef
        .doc(uid)
        .get()
        .then((result) => {
            if (result)
                setClassSection(result.data().category)
            // else alert('You have no')
        })
        .catch(err =>
            console.log(err)
        )
}

export const saveAllClasses = (history, sectionName, classess, uid) => {
    console.log(classess)
    SectiontDataRef.doc(uid)
        .update(
            {
                [sectionName]: classess
            }
        )
        .then(() => {
            history.push({
                pathname: `/${sectionName}/classes`
                // state: {}
            });
            alert('Class(es) added successful!')

        }).catch(function (err) {
            if (err)
                console.log('not updated')
        });


}


export const fetchAllClasses = (sectionName, setClasses, uid) => {
    // const sectionName = sectionName
    SectiontDataRef
        .doc(uid)
        .get()
        .then((result) => {
            if (result) {
                console.log(result.data())
                setClasses(result.data()[sectionName])
                // else alert('You have no')
            }
        })
        .catch(err =>
            console.log(err)
        )
}



export const saveStudents = (history, ClassName, AllmyStudent, uid) => {
    console.log(ClassName)
    SectiontDataRef.doc(uid).get().then(result => {
        SectiontDataRef.doc(uid)
            .update(
                {
                    [ClassName]: {
                        subjects: result.data()[ClassName].subjects,
                        students: AllmyStudent
                    }
                }
            )
            .then(() => {
                history.push({
                    pathname: `/${ClassName}/classroom`
                    // state: {}
                });
                alert('Student(s) added successful!')

            }).catch(function (err) {
                if (err)
                    console.log(err + ' not updated')
            });
    }).catch(function (err) {
        if (err)
            console.log(err + ' not updated')
    });

}

export const getStudentsAndScore = (ClassName, setAllmyStudent, setScore, uid) => {
    // const sectionName = sectionName
    SectiontDataRef
        .doc(uid)
        .get()
        .then((result) => {
            if (result.data()[ClassName].students) {
                setAllmyStudent(result.data()[ClassName].students)
                // else alert('You have no')
            }
            if (result.data()[ClassName].scores) {
                setScore(result.data()[ClassName].scores)
                // else alert('You have no')
            }

        })
        .catch(err =>
            console.log(err)
        )
}

export const dbUpdateSubject = (history, ClassName, AllmySubjects, uid) => {
    console.log(AllmySubjects)
    SectiontDataRef.doc(uid).get().then(result => {
        SectiontDataRef.doc(uid).update(
            {
                [ClassName]: {
                    students: result.data()[ClassName].students,
                    subjects: AllmySubjects
                }
            }
        )
            .then(() => {
                history.push({
                    pathname: `/${ClassName}/classroom`
                    // state: {}
                });
                alert('Student(s) added successful!')

            }).catch(function (err) {
                if (err)
                    console.log('not updated: ' + err)
            });
    }
    ).catch(function (err) {
        if (err)
            console.log('not updated: ' + err)
    });
}

export const getSubjects = (ClassName, setAllmySubjects, uid) => {
    // const sectionName = sectionName
    SectiontDataRef
        .doc(uid)
        .get()
        .then((result) => {
            if (result.data()[ClassName].subjects) {
                setAllmySubjects(result.data()[ClassName].subjects)
                // else alert('You have no')
            }
            // if (result.data()[ClassName].scores) {
            //     setScore(result.data()[ClassName].scores)
            //     // else alert('You have no')
            // }

        })
        .catch(err =>
            console.log(err)
        )
}

export const saveScoreSheet = (ClassName, currentSubject, scoreDisplayData, settextChange, textChange, uid) => {
    SectiontDataRef.doc(uid).get().then(resp => {
        let result = resp.data()[ClassName]
        SectiontDataRef.doc(uid).update(
            {
                [ClassName]: {
                    students: result.students,
                    subjects: result.subjects,
                    scores: {
                        ...result.scores,
                        [currentSubject]: scoreDisplayData
                    }
                }
            }
        )
            .then(() => {
                if (result) {
                    settextChange(!textChange) //this is use to only redisplay the screen for the update
                    alert('Scores Saved Successfully')
                }

            }).catch(function (err) {
                if (err)
                    console.log('not updated: ' + err)
            });
    }
    ).catch(function (err) {
        if (err)
            console.log('not updated: ' + err)
    });
}


export const fetchStudentsAndSubjectsAndScores = (ClassName, setstudents, setAllSubject, setScore, allSubjects, uid) => {
    // const sectionName = sectionName
    SectiontDataRef
        .doc(uid)
        .get()
        .then(resp => {
            let result = resp.data()[ClassName]
            console.log(result)
            if (result.students)
                setstudents(result.students)
            if (result.subjects) {
                setAllSubject({ ...allSubjects, subjects: result.subjects, currentSubject: result.subjects[0].subjectName, })
            }
            if (result.scores) {
                setScore({ scores: result.scores[allSubjects.currentSubject] })
            }
        })
        .catch(err =>
            console.log(err)
        )
}


export const fetchScoreData = (ClassName, currentSubject, setScore, tempData, uid) => {
    // const sectionName = sectionName
    SectiontDataRef.doc(uid).get()
        .then(resp => {
            let result = resp.data()[ClassName]
            if (currentSubject) {
                //CURRENT SUBJECT IS NOT EMPTY
                console.log(currentSubject)
                if (result.scores[currentSubject]) {
                    //IF THERE IS SCORE FOR THAT CURRENT SUBJECT
                    if (result.students.length > result.scores[currentSubject].length) {
                        //IF NUMBER OF STUDENTS IS INCREASED UNDER MANAGEMENT STUDENT PAGE ADD THE NEW STUDENTS TO THE LIST OF scoreToDisplay
                        console.log("scores available for this subject")
                        setScore(result.scores[currentSubject].concat(result.students.slice(result.scores[currentSubject].length)))
                    }
                    if (result.scores[currentSubject].length === result.students.length) {
                        //IF NO ADDITIONAL STUDENTS THEN DISPLAY DB DATA FOR CURRENT SUBJECT
                        setScore(result.scores[currentSubject])
                    }
                }
                else if (!result.scores[currentSubject]) {
                    //IF SCORES DOES NOT EXIST IN DB (FIRST INSTANCE) FOR CURRENT SUBJECT THEN CREATE THE LIST BELOW BASE ON STUDENTS IN DB ALREADY
                    result.students.forEach((element, index) => {
                        tempData = tempData.concat({ fName: element.fName, sName: element.sName, Test1: 0, Test2: 0, Exam: 0, BForward: 0 })
                    })
                    setScore(tempData)
                }
            }
            if (!result.scores) {
                //IF SCORES DOES NOT EXIST AT ALL IN DB (FIRST INSTANCE) THEN CREATE THE LIST BELOW BASE ON STUDENTS IN DB ALREADY
                result.students.forEach((element, index) => {
                    tempData = tempData.concat({ fName: element.fName, sName: element.sName, Test1: 0, Test2: 0, Exam: 0, BForward: 0 })
                })
                setScore(tempData)
            }
        }).catch(err => {
            if (err) {
                console.log(err)
            }
        })
}

export const getGotoClassData = (ResultGenData, setResultGenData, tempClassValue, uid) => {
    SectiontDataRef.doc(uid).get()
        .then(resp => {
            let result = resp.data()
            console.log(result.category)
            setResultGenData({ ...ResultGenData, noOfClasses: result.category.length })
            result.category.forEach((element, index, array) => {
                console.log(result[element.cat_name.toLocaleLowerCase()])
                if (result[element.cat_name.toLocaleLowerCase()]) {
                    let Classes = result[element.cat_name.toLocaleLowerCase()]
                    tempClassValue = tempClassValue.concat(Classes)
                    setResultGenData({ ...ResultGenData, noOfClasses: index + 1, class: tempClassValue, selectedClass: tempClassValue[0].class_name, section: array, selectedSection: array[0].cat_name })
                }
            })

        })

}

export const saveresultData = (Data, uid) => {
    SectiontDataRef.doc(uid).get().then(result => {
        SectiontDataRef.doc(uid)
            .update({ resultData: Data })
            .then(() => {
                window.location = '/results'
            }).catch(function (err) {
                console.log(err)
            })
            .catch(function (err) {
                if (err)
                    console.log(err + ' not updated')
            });

    })
}

export const getResultGeneratorData = (ResultGenData, setResultGenData, tempClassValue, uid) => {
    SectiontDataRef.doc(uid).get()
        .then(resp => {
            let result = resp.data()

            setResultGenData({ ...ResultGenData, noOfClasses: result.category.length })
            result.category.forEach((element, index, array) => {
                if (result[element.cat_name.toLocaleLowerCase()]) {
                    let Classes = result[element.cat_name.toLocaleLowerCase()]
                    tempClassValue = tempClassValue.concat(Classes)
                    setResultGenData({
                        ...ResultGenData,
                        noOfClasses: index + 1,
                        class: tempClassValue,
                        selectedClass: tempClassValue[0].class_name,
                        section: array, selectedSection: array[0].cat_name
                    })
                }
            })
        })
}



export const getResultData = (setCurrentData, setScore, setStudent, setSubjects, uid) => {
    SectiontDataRef.doc(uid).get()
        .then(resp => {
            let result = resp.data()
            if (result) {
                //is resultData available in db store it in State
                setCurrentData(result.resultData)
                //fetch classroom Data from db and save in State
                const selectedClass = result.resultData.selectedClass.toLocaleLowerCase() // e.g nursery 1 === result.resultData.selectedClass.toLocaleLowerCase()
                setScore(result[selectedClass].scores);
                //      scores: {
                //     eng: [{ fName, sName, Test1, Test2, Exam }]
                //     math:[{fName,sName,Test1,Test2,Exam}]
                // }
                setStudent(result[selectedClass].students);
                // students: Array(3) i.e students = [{fName,sName,gender}]
                setSubjects(result[selectedClass].subjects)
                // subjects: Array(3) i.e subjects = [{subjectName:"ENGLISH STUDIES", teacherName:"MRS. HAFSOH"}, eng}]

            }
        })
        .catch(err => console.log(err))
}

