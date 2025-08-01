import React, { useContext, useState } from 'react'
import { Link } from 'react-router';

// ---------------- helpers
import { emailValidate, passwordValidate } from '../../assets/helpers/validation';
import { useSignIn } from '@clerk/clerk-react';
import { organiseList_auth } from '../../assets/api/api';

// ---------------- pages
import { RoutesContext } from '../../assets/context/RoutesContext';

// ---------------- components
import { Button, Flex, Form, Input, Typography, Spin } from 'antd'
import { toast } from 'react-toastify';

function LoginForm() {
        const { signIn } = useSignIn();

        const { authRoutes } = useContext(RoutesContext) || {};
        const [isSent, setIsSent] = useState(false);
    
        const [formItems, setFormItems] = useState(
            [
                {
                    label:'Email', 
                    name:'email', 
                    test: "email_login",
                    required: true,
                    placeholder:'Enter Your Email',
                    type: "email",
                    value: "",
                    error: "",
                    validate: emailValidate,
                },
                {
                    label:'Password', 
                    name:'password', 
                    test: "pass_login",
                    required: true,
                    placeholder:'Enter Your Password',
                    type: "password",
                    value: "",
                    error: "",
                    validate: passwordValidate,
                },
            ]
        )

        const onChangeHandler = (input) => {
            const newData = [...formItems];
            newData[input.index].value = input.value;
            setFormItems([...newData])
        }
    
        const showError = () => {
            const newForm = [...formItems];
            newForm.map((item, index) => {
                const error = item.validate(item.value);
                if(error !== true && error !== undefined) {
                    newForm[index].error = error
                }
                else {
                    newForm[index].error = ""
                }
            })
            setFormItems([...newForm]);
        }
    
        const hasError = () => {
            showError();
            for(let item of formItems) {
                if(item.error !== "") return true
            }
            return false;
        }
    
        const onFinishHandle = (e) => {
            if(hasError()) {
                return
            }
            else {
                sendData();
            }
        }
    
        const sendData = async () => {
            setIsSent(true);
            const data = organiseList_auth(formItems, 'login');
            try {
                await signIn.create(data)
                .then(msg => {
                    if(msg.status !== 'complete') {
                        toast.error(msg.status);
                        setIsSent(false);
                    }
                    toast.success('Welcome.');
                    window.location.reload()
                })
            } catch (error) {
                toast.error('Error occurred.');
                setIsSent(false);
            }
        }


    return (
        <div className="formAuthHolder showSmoothly">
            <Flex vertical flex={1}>
                <Typography.Title level={3} strong className='title' data-testid='title'>
                    Login
                </Typography.Title>
                <Typography.Text type='secondary' strong className='slogan'>
                    Unlock Your World!
                </Typography.Text>

                <Form layout='vertical' autoComplete='off'>
                    {
                        formItems.map((item, index) => {
                            return (
                                <Form.Item key={item.name} label={item.label}>
                                    <Input 
                                        placeholder={item.placeholder} 
                                        required={item.required} 
                                        type={item.type ? item.type : 'text'} 
                                        onChange={(e) => onChangeHandler({key: item.name, value: e.target.value, index})}
                                        size='large'
                                        defaultValue={item.value}
                                        disabled={isSent}
                                        data-testid={item.test}
                                    />
                                    {
                                        item.error &&
                                        <p className='error-text'>
                                            { item.error }
                                        </p> 
                                    }
                                </Form.Item>
                            )
                        })
                    }
                    <Form.Item>
                        <Button type='primary' size='large' className='btnSubmit' disabled={isSent}  onClick={onFinishHandle} data-testid='loginPage_loginBtn'>
                            { isSent ? <Spin /> : "Login" }
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Link to={authRoutes?.register?.url??""}>
                            <Button size='large' className='btnLink' data-testid='loginPage_signUpBtn'>
                                { isSent ? <Spin /> : "Sign Up" }
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Flex>
        </div>
    )
}

export default LoginForm;