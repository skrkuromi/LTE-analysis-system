import React from 'react';
import { Button, Select, Progress, Space, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { fetchTool } from '../utils/fetch';

const { Option } = Select;

class Download extends React.Component {
    state = {
        loading: false,
        percent: 0,
        tableName: undefined,
        filePath: undefined,
        fileName: undefined
    }

    onChange = (value) => {
        this.setState({
            tableName: value
        })
    }

    onChangePath = (e) => {
        this.setState({
            filePath: e.target.value
        })
    }

    handleChange = (value) => {
        this.setState({ tableName: value });
    }

    onChangeFileName = (e) => {
        this.setState({
            fileName: e.target.value
        })
    }

    getProcess = async () => {
        const self = this;
        setTimeout(async function () {
            const res = await fetchTool('GET', '/QueryDownloadProcess', {});
            if (res.status === undefined) {
                if (res.msg > 0 && self.state.loading === true) {
                    self.setState({ loading: false })
                }

                if (res.msg === 100) {
                    self.setState({ percent: res.msg });
                    alert("导出成功");
                } else {
                    self.setState({ percent: res.msg });
                    console.log(res.msg)
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
        const { tableName, filePath, fileName } = this.state;

        if (tableName === undefined) {
            alert("请选择表名称!");
            return
        } else if (filePath === undefined) {
            alert("请选择文件路径!");
            return
        }

        const result = await fetchTool('POST', '/download',
            {
                tableName,
                filePath,
                fileName
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
        const { loading, percent, fileName, filePath } = this.state;
        return (
            <div>
                <div>
                    <Space>
                        <Input
                            placeholder="FileName"
                            style={{ width: 100, marginRight: 10 }}
                            value={fileName}
                            onChange={this.onChangeFileName}
                        />
                        <Input
                            placeholder="FilePath"
                            style={{ width: 400, marginRight: 10 }}
                            value={filePath}
                            onChange={this.onChangePath}
                        />
                        <Select
                            style={{ width: 120, marginRight: 10 }}
                            onChange={this.handleChange}
                            placeholder="TableName"
                        >
                            <Option value="tbCell">tbCell</Option>
                            <Option value="tbKPI">tbKPI</Option>
                            <Option value="tbPRB">tbPRB</Option>
                            <Option value="tbMROData">tbMROData</Option>
                        </Select>
                        <Button loading={loading} onClick={this.uploadFile} >
                            <DownloadOutlined /> 下载文件
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
        );
    }
}

export default Download;