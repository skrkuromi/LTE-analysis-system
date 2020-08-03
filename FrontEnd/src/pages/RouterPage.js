import React from 'react';
import { Redirect, } from 'react-router-dom';

class RouterPage extends React.Component {

    render() {
        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default RouterPage;