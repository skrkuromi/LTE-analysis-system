import React from 'react';

export const globalData = {
    username: '',
    password: '',
    login: false
}

export const globalContext = React.createContext(globalData);

export const globalActions = self => ({
    loginSuccess(values){
        self.setState({
            ...values
        })
    }
})