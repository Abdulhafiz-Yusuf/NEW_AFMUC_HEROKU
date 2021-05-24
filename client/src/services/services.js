import db from '../db'

export const dbServices = {
    //FETCH OR GET REQUESTS
    getResultData: (setCurrentData, setScore, setStudent, setSubjects, setSection) => {

        db.get('resultData')
            .then(result => {
                if (result) {
                    //is resultData available in db store it in State
                    setCurrentData(result.resultData)
                    //fetch classroom Data from db and save in State
                    db.get(result.resultData.selectedClass.toLocaleLowerCase()) // e.g nursery 1 === result.resultData.selectedClass.toLocaleLowerCase()
                        .then(res => {
                            console.log(res)
                            // result === {subjects: Array(3), students: Array(2), scores: result.scores, _id: "basic 1", _rev: "11-65f4389ac05f9a59a734892a9aff5b10"}
                            setScore(res.scores);
                            //      scores: {
                            //     eng: [{ fName, sName, Test1, Test2, Exam }]
                            //     math:[{fName,sName,Test1,Test2,Exam}]
                            // }
                            setStudent(res.students);
                            // students: Array(3) i.e students = [{fName,sName,gender}]
                            setSubjects(res.subjects)
                            // subjects: Array(3) i.e subjects = [{subjectName:"ENGLISH STUDIES", teacherName:"MRS. HAFSOH"}, eng}]
                        })
                }
            })
            .catch(err => console.log(err))
    },

    getResultGeneratorData: (ResultGenData, setResultGenData, tempClassValue) => {
        db.get('Section')
            .then(result => {
                console.log(result.category)
                setResultGenData({ ...ResultGenData, noOfClasses: result.category.length })
                result.category.forEach((element, index, array) => {
                    db.get(element.cat_name.toLocaleLowerCase(),
                        (err, res) => {
                            if (res) {
                                console.log(res)
                                tempClassValue = tempClassValue.concat(res.Classes)
                                setResultGenData({ ...ResultGenData, noOfClasses: index + 1, class: tempClassValue, selectedClass: tempClassValue[0].class_name, section: array, selectedSection: array[0].cat_name })

                            }
                            if (err) {
                                return (err)
                            }

                        }
                    )

                })

            })
    },

    getSubjects: (className, setAllmySubjects, AllmySubjects) => {
        db.get(className)
            .then(result => {
                if (result.subjects)
                    setAllmySubjects(AllmySubjects.concat(result.subjects))
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    },

    getStudentsAndScore: (ClassName, setAllmyStudent, AllmyStudent, setScore) => {
        db.get(ClassName)
            .then(result => {
                if (result.students) {
                    setAllmyStudent(AllmyStudent.concat(result.students))
                }
                if (result.scores) {
                    setScore(result.scores)
                }
            })
            .catch(err => {
                if (err) {
                    setAllmyStudent([])
                }
            })
    },

    fetchAllClasses: (sectionName, setClasses, Classes) => {
        db.get(sectionName)
            .then(result => {
                console.log(result.Classes)
                setClasses(Classes.concat(result.Classes))
            })
            .catch(err => {
                if (err) {
                    console.log({ afterError: Classes })
                    setClasses([])
                    console.log(err)
                }
            })
    },

    fetchAllSections: (setClassSection, ClassSection) => {
        db.get('Section')
            .then(result => {
                console.log(result.category)
                setClassSection(ClassSection.concat(result.category))
            })
            .catch(err => {
                if (err) {
                    setClassSection([])
                    console.log(err)
                    console.log({ afterError: ClassSection })
                }
            })
    },

    fetchStudentsAndSubjectsAnsScores: (ClassName, setstudents, setAllSubject, setScore, allSubjects) => {
        db.get(ClassName)
            .then(result => {
                if (result.students)
                    setstudents(result.students)
                if (result.subjects) {

                    setAllSubject({ ...allSubjects, subjects: result.subjects, currentSubject: result.subjects[0].subjectName, })
                }
                if (result.scores) {
                    setScore({ scores: result.scores[allSubjects.currentSubject] })
                }

            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    },

    fetchScoreData: (ClassName, currentSubject, setScore, tempData) => {
        db.get(ClassName)
            .then(result => {
                console.log(result)
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
    },

    changePasswordinDb: (profile) => {
        db.get('userId')
            .then(doc => {
                db.put({
                    _id: 'userId',
                    _rev: doc._rev,
                    username: doc.username,
                    password: profile.password
                }).then(result => {
                    alert("Password Successfully Changed")
                    window.location = '/'
                    console.log(result)
                })
                    .catch(function (err) {
                        console.log(err)
                    })
            }).catch(getResultError => {
                console.log("getResult Error: " + getResultError)
            })
    },

    initalizeAdminCredentials: () => {
        db.get('userId')
            .then(doc => {
                db.put({
                    _id: 'userId',
                    _rev: doc._rev,
                    username: doc.username,
                    password: doc.password
                }).then(result => { console.log(result) })
                    .catch(function (err) {
                        console.log(err)
                    })
            }).catch(getResultError => {
                if (getResultError)
                    db.put({
                        _id: 'userId',
                        username: 'admin',
                        password: 'admin'
                    }).then(result => { console.log(result) })
                        .catch(function (err) {
                            console.log(err)
                        })
            })

    },

    authenticateAdmin: (profile) => {

        db.get('userId').
            then(result => {
                console.log(result)
                if (profile.username === result.username & profile.password === result.password) {
                    window.location = '/allclassSection'
                }
                else {
                    alert('Wrong username or Passsword')
                }
            }).catch(function (err) {
                console.log(err)
            });

    },

    //API POST REQUESTS
    saveScoreSheet: (ClassName, currentSubject, scoreDisplayData, settextChange, textChange) => {
        db.get(ClassName)
            .then(doc => {
                db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    subjects: doc.subjects,
                    students: doc.students,
                    scores: {
                        ...doc.scores,
                        [currentSubject]: scoreDisplayData
                    }
                }).then(result => {
                    if (result) {
                        settextChange(!textChange) //this is use to only redisplay the screen for the update
                        alert('Scores Saved Successfully')
                    }
                })
                    .catch(function (err) {
                        if (err)
                            console.log('not updated')
                    });
            }).catch(err => {
                if (err)
                    db.put({
                        _id: ClassName,
                        scores: {
                            [currentSubject]: scoreDisplayData,
                        }
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
    },

    saveClasses: (sectionName, Classes) => {
        db.get(sectionName)
            .then(doc => {
                db.put({
                    _id: sectionName,
                    _rev: doc._rev,
                    Classes: Classes,
                    no_of_classes: 0
                }).then(result => {
                    if (result)
                        window.location = `/${sectionName}/classes`
                }).catch(function (err) {
                    if (err)
                        console.log('not updated')
                });
            }).catch(err => {
                if (err)
                    db.put({
                        _id: sectionName,
                        Classes: Classes,
                        no_of_classes: 0
                    }).then(result => {
                        if (result)
                            window.location = `/${sectionName}/classes`
                    }).catch(function (err) {
                        if (err)
                            console.log('not posted');
                    });
            })
    },

    saveAllSection: (ClassSection) => {
        db.get('Section')
            .then(doc => {
                db.put({
                    _id: 'Section',
                    _rev: doc._rev,
                    category: ClassSection,
                    no_of_classes: 0
                }).then(result => {
                    if (result)
                        window.location = '/allclassSection'
                }).catch(function (err) {
                    if (err)
                        console.log('not updated')
                });
            }).catch(err => {
                if (err)
                    db.put({
                        _id: 'Section',
                        category: ClassSection,
                        no_of_classes: 0
                    }).then(result => {
                        if (result)
                            window.location = '/allclassSection'
                    }).catch(function (err) {
                        if (err)
                            console.log('not posted');
                    });
            })
    },

    dbUpdateSubject: (className, AllmySubjects) => {
        db.get(className)
            .then(doc => {
                db.put({
                    _id: className,
                    _rev: doc._rev,
                    scores: doc.scores,
                    students: doc.students,
                    subjects: AllmySubjects,
                }).then(result => {
                    if (result)
                        console.log(result)
                    window.location = `/${className}/classroom`
                }).catch(function (err) {
                    if (err)
                        console.log('not updated')
                });
            }).catch(err => {
                if (err)
                    db.put({
                        _id: className,
                        subjects: AllmySubjects,
                    }).then(result => {
                        if (result)
                            console.log(result)
                        window.location = `/${className}/classroom`
                    }).catch(function (err) {
                        if (err)
                            console.log('not posted');
                    });
            })
    },

    saveStudents: (ClassName, AllmyStudent,) => {
        db.get(ClassName)
            .then(doc => {
                db.put({
                    _id: ClassName,
                    _rev: doc._rev,
                    subjects: doc.subjects,
                    scores: doc.scores,
                    students: AllmyStudent
                }).then(result => {
                    if (result)
                        window.location = `/${ClassName}/classroom`
                }).catch(function (err) {
                    if (err)
                        console.log('not updated')
                });
            }).catch(err => {
                if (err)
                    db.put({
                        _id: ClassName,
                        students: AllmyStudent,
                    }).then(result => {
                        if (result)
                            window.location = `/${ClassName}/classroom`
                    }).catch(function (err) {
                        if (err)
                            console.log('not posted');
                    });

            })

    },

    saveresultData: (Data) => {
        db.get('resultData')
            .then(doc => {
                db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    resultData: Data
                }).then(function (response) {
                    if (response)
                        window.location = '/results'
                }).catch(function (err) {
                    console.log(err)
                })
            })
            .catch(function (err) {
                if (err) {
                    db.put({
                        _id: 'resultData',
                        resultData: Data,
                    }).then(result => {
                        if (result) {
                            alert('Saved Successfully')
                            window.location = '/results'
                        }

                    }).catch(function (err) {
                        if (err) console.log('not posted');
                    });
                }
            })
    },
    //UPDATING DB
    deleteStudentfromScore: (ClassName, Scores,) => {
        db.get(ClassName)
            .then(doc => {
                db.put({
                    _id: ClassName,
                    _rev: doc._rev,
                    subjects: doc.subjects,
                    students: doc.students,
                    scores: Scores
                }).then(function (response) {
                    if (response)
                        console.log("Done")
                }).catch(function (err) {
                    console.log(err);
                })
            })
    }
}



