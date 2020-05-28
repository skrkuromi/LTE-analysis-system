import React from 'react';
import { Button, Row } from 'antd';
import UploadTest from './UploadTest';

const MainPage = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <Row>
        <UploadTest></UploadTest>
    </Row>
  </div>
);

export default MainPage;