import React, { Component } from 'react';
import { Table } from 'antd';

class MyTable extends Component {
    getScroll = (width, parent) => {
        if (parent === 'EnodeB') {
            return { x: width < 1000 ? width : 1000 };
        } else {
            return { x: width < 1000 ? width : 1000, y: parent === "C2I" ? 500 : 300 };
        }
    }

    render() {
        let width = 1000;
        const { columns, data, parent } = this.props;

        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                scroll={this.getScroll(width, parent)}
                size='small'
                style={{ width: width + 5, maxWidth: 1000, display: 'inline-block' }}
                pagination={false}
            />
        );
    }
}

export default MyTable;