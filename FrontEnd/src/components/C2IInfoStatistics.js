import React from 'react';
import { Button, Progress } from 'antd';
import { fetchTool } from '../utils/fetch';

class C2IInfoStatistics extends React.Component {
    state = {
        percent: 0
    }

    getProcess = async () => {
        const self = this;
        setTimeout(async function () {
            const res = await fetchTool('GET', '/tbC2Inew/Query_Process', {});
            if (res.status === undefined) {
                if (res.msg === 100) {
                    self.setState({
                        percent: res.msg
                    })
                } else {
                    self.setState({
                        percent: res.msg
                    })
                    self.getProcess();
                }
            } else {
                alert("执行出错");
                return;
            }
        }, 1000);
    }

    handleClick = async () => {
        const res = await fetchTool('GET', '/tbC2Inew/Init_tbC2Inew', {});
        if (res.status === undefined) {
            this.getProcess();
        } else {
            alert("执行出错");
        }
    }

    render() {
        const { percent } = this.state;

        return (
            <div>
                <Button onClick={this.handleClick}>生成C2Inew</Button>
                <div>
                    <Progress percent={percent} status="active" style={{ width: 500 }} />
                </div>
            </div>
        );
    }
}

export default C2IInfoStatistics;