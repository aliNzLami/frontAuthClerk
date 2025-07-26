import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

// ---------------- helpers
import { emailValidate, passwordValidate } from '../../assets/helpers/validation';

// ---------------- pages
import { RoutesContext } from '../../assets/context/RoutesContext';

// ---------------- components
import { Button, Flex, Form, Input, Typography, Spin } from 'antd'

function LoginForm() {
        const routesList = useContext(RoutesContext);
        const [isSent, setIsSent] = useState(false);
    
        const [formItems, setFormItems] = useState(
            [
                {
                    label:'Email', 
                    name:'email', 
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
    
        const onFinishHandle = () => {
            if(hasError()) {
                return
            }
            else {
                sendData();
            }
        }
    
        const sendData = () => {
            console.log('BACKEND');
            setIsSent(true);
        }


    return (
        <div className="formAuthHolder showSmoothly">
                    <Flex vertical flex={1}>
                        <Typography.Title level={3} strong className='title'>
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
                                <Button type='primary' size='large' className='btnSubmit' disabled={isSent}  onClick={onFinishHandle}>
                                    { isSent ? <Spin /> : "Login" }
                                </Button>
                            </Form.Item>
        
                            <Form.Item>
                                <Link to={routesList.register.url}>
                                    <Button size='large' className='btnLink'>
                                        Sign Up
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Flex>
                </div>
    )
}

export default LoginForm;