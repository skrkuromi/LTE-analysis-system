import React from 'react';
import { Button } from 'antd';

class PRBInfoStatistics extends React.Component {
    handleClick = () => {

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