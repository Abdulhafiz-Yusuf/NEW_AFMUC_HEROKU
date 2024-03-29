//DEPENDENCIES
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//PAGES
import LogIn from './components/admin/LogIn';
import SignUp from './components/admin/SignUp';
import AllClassSection from './components/classes/AllClassSection'
import AllClasses from './components/classes/AllClasses'
import ClassRoom from './components/classes/ClassRoom';
import AddClassSectionForm from './components/classes/AddClassSectionForm'
import AddClassForm from './components/classes/addClassForm'
import ManageStudent from './components/students/ManageStudent';
import ManageSubject from './components/subjects/ManageSubject';
import ResultsGenerator from './components/result/ResultsGenerator'
import ChangePwd from './components/admin/ChangePwd';
import GotoClass from './components/classes/GotoClass';
import NavBar from './components/NavBar';
import PrintResult from './components/result/PrintResult';
import Firebase from './services/firebase/FirebaseConfig';
import LoadScreen from './components/common/LoadScreen';






/*=====
APP.JS
=======*/
export default function App() {
  const [isLoading, setisLoading] = useState(false)
  const [user, setuser] = useState()

  function onAuthStateChange() {
    setisLoading(true)
    return Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setuser(user)
        setisLoading(false)
        console.log("The user is logged in");
      } else {
        setisLoading(false)
        console.log("The user is not logged in");
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  }, []);


  if (isLoading) {
    return (
      <LoadScreen text='' height='100vh' />
    )
  }
  if (!user) {
    return (
      <Router TestId='App'>
        <Switch >
          <Route path="/" exact component={LogIn} />
        </Switch>
      </Router>
    )


  }
  else if (user) {
    return (
      <Router TestId='App'>
        <NavBar />
        <div style={{ height: '200px' }}></div>
        <Switch >
          <Route path="/" exact component={LogIn} />

          <Route path="/signup" exact component={SignUp} />

          <Route
            path="/allclassSection"
            render={(props) => (
              <AllClassSection {...props} user={user} />
            )}
          />





          <Route
            path='/:sectionname/classes'
            render={(props) => (
              <AllClasses {...props} user={user} />
            )}
          />


          <Route
            path="/addsection"
            render={(props) => (
              <AddClassSectionForm {...props} user={user} />
            )}
          />

          <Route
            path="/:sectionname/addclass"
            render={(props) => (
              <AddClassForm {...props} user={user} />
            )}
          />


          <Route
            path="/:ClassRoomName/managestudents"
            render={(props) => (
              <ManageStudent {...props} user={user} />
            )}
          />

          <Route
            path="/:ClassRoomName/managesubjects"
            render={(props) => (
              <ManageSubject {...props} user={user} />
            )}
          />



          <Route
            path='/resultsgenerator'
            render={(props) => (
              <ResultsGenerator {...props} user={user} />
            )}
          />


          {/* <Route
            path="/result"
            render={(props) => (
              <Results {...props} user={user} />
            )}
          /> */}

          <Route
            path="/results"
            render={(props) => (
              <PrintResult {...props} user={user} />
            )}
          />

          <Route
            path="/:myClassName/classroom/:subjectName"
            render={(props) => (
              <ClassRoom {...props} user={user} />
            )}
          />

          <Route
            path="/:myClassName/classroom"
            render={(props) => (
              <ClassRoom {...props} user={user} />
            )}
          />

          <Route
            path="/admin"
            render={(props) => (
              <ChangePwd {...props} user={user} />
            )}
          />

          <Route
            path="/gotoClass"
            render={(props) => (
              <GotoClass {...props} user={user} />
            )}
          />


        </Switch>

      </Router >

    );
  }

}

