import React from 'react'
import registerImg from "../../assets/pictures/pic1.jpg";
import { Card, Flex } from 'antd'
import RegisterForm from './RegisterForm'
import SignPicture from '../../assets/components/SignPicture'

function Register() {
    return (
        <Card className='form-container'>
            <Flex className='cardHolder' align='center'>
                <RegisterForm />
                <SignPicture imgSrc={registerImg}  />
            </Flex>
        </Card>
    )
}

export default Register