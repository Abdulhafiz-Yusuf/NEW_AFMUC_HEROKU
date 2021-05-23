//DEPENDENCIES
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//PAGES
import LogIn from './components/admin/LogIn';
import AllClassSection from './components/classes/AllClassSection'
import AllClasses from './components/classes/AllClasses'
import ClassRoom from './components/classes/ClassRoom';
import AddClassSectionForm from './components/classes/AddClassSectionForm'
import addClassForm from './components/classes/addClassForm'
import ManageStudent from './components/students/ManageStudent';
import ManageSubject from './components/subjects/ManageSubject';
import ResultsGenerator from './components/result/ResultsGenerator'
import ChangePwd from './components/admin/ChangePwd';
import GotoClass from './components/classes/GotoClass';
import NavBar from './components/NavBar';
import PrintResult from './components/result/PrintResult';




/*=====
APP.JS
=======*/
export default function App() {

  return (

    <Router TestId='App'>
      <NavBar />
      <div style={{ height: '200px' }}></div>
      <Switch >
        <Route path="/" exact component={LogIn} />
        <Route path="/allclassSection" exact component={AllClassSection} />

        <Route path="/:sectionname/classes" exact component={AllClasses} />

        <Route path="/addsection" exact component={AddClassSectionForm} />

        <Route path="/:sectionname/addclass" exact component={addClassForm} />

        <Route path="/:myClassName/classroom/:subjectName" exact component={ClassRoom} />
        <Route path="/:myClassName/classroom" exact component={ClassRoom} />
        <Route path="/:ClassRoomName/managesubjects" exact component={ManageSubject} />
        <Route path="/:ClassRoomName/managestudents" exact component={ManageStudent} />
        <Route path='/resultsgenerator' exact>
          <ResultsGenerator />
        </Route>
        <Route path="/results" exact component={PrintResult} />
        <Route path="/admin" exact component={ChangePwd} />
        <Route path="/gotoClass" exact component={GotoClass} />
      </Switch>

    </Router >

  );
}



