import React from 'react';
import { Row, Col, Card, Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginValues, loginAction } from '../utils/login.js';

import { fetchTool } from '../utils/fetch';

class SignInPage extends React.Component {
    state = {
        toPath: '/components',
    }

    loadAccountInfo = () => {
        let arr, reg = new RegExp("(^| )" + 'accountInfo' + "=([^;]*)(;|$)");
        let accountInfo = '';
        arr = document.cookie.match(reg)
        if (arr) {
            accountInfo = unescape(arr[2]);
        }
        else {
            accountInfo = null;
        }
        if (Boolean(accountInfo) === false) {
            return false;
        } else {
            let username = "";
            let password = "";
            let login = "";

            let i = new Array()
            i = accountInfo.split("&");
            username = i[0];
            password = i[1];
            login = i[2];
            login = login === 'false' ? false : true;
            let values = { username, password, login };
            loginAction(values);
        }
    }

    componentWillMount() {
        this.loadAccountInfo();
    }

    handleSubmit = async (values) => {
        console.log(values);
        let { username, password, remember } = values;

        var result = await fetchTool('/login', { username, password });
        console.log(result)

        if (result.status !== 500 && result.success === true) {
            if (remember) {
                let accountInfo = username + '&' + password + '&' + true;
                let Days = 3;
                let exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                document.cookie = 'accountInfo' + "=" + escape(accountInfo) + ";expires=" + exp.toGMTString();
            }
            let values = { username, password, login: true }
            loginAction(values);
            this.props.history.push({ pathname: '/components' });
        }
        else {
            alert('密码错误');
        }
    }

    render() {
        if (loginValues.login) {
            return <Redirect to={this.state.toPath} />;
        }
        return (
            <div>
                <Row style={{ height: 100 }}></Row>
                <Row>
                    <Col span={8} />
                    <Col span={8} style={{ padding: 70 }}>
                        <Card title="账户登录" color='black' style={{ maxWidth: 350, minWidth: 350 }}>
                            <Form onFinish={this.handleSubmit} className="login-form" initialValues={{ remember: true }}>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: '请输入用户名!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Username:demo" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="Password:demo"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>记住我</Checkbox>
                                    </Form.Item>

                                    <a style={{ float: 'right' }} href="/#/register">
                                        注册新账户
                                    </a>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={8} />
                </Row>
            </div >
        );
    }
}

export default SignInPage;