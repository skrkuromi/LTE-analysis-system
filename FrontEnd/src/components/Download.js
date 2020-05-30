import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

class Download extends React.Component {
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
            type: "text/csv;charset=" + 'utf-8' + ";"
        });
        element.href = URL.createObjectURL(blob);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    render() {
        return (
            <Button shape="round" onClick={this.makeFile} icon={<DownloadOutlined />} size='large'>
                Download
            </Button>

        );
    }
}

export default Download;