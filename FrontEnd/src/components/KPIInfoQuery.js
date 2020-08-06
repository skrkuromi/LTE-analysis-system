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
        selectSector: undefined,
        selectSectorAttr: undefined,
        sectorName: [],
        sectorAttr: [],
        data: [],
        date: [],
    }

    disabledDate = (current) => {
        return current < moment(new Date('2016/07/16')) || current > moment(new Date('2016/07/19'));
    }

    onChange = (value) => {
        this.setState({
            selectSector: value
        })
    }

    onAttrChange = (value) => {
        this.setState({
            selectSectorAttr: value
        })
    }

    dataChange = (date, string) => {
        this.setState({
            date: string
        })
    }

    handleClickQuery = async () => {
        const { selectSector, selectSectorAttr, date } = this.state;
        console.log(selectSector, selectSectorAttr, date)

        if (selectSector === undefined) {
            alert("请选择小区的名称!");
            return
        } else if (selectSectorAttr === undefined) {
            alert("请选择网元属性!");
            return
        } else if (date[0] === undefined || date[1] === undefined) {
            alert("请选择起始时间!");
            return
        }

        let sector = [];
        const result = await fetchTool('GET', '/tbKPI/query_by_Sector_name', {
            SectorName: selectSector,
            Attribute: selectSectorAttr,
            StartTime: date[0],
            EndTime: date[1]
        });

        console.log(result);

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
        const { sectorName } = this.state;

        if (sectorName.length === 0) {
            const result = await fetchTool('GET', '/tbKPI/QueryAllKPISector', {});
            if (result.status === undefined) {
                this.setState({
                    sectorName: result.msg
                })
            }
        }
    }

    dropdownAttrChange = async () => {
        const { sectorAttr } = this.state;

        if (sectorAttr.length === 0) {
            const result = await fetchTool('GET', '/tbKPI/QueryAllKPIAtt', {});
            if (result.status === undefined) {
                const sectorAttr = [];
                for (let attrIndex in result.msg) {
                    const value = result.msg[attrIndex];
                    if (value === "起始时间" || value === "周期" || value === "网元名称" ||
                        value === "小区" || value === "小区1") continue;
                    sectorAttr.push(value);
                }
                this.setState({
                    sectorAttr
                })
            }
        }
    }

    render() {
        const { sectorName, data, sectorAttr } = this.state;
        const sectorOptions = sectorName.map(data => <Option key={data}>{data}</Option>);
        const attrOptions = sectorAttr.map(data => <Option key={data}>{data}</Option>);

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
                            style={{ width: 300, marginRight: 10 }}
                            placeholder="小区名称"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onDropdownVisibleChange={this.dropdownChange}
                        >
                            {sectorOptions}
                        </Select>
                        <Select
                            showSearch
                            style={{ width: 300, marginRight: 10 }}
                            placeholder="网元属性"
                            optionFilterProp="children"
                            onChange={this.onAttrChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onDropdownVisibleChange={this.dropdownAttrChange}
                        >
                            {attrOptions}
                        </Select>
                        <RangePicker
                            disabledDate={this.disabledDate}
                            onChange={this.dataChange}
                            style={{ marginRight: 10 }}
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