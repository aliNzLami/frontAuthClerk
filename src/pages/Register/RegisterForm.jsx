import React, { useContext, useState } from 'react'
import { Link } from 'react-router';

// ---------------- helpers
import { emailValidate, passwordValidate } from '../../assets/helpers/validation';
import { useSignUp } from '@clerk/clerk-react';
import { organiseList_auth } from '../../assets/api/api';

// ---------------- pages
import { RoutesContext } from '../../assets/context/RoutesContext';

// ---------------- components
import { Button, Flex, Form, Input, Typography, Spin } from 'antd'
import { toast } from 'react-toastify';


function RegisterForm() {

    const { signUp } = useSignUp();

    const { authRoutes } = useContext(RoutesContext) || {};
    const [isSent, setIsSent] = useState(false);

    const [formItems, setFormItems] = useState(
        [
            {
                label:'Full Name', 
                name:'name', 
                required: true,
                placeholder:'Enter Your Full Name',
                value: "",
                error: "",
                validate: (input) => { if(input.trim() === "") return "Name is empty" },
            },
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
            {
                label:'Confirm Password', 
                name:'con-password', 
                required: true,
                placeholder:'Enter Your Confirm Password',
                type: "password",
                value: "",
                error: "",
                validate: (input) => { if(input !== formItems[2].value) return 'This password is not match to above'  },
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

    const sendData = async () => {
        setIsSent(true);
        const data = organiseList_auth(formItems, 'signUp');
        try {
            await signUp.create(data)
            .then(msg => {
                if(msg.status !== 'complete') {
                    toast.error(msg.status);
                    setIsSent(false);
                }
                window.location.reload();
                toast.success('Welcome.');
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
                    Create an Account
                </Typography.Title>
                <Typography.Text type='secondary' strong className='slogan'>
                    Join for exclusive access!
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
                            { isSent ? <Spin /> : "Create Account" }
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Link to={authRoutes?.login?.url??""}>
                            <Button size='large' className='btnLink' data-testid="registerPage_loginBtn">
                                { isSent ? <Spin /> : "Login" }
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Flex>
        </div>
    )
}

export default RegisterForm