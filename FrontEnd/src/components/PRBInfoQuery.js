import React from 'react';
import { Select, Button, DatePicker, Space } from 'antd';
import moment from 'moment';
import GraphModel from '../utils/GraphModel';
import { fetchTool } from '../utils/fetch';
import MyTable from '../utils/MyTable';

const { Option } = Select;
const { RangePicker } = DatePicker;

class PRBInfoQuery extends React.Component {
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
        return current < moment('2016-07-16 00', 'YYYY-MM-DD HH') || current > moment('2016-07-19 23', 'YYYY-MM-DD HH');
    }

    disabledDateMinute = (current) => {
        return current < moment('2016-07-16 0:0', 'YYYY-MM-DD HH:mm') || current > moment('2016-07-19 23:45', 'YYYY-MM-DD HH:m');
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
            case "第0个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB0';
            case "第1个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB1";
            case "第2个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB2";
            case "第3个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB3";
            case "第4个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB4";
            case "第5个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB5";
            case "第6个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB6";
            case "第7个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB7";
            case "第8个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB8";
            case "第9个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return "PRB9";
            case "第10个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB10';
            case "第11个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB11';
            case "第12个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB12';
            case "第13个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB13';
            case "第14个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB14';
            case "第15个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB15';
            case "第16个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB16';
            case "第17个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB17';
            case "第18个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB18';
            case "第19个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB19';
            case "第20个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB20';
            case "第21个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB21';
            case "第22个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB22';
            case "第23个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB23';
            case "第24个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB24';
            case "第25个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB25';
            case "第26个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB26';
            case "第27个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB27';
            case "第28个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB28';
            case "第29个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB29';
            case "第30个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB30';
            case "第31个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB31';
            case "第32个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB32';
            case "第33个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB33';
            case "第34个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB34';
            case "第35个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB35';
            case "第36个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB36';
            case "第37个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB37';
            case "第38个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB38';
            case "第39个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB39';
            case "第40个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB40';
            case "第41个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB41';
            case "第42个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB42';
            case "第43个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB43';
            case "第44个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB44';
            case "第45个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB45';
            case "第46个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB46';
            case "第47个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB47';
            case "第48个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB48';
            case "第49个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB49';
            case "第50个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB50';
            case "第51个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB51';
            case "第52个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB52';
            case "第53个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB53';
            case "第54个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB54';
            case "第55个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB55';
            case "第56个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB56';
            case "第57个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB57';
            case "第58个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB58';
            case "第59个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB59';
            case "第60个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB60';
            case "第61个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB61';
            case "第62个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB62';
            case "第63个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB63';
            case "第64个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB64';
            case "第65个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB65';
            case "第66个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB66';
            case "第67个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB67';
            case "第68个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB68';
            case "第69个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB69';
            case "第70个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB70';
            case "第71个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB71';
            case "第72个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB72';
            case "第73个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB73';
            case "第74个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB74';
            case "第75个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB75';
            case "第76个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB76';
            case "第77个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB77';
            case "第78个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB78';
            case "第79个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB79';
            case "第80个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB80';
            case "第81个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB81';
            case "第82个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB82';
            case "第83个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB83';
            case "第84个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB84';
            case "第85个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB85';
            case "第86个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB86';
            case "第87个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB87';
            case "第88个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB88';
            case "第89个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB89';
            case "第90个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB90';
            case "第91个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB91';
            case "第92个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB92';
            case "第93个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB93';
            case "第94个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB94';
            case "第95个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB95';
            case "第96个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB96';
            case "第97个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB97';
            case "第98个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB98';
            case "第99个PRB上检测到的干扰噪声的平均值 (毫瓦分贝)": return 'PRB99';
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
        const result = await fetchTool('GET', '/tbPRBnew/Query_PRBnew_bySector', {
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
            const result = await fetchTool('GET', '/tbPRBnew/QueryAllPRBnewSector', {});
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
            const result = await fetchTool('GET', '/tbPRBnew/QueryAllPRBnewAtt', {});
            if (result.status === undefined) {
                const sectorAttr = [];
                for (let attrIndex in result.msg) {
                    const value = result.msg[attrIndex];
                    if (value === "StartTime" || value === "周期" || value === "网元名称" ||
                        value === "小区" || value === "小区名") continue;
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
                            showTime={{ format: 'HH' }}
                            format="YYYY-MM-DD HH"
                            disabledDate={this.disabledDate}
                            onChange={this.dataChange}
                            style={{ marginRight: 10 }}
                            showTime
                            defaultValue={[moment('2016-07-16 00', 'YYYY-MM-DD HH'), moment('2016-07-19 23', 'YYYY-MM-DD HH')]}
                            defaultPickerValue={[moment('2016-07-16 00', 'YYYY-MM-DD HH'), moment('2016-07-19 23', 'YYYY-MM-DD HH')]}
                        />
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            disabledDate={this.disabledDateMinute}
                            onChange={this.dataChange}
                            style={{ marginRight: 10 }}
                            showTime
                            minuteStep={15}
                            defaultValue={[moment('2016-07-16 00:00', 'YYYY-MM-DD HH:mm'), moment('2016-07-19 23:45', 'YYYY-MM-DD HH:mm')]}
                            defaultPickerValue={[moment('2016-07-16 00:00', 'YYYY-MM-DD HH:mm'), moment('2016-07-19 23:45', 'YYYY-MM-DD HH:mm')]}
                        />
                        <Button onClick={this.handleClickQuery}>查询</Button>
                    </Space>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <MyTable columns={columns} data={data}></MyTable>
                </div>
                <div style={{ paddingTop: 50 }}>
                    <GraphModel data={data} attrName={attrName} ></GraphModel>
                </div>
            </div>
        );
    }
}
export default PRBInfoQuery;