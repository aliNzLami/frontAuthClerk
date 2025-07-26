import React from 'react';
import loginImg from "../../assets/pictures/pic3.jpg";
import { Card, Flex } from 'antd'
import SignPicture from '../../assets/components/SignPicture';
import DashboardInfo from './DashboardInfo';

function Dashboard() {

    return (
        <Card className='form-container'>
            <Flex className='cardHolder' align='center'>
                <DashboardInfo />
                <SignPicture imgSrc={loginImg}  />
            </Flex>
        </Card>
    )
}

export default Dashboard