import React from 'react';
import { Button, Select } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

class Download extends React.Component {
    state = {
        tableName: null
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

    render() {
        console.log(this.state.tableName)
        return (
            <div>
                <Select
                    showSearch
                    style={{ width: 200, marginRight: 20 }}
                    placeholder="Select tableName"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="jack">Jack</Option>
                    <Option value="jack">Jack</Option>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
                <Button onClick={this.makeFile} icon={<DownloadOutlined />}>
                    Download
                </Button>
            </div>
        );
    }
}

export default Download;