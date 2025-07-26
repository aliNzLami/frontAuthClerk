import React from 'react'
import loginImg from "../../assets/pictures/pic2.jpg";
import { Card, Flex } from 'antd'
import LoginForm from './LoginForm'
import SignPicture from '../../assets/components/SignPicture';

function Login() {
    return (
        <Card className='form-container'>
            <Flex className='cardHolder' align='center'>
                <LoginForm />
                <SignPicture imgSrc={loginImg}  />
            </Flex>
        </Card>
    )
}

export default Login 