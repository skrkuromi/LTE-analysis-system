export var loginValues = {
    username: '',
    password: '',
    login: false,
};

export function isLogin() {
    return loginValues.login;
}

export function loginAction(values) {
    loginValues = values;
}

export function loginInit(values) {
    loginValues = {
        username: '',
        password: '',
        login: false,
    };
}