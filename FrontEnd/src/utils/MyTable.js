import React, { Component } from 'react';
import { Table } from 'antd';

class MyTable extends Component {
    render() {
        let width = 1000;
        const { columns, data } = this.props;

        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                scroll={{ x: width < 1000 ? width : 1000 }}
                size='small'
                style={{ width: width + 5, maxWidth: 1005, display: 'inline-block' }}
                pagination={false}
            />
        );
    }
}

export default MyTable;