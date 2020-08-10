import React from 'react';
import { Button, Space, InputNumber } from 'antd';
import MyTable from '../utils/MyTable';
import { fetchTool } from '../utils/fetch';

class C2IInfoAnalysis extends React.Component {
    state = {
        data: [],
        percent: 50,
    }

    onChange = (value) => {
        this.setState({ percent: value });
    }

    handleClickQuery = async () => {
        const { percent } = this.state;
        const result = await fetchTool('GET', '/tbC2Inew/Query_tripleSector', { percent: percent / 100.0 });
        if (result.status === undefined) {
            const sector = result.msg || [];
            for (let i in sector) {
                const value = sector[i];
                value['key'] = i;
            }
            this.setState({ data: sector });
        } else {
            alert("查询失败");
        }
    }

    render() {
        const { data } = this.state;
        const columns = [];
        for (let value in data[0] || {}) {
            if (value === "key") continue;
            columns.push({
                title: value,
                dataIndex: value,
                key: value
            })
        }

        return (
            <div>
                <div>
                    <Space>
                        <InputNumber
                            defaultValue={50}
                            min={0}
                            max={100}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            onChange={this.onChange}
                        />
                        <Button onClick={this.handleClickQuery}>查询重叠覆盖三元组</Button>
                    </Space>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <MyTable columns={columns} data={data} parent="C2I" ></MyTable>
                </div>
            </div>
        );
    }
}

export default C2IInfoAnalysis;