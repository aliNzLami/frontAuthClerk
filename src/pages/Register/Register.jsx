import React from 'react'
import RegisterForm from './RegisterForm'
import RegisterImage from './RegisterImage'
import { Card, Flex } from 'antd'

function Register() {
    return (
        <Card className='form-container'>
            <Flex className='cardHolder' align='center'>
                <RegisterForm />
                <RegisterImage />
            </Flex>
        </Card>
    )
}

export default Register