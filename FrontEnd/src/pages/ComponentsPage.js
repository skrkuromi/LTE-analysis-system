import React from 'react';
import { Menu, Row, Col } from 'antd';
import {
    SearchOutlined,
    DatabaseOutlined,
    SettingOutlined,
    AntDesignOutlined
} from '@ant-design/icons';
import { loginValues, loginInit } from '../utils/login.js';

const { SubMenu } = Menu;

class ComponentsPage extends React.Component {
    handleClick = e => {
        console.log('click ', e);
    };

    logout = () => {
        let { username, password } = loginValues;
        let accountInfo = username + '&' + password + '&' + false;
        let Days = 3;
        let exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = 'accountInfo' + "=" + escape(accountInfo) + ";expires=" + exp.toGMTString();

        loginInit();
    }

    render() {
        console.log(loginValues)
        return (
            <div>
                <div style={{ height: 64, boxShadow: '0px 10px 10px -10px #f0f1f2', display: 'flex' }}>
                    <div style={{ width: 256, display: 'flex', paddingLeft: 20 }}>
                        <Row style={{ width: 256, display: 'flex' }}>
                            <Col span={4} style={{ display: 'flex', }}>
                                <AntDesignOutlined style={{ alignItems: 'center', display: 'flex', fontSize: 24 }} />
                            </Col>
                            <Col span={20} style={{ display: 'flex', paddingTop: 5 }}>
                                <h2 style={{ alignItems: 'center', display: 'flex' }}>LTE Analysis System</h2>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ width: 1000, alignItems: 'center', display: 'flex' }}></div>
                    <a href="/" onClick={this.logout} style={{ alignItems: 'center', display: 'flex' }}>退出</a>
                </div>
                <div style={{ paddingTop: 30 }}>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256, height: 'calc(100vh - 94px)' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <DatabaseOutlined />
                                    <span>数据导入/导出</span>
                                </span>
                            }
                        >
                            <Menu.Item key="1">数据导入</Menu.Item>
                            <Menu.Item key="2">数据导出</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<SearchOutlined  />} title="信息查询">
                            <Menu.Item key="3">小区配置信息查询</Menu.Item>
                            <Menu.Item key="4">基站eNodeB信息查询</Menu.Item>
                            <Menu.Item key="5">KPI指标信息查询</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={
                                <span>
                                    <SettingOutlined />
                                    <span>PRB信息统计与查询</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">PRB信息统计</Menu.Item>
                            <Menu.Item key="7">PRB信息查询</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <SettingOutlined />
                                    <span>主邻小区C2I干扰分析</span>
                                </span>
                            }
                        >
                            <Menu.Item key="8">C2I干扰分析统计</Menu.Item>
                            <Menu.Item key="9">重叠覆盖干扰三元组查询</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        );
    }
}

export default ComponentsPage;