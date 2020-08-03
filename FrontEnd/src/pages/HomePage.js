import React from 'react';
import SignInPage from './SignInPage';
import ComponentsPage from './ComponentsPage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import RegisterPage from './RegisterPage';
import RouterPage from './RouterPage';

class HomePage extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={RouterPage}/>
                    <Route path="/login" component={SignInPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <PrivateRoute path="/components" component={ComponentsPage}/>
                </Switch>
            </Router>
        );
    }
}

export default HomePage;