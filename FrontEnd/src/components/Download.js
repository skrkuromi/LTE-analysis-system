import React from 'react';
import { Button, Select, Progress, Space, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

class Download extends React.Component {
    state = {
        loading: false,
        percent: 0,
        tableName: undefined,
        filePath: undefined,
        fileType: undefined,
        fileName: undefined
    }

    onChange = (value) => {
        this.setState({
            tableName: value
        })
    }

    //将数据转化为文件所用格式
    makeFile = (e) => {
        e.stopPropagation();

        // const { status, filePathUpload, file } = this.props;
        // const { fileName, path } = file;
        // const filePath = path === undefined ? filePathUpload + fileName : path;

        // const url = `/experiment-service/query/readyForData?filePath=${filePath}`;

        // const response = await fetchTool(url, init);

        // if (response && response.status === 200) {
        //     const data = await response.text();
        //     this.downFile(data, fileName);
        // }

        this.downFile('', 'fileName');
    }

    //提供下载
    downFile = (list, label) => {
        console.log('download')
        var element = document.createElement('a');
        element.download = `${label}.csv`;
        element.style.display = 'none';
        var blob = new Blob([list], {
            type: "text/csv;charset=utf-8;"
        });
        element.href = URL.createObjectURL(blob);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

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

    onChangeFileName = (e) => {
        this.setState({
            fileName: e.target.value
        })
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
                        <Select
                            style={{ width: 100, marginRight: 10 }}
                            onChange={this.handleChangeFileType}
                            placeholder="FileType"
                        >
                            <Option value="csv">csv</Option>
                            <Option value="xlsx">xlsx</Option>
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