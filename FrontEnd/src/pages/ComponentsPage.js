import React from 'react';
import { Menu, Row, Col } from 'antd';
import {
    SearchOutlined,
    DatabaseOutlined,
    SettingOutlined,
    AntDesignOutlined
} from '@ant-design/icons';
import {
    Download,
    C2IInfoAnalysis,
    C2IInfoStatistics,
    CellInfoQuery,
    ENodeBInfoQuery,
    KPIInfoQuery,
    PRBInfoQuery,
    PRBInfoStatistics,
    UploadTest
} from '../components';
import { loginValues, loginInit } from '../utils/login.js';

const { SubMenu } = Menu;

class ComponentsPage extends React.Component {
    state = {
        key: '1'
    }

    handleClick = e => {
        this.setState({ key: e.key })
    };

    selectContent = () => {
        switch (this.state.key) {
            case '1': return <UploadTest></UploadTest>;
            case '2': return <Download></Download>;
            case '3': return <CellInfoQuery></CellInfoQuery>;
            case '4': return <ENodeBInfoQuery></ENodeBInfoQuery>;
            case '5': return <KPIInfoQuery></KPIInfoQuery>;
            case '6': return <PRBInfoStatistics></PRBInfoStatistics>;
            case '7': return <PRBInfoQuery></PRBInfoQuery>;
            case '8': return <C2IInfoStatistics></C2IInfoStatistics>;
            case '9': return <C2IInfoAnalysis></C2IInfoAnalysis>;
        }
    }

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
                    <Row>
                        <Col span={6}>
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
                                <SubMenu key="sub2" icon={<SearchOutlined />} title="信息查询">
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

                        </Col>
                        <Col span={18}>
                            {this.selectContent()}
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default ComponentsPage;