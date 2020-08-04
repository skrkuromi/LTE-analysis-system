import React from 'react';
import { Select, Button, List } from 'antd';
import { fetchTool } from '../utils/fetch';

const { Option } = Select;
class CellInfoQuery extends React.Component {
    state = {
        type: 'SECTOR_ID',
        value: undefined,
        sectorID: [],
        sectorName: [],
        data: [],
    }

    handleChange = (value) => {
        this.setState({
            type: value,
            value: undefined
        })
    }

    onChange = (value) => {
        this.setState({
            value
        })
    }

    handleClickQuery = async () => {
        const { type, value } = this.state;

        if (value === undefined) {
            alert("请输入小区的ID或Name");
            return
        }

        const data = [];
        let sector = [];
        if (type === "SECTOR_ID") {
            const result = await fetchTool('GET', '/tbcell/query_by_sector_id', { sector_id: value });
            if (result.status === undefined) {
                sector = result.msg[0];
            }
        } else if (type === "SECTOR_NAME") {
            const result = await fetchTool('GET', '/tbcell/query_by_sector_name', { sector_name: value });
            if (result.status === undefined) {
                sector = result.msg[0];
            }
        }

        for (let value in sector) {
            let str = ""
            if (sector[value].Valid === undefined) {
                str = sector[value];
            } else if (sector[value].Valid === false) {
                str = "NULL";
            } else {
                str = sector[value].Float64;
            }

            data.push(value + "：" + str);
        }
        this.setState({ data });
    }

    dropdownChange = async () => {
        const { type, sectorID, sectorName } = this.state;

        if (type === "SECTOR_ID" && sectorID.length === 0) {
            const result = await fetchTool('GET', '/tbcell/sector_id', {});
            if (result.status === undefined) {
                this.setState({
                    sectorID: result.msg
                })
            }
        } else if (type === "SECTOR_NAME" && sectorName.length === 0) {
            const result = await fetchTool('GET', '/tbcell/sector_name', {});
            if (result.status === undefined) {
                this.setState({
                    sectorName: result.msg
                })
            }
        }
    }

    render() {
        const { type, sectorID, sectorName, data } = this.state;
        const options = type === "SECTOR_ID" ?
            sectorID.map(data => <Option key={data}>{data}</Option>)
            : sectorName.map(data => <Option key={data}>{data}</Option>);
        return (
            <div>
                <div>
                    <Select
                        defaultValue="SECTOR_ID"
                        style={{ width: 120, marginRight: 20 }}
                        onChange={this.handleChange}
                    >
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
                <div style={{ paddingTop: 50, width: 600 }}>
                    <List
                        size="small"
                        bordered
                        dataSource={data}
                        style={{ maxHeight: '500px', overflow: 'scroll' }}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>
            </div>
        );
    }
}

export default CellInfoQuery;