import React from 'react';
import { Button } from 'antd';
import { fetchTool } from '../utils/fetch';

class C2IInfoStatistics extends React.Component {
    handleClick = async () => {
        const res = await fetchTool('GET', '/tbC2Inew/Init_tbC2Inew', {});
    }

    render() {

        return (
            <div>
                <Button onClick={this.handleClick}>生成C2Inew</Button>
            </div>
        );
    }
}

export default C2IInfoStatistics;