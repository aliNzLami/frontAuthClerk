import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// img
import loginImg from "../../assets/pictures/pic3.jpg";

// context
import { RoutesContext } from '../../assets/context/RoutesContext';

// components
import SignPicture from '../../assets/components/SignPicture';
import DashboardInfo from './DashboardInfo';
import { Card, Flex } from 'antd'


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