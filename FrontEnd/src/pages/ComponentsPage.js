import React from 'react';
import { Menu, Row, Col, Divider } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class ComponentsPage extends React.Component {
    handleClick = e => {
        console.log('click ', e);
    };

    render() {
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
                </div>
                <div style={{ paddingTop: 40 }}>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256, height: 'calc(100vh - 104px)' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <MailOutlined />
                                    <span>Navigation One</span>
                                </span>
                            }
                        >
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <SettingOutlined />
                                    <span>Navigation Three</span>
                                </span>
                            }
                        >
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        );
    }
}

export default ComponentsPage;