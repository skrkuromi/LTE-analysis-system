import React, { Component } from 'react';
import { Upload, message, Button, Progress, Select, Space, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchTool } from '../utils/fetch';
import Papa from 'papaparse';
import XLSX from 'xlsx';

const { Option } = Select;
class UploadFile extends Component {
    state = {
        loading: false,
        percent: 0,
        tableName: undefined,
        filePath: undefined,
        fileType: undefined
    }

    // uploadRows = async (array, count, total) => {
    //     const { tableName } = this.state;

    //     const result = await fetchTool('GET', `/${tableName}/upload_rows`, { data: JSON.stringify(array) });
    //     if (result.status === undefined) {
    //         if (result.msg === 'success') {
    //             this.setState({
    //                 percent: parseInt(count / total)
    //             })
    //             console.log(parseInt(count / total))
    //             return 1;
    //         } else return 0;
    //     } else {
    //         alert("执行错误");
    //         return 0;
    //     }
    // }

    // beforeUpload = file => {
    //     const { tableName } = this.state;
    //     if (tableName === undefined) {
    //         alert("请选择工作表");
    //         return;
    //     }

    //     var fileType = file.name.split(".");
    //     fileType = fileType[fileType.length - 1];
    //     this.setState({
    //         loading: true,
    //         percent: 0
    //     });

    //     if (fileType === 'csv') {
    //         var count = 0, array = [], metaRight = 1, total = 30000;
    //         const self = this;

    //         Papa.parse(file, {
    //             // 按行处理
    //             step: async function (row, parser) {
    //                 if (count % 50 < 50) {
    //                     array.push({ ...row.data });
    //                     count++;
    //                 } else {
    //                     parser.pause();
    //                     metaRight = await self.uploadRows(array, count, total);
    //                     if (metaRight) {
    //                         array = [];
    //                         parser.resume();
    //                     }
    //                 }
    //             },
    //             header: true,
    //             complete: async function () {
    //                 await self.uploadRows(array, count, total);
    //                 this.setState({
    //                     loading: false,
    //                     tableName: undefined,
    //                 });
    //                 alert("All done!");
    //             }
    //         });
    //     } else if (fileType === 'xlsx') {

    //         // excel 文件由于格式原因，需要读完整个文件才能够解析，因此无法进行分段读入
    //         // 解析如下：
    //         // The most common and interesting formats (XLS, XLSX/M, XLSB, ODS) are 
    //         // ultimately ZIP or CFB containers of files. Neither format puts the directory
    //         // structure at the beginning of the file: ZIP files place the Central Directory
    //         // records at the end of the logical file, while CFB files can place the 
    //         // storage info anywhere in the file! As a result, to properly handle these
    //         // formats, a streaming function would have to buffer the entire file before commencing.

    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             var data = new Uint8Array(e.target.result);
    //             var workbook = XLSX.read(data, { type: 'array' });
    //             console.log(workbook)
    //         };
    //         reader.readAsArrayBuffer(file);
    //     } else {
    //         this.setState({ loading: false });
    //         message.error("文件格式错误！");
    //     }

    //     return false;
    // }

    onChangePath = (e) => {
        this.setState({
            filePath: e.target.value
        })
    }

    handleChange = (value) => {
        this.setState({ tableName: value });
    }

    handleChangeFileType = (value) => {
        this.setState({ fileType: value });
    }

    getProcess = async () => {
        const self = this;
        setTimeout(async function () {
            const res = await fetchTool('GET', '/tbC2Inew/Query_Process', {});
            if (res.status === undefined) {
                if (res.msg > 0 && self.state.loading === true) {
                    self.setState({ loading: false })
                }

                if (res.msg === 100) {
                    self.setState({ percent: res.msg });
                    alert("导入成功");
                } else {
                    self.setState({ percent: res.msg });
                    self.getProcess();
                }
            } else {
                self.setState({ percent: 0, loading: false });
                alert("执行出错");
                return;
            }
        }, 1000);
    }

    uploadFile = async () => {
        const { tableName, filePath, fileType } = this.state;

        const result = await fetchTool('GET', `/${tableName}/upload_rows`,
            {
                tableName,
                filePath,
                fileType
            });
        if (result.status === undefined) {
            if (result.msg === 'success') {
                this.setState({
                    percent: 0
                })
                this.getProcess();
            } else {
                this.setState({
                    percent: 0
                })
                alert("执行错误");
            }
        } else {
            alert("执行错误");
        }
    }

    render() {
        const { percent, loading, filePath } = this.state;

        return (
            <div>
                <div>
                    <Space>
                        <Input
                            placeholder="FilePath"
                            style={{ width: 350, marginRight: 10 }}
                            value={filePath}
                            onChange={this.onChangePath}
                        />
                        <Select
                            style={{ width: 200, marginRight: 10 }}
                            onChange={this.handleChange}
                            placeholder="TableName"
                        >
                            <Option value="tbCell">tbCell</Option>
                            <Option value="tbKPI">tbKPI</Option>
                            <Option value="tbPRB">tbPRB</Option>
                            <Option value="tbMROData">tbMROData</Option>
                        </Select>
                        {/* <Upload beforeUpload={this.beforeUpload}>
                            <Button loading={loading} >
                                <UploadOutlined /> Click to Upload
                            </Button>
                        </Upload> */}
                        <Select
                            style={{ width: 100, marginRight: 10 }}
                            onChange={this.handleChangeFileType}
                            placeholder="FileType"
                        >
                            <Option value="csv">csv</Option>
                            <Option value="xlsx">xlsx</Option>
                        </Select>
                        <Button loading={loading} onClick={this.uploadFile} >
                            <UploadOutlined /> 上传文件
                        </Button>
                    </Space>

                </div>
                <div>
                    <div style={{ paddingTop: 50 }}>
                        {percent === 100 ? <Progress percent={percent} style={{ width: 800 }} />
                            : <Progress percent={percent} status="active" style={{ width: 800 }} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadFile;