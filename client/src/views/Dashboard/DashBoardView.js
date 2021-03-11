import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookingPage from './BookingPage';
import PaymentPage from './PaymentPage';
import Profile from './Profile';

function DashBoardView({ user, user_id, bg, }) {


    return (
        <>
            <Router>
                <Switch>
                    <Route path="/testPage/booking" >
                        <BookingPage user_id={user_id} />
                    </Route>
                    <Route path="/testPage/profile">
                        <Profile user={user} bg={bg} />
                    </Route>
                    <Route path="/testPage/payment" component={PaymentPage} >
                        <PaymentPage user={user} />
                    </Route>
                </Switch>
            </Router>

        </>
    )
}

export default DashBoardView

