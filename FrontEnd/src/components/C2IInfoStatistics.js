import React from 'react';
import { Button, Progress } from 'antd';
import { fetchTool } from '../utils/fetch';

class C2IInfoStatistics extends React.Component {
    state = {
        percent: 0,
        loading: false
    }

    getProcess = async () => {
        const self = this;
        setTimeout(async function () {
            const res = await fetchTool('GET', '/tbC2Inew/Query_Process', {});
            if (res.status === undefined) {
                if (res.msg > 0 && self.state.loading === true) {
                    self.setState({ loading: false })
                }

                if (res.msg === 100) {
                    self.setState({ percent: res.msg });
                    alert("tbC2Inew生成完毕");
                } else {
                    self.setState({ percent: res.msg });
                    self.getProcess();
                }
            } else {
                self.setState({ percent: 0, loading: false });
                alert("执行出错");
                return;
            }
        }, 1000);
    }

    handleClick = async () => {
        this.setState({
            percent: 0,
            loading: true
        })
        const res = await fetchTool('GET', '/tbC2Inew/Init_tbC2Inew', {});
        if (res.status === undefined) {
            this.getProcess();
        } else {
            this.setState({ loading: false });
            alert("执行出错");
        }
    }

    render() {
        const { percent, loading } = this.state;

        return (
            <div>
                <Button onClick={this.handleClick} loading={loading} >生成C2Inew</Button>
                {percent > 0 ? <div style={{ paddingTop: 50 }}>
                    {percent === 100 ? <Progress percent={percent} style={{ width: 500 }} />
                        : <Progress percent={percent} status="active" style={{ width: 500 }} />}
                </div> : <div></div>}
            </div>
        );
    }
}

export default C2IInfoStatistics;