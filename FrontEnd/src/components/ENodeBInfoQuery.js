import React from 'react';
import { Select, Button } from 'antd';
import { fetchTool } from '../utils/fetch';
import MyTable from '../utils/MyTable';

const { Option } = Select;

class ENodeBInfoQuery extends React.Component {
    state = {
        type: 'ENODEBID',
        value: undefined,
        eNodeBID: [],
        eNodeBName: [],
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
            alert("请输入eNodeB的ID或Name!");
            return
        }

        let sector = [];
        if (type === "ENODEBID") {
            const result = await fetchTool('GET', '/tbcell/query_by_enodeb_id', { enodeb_id: value });
            if (result.status === undefined) {
                sector = result.msg;
            }
        } else if (type === "ENODEB_NAME") {
            const result = await fetchTool('GET', '/tbcell/query_by_enodeb_name', { enodeb_name: value });
            if (result.status === undefined) {
                sector = result.msg;
            }
        }

        for (let i = 0; i < sector.length; i++) {
            let currentSector = sector[i];
            for (let value in currentSector) {
                if (currentSector[value].Valid === false) {
                    currentSector[value] = "NULL";
                } else if (currentSector[value].Valid === true) {
                    currentSector[value] = currentSector[value].Float64;
                }
            }
            currentSector['key'] = i.toString();
        }

        this.setState({ data: sector });
    }

    dropdownChange = async () => {
        const { type, eNodeBID, eNodeBName } = this.state;

        if (type === "ENODEBID" && eNodeBID.length === 0) {
            const result = await fetchTool('GET', '/tbcell/enodeb_id', {});
            if (result.status === undefined) {
                this.setState({
                    eNodeBID: result.msg
                })
            }
        } else if (type === "ENODEB_NAME" && eNodeBName.length === 0) {
            const result = await fetchTool('GET', '/tbcell/enodeb_name', {});
            if (result.status === undefined) {
                this.setState({
                    eNodeBName: result.msg
                })
            }
        }
    }

    render() {
        const { type, eNodeBID, eNodeBName, data } = this.state;
        const options = type === "ENODEBID" ?
            eNodeBID.map(data => <Option key={data}>{data}</Option>)
            : eNodeBName.map(data => <Option key={data}>{data}</Option>);

        const columns = [];
        let column = data[0] || [];

        for (let value in column) {
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
                    <Select
                        defaultValue="ENODEBID"
                        style={{ width: 120, marginRight: 20 }}
                        onChange={this.handleChange}
                    >
                        <Option value="ENODEBID">基站ID</Option>
                        <Option value="ENODEB_NAME">基站名称</Option>
                    </Select>
                    <Select
                        showSearch
                        style={{ width: 300, marginRight: 20 }}
                        placeholder="Select ENODEBID or ENODEB_NAME"
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
                    <MyTable columns={columns} data={data} parent='EnodeB' ></MyTable>
                </div>
            </div>
        );
    }
}

export default ENodeBInfoQuery;