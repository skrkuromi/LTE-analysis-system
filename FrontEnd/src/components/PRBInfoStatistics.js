import React from 'react';
import { Button } from 'antd';
import { fetchTool } from '../utils/fetch';

class PRBInfoStatistics extends React.Component {
    state = {
        loading: false
    }

    handleClick = async () => {
        this.setState({ loading: true });
        const res = await fetchTool('GET', '/tbPRB/Init_PRBnew', {});
        if (res.status === undefined) {
            this.setState({ loading: false });
            alert("tbPRBnew生成完毕");
        } else {
            this.setState({ loading: false });
            alert("执行出错");
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                <Button onClick={this.handleClick} loading={loading} >生成PRBnew</Button>
            </div>
        );
    }
}

export default PRBInfoStatistics;