import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import XLSX from 'xlsx';

const props = {
    beforeUpload: file => {
        console.log(file);
        var fileType = file.name.split(".");
        fileType = fileType[fileType.length - 1];

        if (fileType === 'csv') {
            var count = 0, array = [], meta = [];

            Papa.parse(file, {
                // 按行处理
                step: function (row, parser) {
                    if (meta.length === 0) {
                        meta = [...row.data];
                        console.log(meta)
                    } else if (count < 50) {
                        array.push([...row.data]);
                        count++;
                    } else {
                        parser.pause();
                        console.log(array);
                        array = [];
                        count = 0;
                        parser.resume();
                    }
                },
                complete: function () {
                    console.log("All done!");
                }
            });
        } else if (fileType === 'xlsx') {

            // excel 文件由于格式原因，需要读完整个文件才能够解析，因此无法进行分段读入
            // 解析如下：
            // The most common and interesting formats (XLS, XLSX/M, XLSB, ODS) are 
            // ultimately ZIP or CFB containers of files. Neither format puts the directory
            // structure at the beginning of the file: ZIP files place the Central Directory
            // records at the end of the logical file, while CFB files can place the 
            // storage info anywhere in the file! As a result, to properly handle these
            // formats, a streaming function would have to buffer the entire file before commencing.

            var reader = new FileReader();
            reader.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });
                console.log(workbook)
            };
            reader.readAsArrayBuffer(file);
        } else {
            message.error("文件格式错误！");
        }

        return false
    }
};

const UploadFile = () => (
    <Upload {...props}>
        <Button>
            <UploadOutlined /> Click to Upload
        </Button>
    </Upload>
)

export default UploadFile;