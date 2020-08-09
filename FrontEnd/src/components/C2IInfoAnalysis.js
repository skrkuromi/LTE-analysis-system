import React from 'react';
import { Button } from 'antd';
import MyTable from '../utils/MyTable';
import { fetchTool } from '../utils/fetch';

class C2IInfoAnalysis extends React.Component {
    state = {
        data: [],
        value: undefined,
    }

    handleClickQuery = async () => {
        const res = await fetchTool('GET', '/tbC2Inew/query_tripleSector', {});
        console.log(res);
    }

    render() {
        const { data } = this.props;
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
        return (
            <div>
                <div>
                    <Button onClick={this.handleClickQuery}>查询重叠覆盖三元组</Button>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <MyTable columns={columns} data={data} parent="C2I" ></MyTable>
                </div>
            </div>
        );
    }
}

export default C2IInfoAnalysis;