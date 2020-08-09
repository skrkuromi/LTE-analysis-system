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
        attrName: undefined,
        sectorName: [],
        sectorAttr: [],
        data: [],
        date: [],
    }

    disabledDate = (current) => {
        return current < moment(new Date('2016/07/17')) || current > moment(new Date('2016/07/19'));
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

    transformAttrName = (cValue) => {
        switch (cValue) {
            case "起始时间": return 'StartTime';
            case "RRC连接建立完成次数 (无)": return 'RRC_SUC';
            case "RRC连接请求次数（包括重发） (无)": return 'RRC_TRY';
            case "RRC建立成功率qf (%)": return 'RRC_SUCrate';
            case "E-RAB建立成功总次数 (无)": return 'ERAB_SUC';
            case "E-RAB建立尝试总次数 (无)": return 'ERAB_TRY';
            case "E-RAB建立成功率2 (%)": return 'ERAB_SUCrate';
            case "eNodeB触发的E-RAB异常释放总次数 (无)": return 'EnodebERABrls';
            case "小区切换出E-RAB异常释放总次数 (无)": return 'SectorERABrls';
            case "E-RAB掉线率(新) (%)": return 'ERABdisconnectRate';
            case "无线接通率ay (%)": return 'Ay';
            case "eNodeB发起的S1 RESET导致的UE Context释放次数 (无)": return 'EnodebS1RESET';
            case "UE Context异常释放次数 (无)": return 'UEContextrls';
            case 'UE Context建立成功总次数 (无)': return 'UEContextSUC';
            case '无线掉线率 (%)': return 'Al';
            case 'eNodeB内异频切换出成功次数 (无)': return 'EnodebInAsySUC';
            case 'eNodeB内异频切换出尝试次数 (无)': return 'EnodebInAsyTRY';
            case 'eNodeB内同频切换出成功次数 (无)': return 'EnodebInSynSUC';
            case 'eNodeB内同频切换出尝试次数 (无)': return 'EnodebInSnyTRY';
            case 'eNodeB间异频切换出成功次数 (无)': return 'EnodebBetAsySUC';
            case 'eNodeB间异频切换出尝试次数 (无)': return 'EnodebBetAsyTRY';
            case 'eNodeB间同频切换出成功次数 (无)': return 'EnodebBetSnySUC';
            case 'eNodeB间同频切换出尝试次数 (无)': return 'EnodebBetSnyTRY';
            case 'eNB内切换成功率 (%)': return 'EnInSUCrate';
            case 'eNB间切换成功率 (%)': return 'EnBetSUCrate';
            case '同频切换成功率zsp (%)': return 'InSUCrate';
            case '异频切换成功率zsp (%)': return 'BetSUCrate';
            case '切换成功率 (%)': return 'SUCrate';
            case '小区PDCP层所接收到的上行数据的总吞吐量 (比特)': return 'PDCPupload';
            case '小区PDCP层所发送的下行数据的总吞吐量 (比特)': return 'PDCPdownload';
            case 'RRC重建请求次数 (无)': return 'RRCReconstruct';
            case 'RRC连接重建比率 (%)': return 'RRCReconstructRate';
            case '通过重建回源小区的eNodeB间同频切换出执行成功次数 (无)': return 'ReconstructBetSyn';
            case '通过重建回源小区的eNodeB间异频切换出执行成功次数 (无)': return 'ReconstructBetAsy';
            case '通过重建回源小区的eNodeB内同频切换出执行成功次数 (无)': return 'ReconstructInSyn';
            case '通过重建回源小区的eNodeB内异频切换出执行成功次数 (无)': return 'ReconstructInAsy';
            case 'eNB内切换出成功次数 (次)': return 'EnInSUC';
            case 'eNB内切换出请求次数 (次)': return 'EnInTRY';
            default: return "";
        }
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

        let sector = [], attrName = this.transformAttrName(selectSectorAttr);
        const result = await fetchTool('GET', '/tbKPI/Query_KPIAtt_bySector', {
            SectorName: selectSector,
            Attribute: selectSectorAttr,
            StartTime: date[0],
            EndTime: date[1]
        });

        if (result.status === undefined) {
            sector = result.msg;
        }

        for (let i = 0; i < sector.length; i++) {
            let currentSector = [];
            currentSector['key'] = i;
            currentSector['起始时间'] = sector[i].StartTime;
            currentSector[selectSectorAttr] = sector[i][attrName];
            sector[i] = currentSector;
        }

        this.setState({ data: sector, attrName: selectSectorAttr });
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
        const { sectorName, data, sectorAttr, attrName } = this.state;
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
                    <GraphModel data={data} attrName={attrName} parent="KPI" ></GraphModel>
                </div>
            </div>
        );
    }
}

export default KPIInfoQuery;