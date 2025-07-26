import React from 'react'
import { Flex } from 'antd'

function SignPicture({ imgSrc }) {
    return (
        <div className="formImgHolder showSmoothly_toLeft">
            <Flex justify='center' align='center'>
                <div className="authImg">
                    <img src={imgSrc} />
                </div>
            </Flex>
        </div>
    )
}

export default SignPicture