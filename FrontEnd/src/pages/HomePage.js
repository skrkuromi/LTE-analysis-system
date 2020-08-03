import React from 'react';
import SignInPage from './SignInPage';
import ComponentsPage from './ComponentsPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

class HomePage extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={SignInPage}/>
                    <PrivateRoute path="/components" component={ComponentsPage}/>
                </Switch>
            </Router>
        );
    }
}

export default HomePage;