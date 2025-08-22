import React, { useContext, useState } from 'react';
import loginImg from "../../assets/pictures/pic3.jpg";
import { Card, Flex } from 'antd'
import SignPicture from '../../assets/components/SignPicture';
import DashboardInfo from './DashboardInfo';
import { useNavigate } from 'react-router-dom';
import { RoutesContext } from '../../assets/context/RoutesContext';

function Dashboard() {

    const naviagte = useNavigate();

    const { pagesList } = useContext(RoutesContext) || {};

    const [fadeAway, setFadeAway] = useState(false);

    const goToSolar = () => {
        setFadeAway(true);
        setTimeout(() => {
            naviagte(pagesList.solarSystem.url)
        }, 3000);
    }

    return (
        <Card className={`form-container ${fadeAway && "fadeAway"}`}>
            <Flex className='cardHolder' align='center'>
                <DashboardInfo goToSolar={goToSolar} />
                <SignPicture imgSrc={loginImg}  />
            </Flex>
        </Card>
    )
}

export default Dashboard