import React from 'react';
import { Button } from 'antd';
import { fetchTool } from '../utils/fetch';

class PRBInfoStatistics extends React.Component {
    handleClick = async () => {
        const res = await fetchTool('GET', '/tbPRB/Init_PRBnew', {});
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>生成PRBnew</Button>
            </div>
        );
    }
}

export default PRBInfoStatistics;