import React from 'react';
import { Button, Table } from 'antd';

class C2IInfoAnalysis extends React.Component {
    state = {
        data: [],
        value: undefined,
    }

    handleClickQuery = () => {

    }

    render() {
        const dataSource = [
            {
                key: 1,
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: 2,
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        let width = 1000;
        return (
            <div>
                <div>
                    <Button onClick={this.handleClickQuery}>查询重叠覆盖三元组</Button>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        scroll={{ x: width < 1100 ? width : 1100 }}
                        size='small'
                        style={{ width: width + 5, maxWidth: 1100, display: 'inline-block' }}
                        pagination={false}
                    />
                </div>
            </div>
        );
    }
}

export default C2IInfoAnalysis;