import React from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { fetchTool } from '../utils/fetch';

class RegisterPage extends React.Component {

    handleSubmit = async (values) => {
        console.log(values);
        let { username, password } = values;

        var result = await fetchTool('/register', { username, password });
        console.log(result)

        if (result.status !== 500) {
            if (result.success === true) {
                alert(result.msg);
                this.props.history.push({ pathname: '/login' });
            } else {
                alert(result.msg);
            }
        } else {
            alert('访问异常');
        }
    }

    render() {
        return (
            <div>
                <Row style={{ height: 100 }}></Row>
                <Row>
                    <Col span={8} />
                    <Col span={8} style={{ padding: 70 }}>
                        <Card title="账户注册" color='black' style={{ maxWidth: 350, minWidth: 350 }}>
                            <Form onFinish={this.handleSubmit} className="login-form" initialValues={{ remember: true }}>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: '请输入用户名!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        注册
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

export default RegisterPage;