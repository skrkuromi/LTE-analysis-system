import React from 'react';
import { Select, Button, DatePicker, Space } from 'antd';
import moment from 'moment';
import GraphModel from '../utils/GraphModel';
import { fetchTool } from '../utils/fetch';
import MyTable from '../utils/MyTable';

const { Option } = Select;
const { RangePicker } = DatePicker;

class KPIInfoQuery extends React.Component {
    state = {
        selectENodeB: undefined,
        eNodeBName: [],
        data: [],
    }

    disabledDate = (current) => {
        return current < moment(new Date('2016/07/16')) || current > moment(new Date('2016/07/19'));
    }

    onChange = (value) => {
        this.setState({
            selectENodeB: value
        })
    }

    handleClickQuery = async () => {
        const { selectENodeB } = this.state;

        if (selectENodeB === undefined) {
            alert("请选择eNodeB的Name!");
            return
        }

        let sector = [];
        const result = await fetchTool('GET', '/tbKPI/query_by_enodeb_name', { enodeb_name: selectENodeB });
        if (result.status === undefined) {
            sector = result.msg;
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
            currentSector['key'] = i;
        }

        this.setState({ data: sector });
    }

    dropdownChange = async () => {
        const { eNodeBName } = this.state;

        if (eNodeBName.length === 0) {
            const result = await fetchTool('GET', '/tbKPI/allKPIInfo', {});
            if (result.status === undefined) {
                this.setState({
                    eNodeBName: result.msg
                })
            }
        }
    }

    render() {
        const { eNodeBName, data } = this.state;
        const options = eNodeBName.map(data => <Option key={data}>{data}</Option>);

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
            <div style={{ overflowY: "scroll", maxHeight: 600 }}>
                <div>
                    <Space>
                        <Select
                            showSearch
                            style={{ width: 300, marginRight: 20 }}
                            placeholder="网元名称"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onDropdownVisibleChange={this.dropdownChange}
                        >
                            {options}
                        </Select>
                        <RangePicker
                            disabledDate={this.disabledDate}
                            defaultPickerValue={[moment('2016-07', 'YYYY-MM'), moment('2016-07', 'YYYY-MM')]}
                        />
                        <Button onClick={this.handleClickQuery}>查询</Button>
                    </Space>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <MyTable columns={columns} data={data}></MyTable>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <GraphModel click={this.state.click}></GraphModel>
                </div>
            </div>
        );
    }
}

export default KPIInfoQuery;