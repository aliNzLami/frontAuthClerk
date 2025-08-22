import React, { useState } from 'react'
import { useClerk } from '@clerk/clerk-react';

// ---------------- components
import { Button, Flex, Form, Input, Typography, Spin } from 'antd'
import { toast } from 'react-toastify';


function DashboardInfo({goToSolar}) {


        // ---------------------------- Hook ---------------------------- //
        const { signOut } = useClerk();


        // ---------------------------- State ---------------------------- //
        const [isSent, setIsSent] = useState(false);


        // ---------------------------- Functions ---------------------------- //
        const signOutHandle = async () => {
            setIsSent(true);
            try {
                await signOut()
                .then(msg => {
                    if(msg.status !== 'complete') {
                        toast.error(msg.status);
                        setIsSent(false);
                    }
                    window.location.reload();
                })
              } catch (error) {
                    toast.error('Error occurred.');
                    setIsSent(false);
                    window.location.reload();
              }
        }

      return (
        <div className="formAuthHolder showSmoothly">
            <Flex vertical flex={1}>
                <Typography.Title level={3} strong className='title'>
                    Thanks For Joining
                </Typography.Title>
                <Typography.Text type='secondary' strong className='slogan'>
                    <p className='goToSolarSystem' onClick={goToSolar}>
                        Go to Solar System
                    </p>
                </Typography.Text>

                <Form layout='vertical' autoComplete='off'>
                    <Form.Item>
                        <Button type='primary' size='large' className='btnSubmit' disabled={isSent}  onClick={signOutHandle}>
                            { isSent ? <Spin /> : "Sign Out" }
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </div>
      )
}

export default DashboardInfo