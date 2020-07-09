import React from 'react';
import { Select, Button, Table } from 'antd';

const { Option } = Select;
let timeout;
let currentValue;
class CellInfoQuery extends React.Component {
    state = {
        type: 'SECTOR_ID',
        cell: null,
        data: [],
        value: undefined,
    }

    handleChange = (value) => {
        this.setState({
            type: value
        })
    }

    onChange = (value) => {
        console.log(`selected ${value}`);
    }

    handleClickQuery = () => {

    }

    fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const data = [];
        data.push({
            value: '9',
            text: '9999',
        });
        data.push({
            value: '00',
            text: '0000',
        });
        this.setState({
            data
        })

        timeout = setTimeout(this.fetch, 300);
    }

    dropdownChange = () => {
        console.log('---')
        this.fetch('q', data => this.setState({ data }));
    }

    render() {
        const dataSource = [
            {
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
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
        const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
        return (
            <div>
                <div>
                    <Select defaultValue="SECTOR_ID" style={{ width: 120, marginRight: 20 }} onChange={this.handleChange}>
                        <Option value="SECTOR_ID">小区ID</Option>
                        <Option value="SECTOR_NAME">小区名称</Option>
                    </Select>
                    <Select
                        showSearch
                        style={{ width: 300, marginRight: 20 }}
                        placeholder="Select SECTOR_ID or SECTOR_NAME"
                        optionFilterProp="children"
                        onChange={this.onChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onDropdownVisibleChange={this.dropdownChange}
                    >
                        {options}
                    </Select>
                    <Button onClick={this.handleClickQuery}>查询</Button>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        scroll={{ x: width < 1000 ? width : 1000 }}
                        size='small'
                        style={{ width: width + 5, maxWidth: 1000, display: 'inline-block' }}
                        pagination={false}
                    />
                </div>
            </div>
        );
    }
}

export default CellInfoQuery;