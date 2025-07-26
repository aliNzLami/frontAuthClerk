import React from 'react';
import registerImg from "../../assets/pictures/pic1.jpg";
import { Flex } from 'antd'

function RegisterImage() {
    return (
        <div className="formImgHolder showSmoothly_toLeft">
            <Flex justify='center' align='center'>
                <div className="authImg">
                    <img src={registerImg} />
                </div>
            </Flex>
        </div>
    )
}

export default RegisterImage