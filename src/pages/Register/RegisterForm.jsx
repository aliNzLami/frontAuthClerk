import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

// ---------------- helpers
import { emailValidate, passwordValidate } from '../../assets/helpers/validation';
import { useSignUp } from '@clerk/clerk-react';

// ---------------- pages
import { RoutesContext } from '../../assets/context/RoutesContext';

// ---------------- components
import { Button, Flex, Form, Input, Typography, Spin } from 'antd'



function RegisterForm() {

    const { signUp, setActive } = useSignUp();

    const routesList = useContext(RoutesContext);
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
        const data = {};
        for(let item of formItems) {
            data[item.name] = item.value; 
        }

        try {
            await signUp.create(data)
            .then(msg => {
                console.log(msg);
                
            })
        } catch (error) {
            console.log(error);
            setIsSent(false);
        }
    }

    return (
        <div className="formAuthHolder showSmoothly">
            <Flex vertical flex={1}>
                <Typography.Title level={3} strong className='title'>
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
                        <Link to={routesList.login.url}>
                            <Button size='large' className='btnLink'>
                                Login
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Flex>
        </div>
    )
}

export default RegisterForm


// 0.6mqy6P_bW8jtrbLcC_qgeXcr-GvnKWydI0EmpocmcP2Ct3FuX0m-k2qW7Vq5EidD9_Qr2hpE_fz6JG3Y-_n9e_0alOYEBqxJd8hdX6SxhbkKsXDUeOltoOihO8rdEcioe_jQCvssHkpn6UWpfmFgB0B4anjwa40tBQnCvwa5huWW2PMu07_LW7o1EQLDPg66veYPWz8eSa_u0w4w1V3HkA7S5TF6AeGEOPU9V2ST796cuKV_dUf5Qm92xchIc66xEQ1O-Uk7aU37KS67aOpOm3QmqsfoH2aSn-YUuITEHO5dGPYeOdUwr64pr8yozzIuhT3-Ekmy7Kq-HbWmzWjJp6q30wXU0b_O9QOSkFYCekfV79VYZtJERrBY-eEythEvSLFlOakdkOSZYtPdegqTSs89d9uYcfv5dOrk6dmpnuOnnE9FYMs-6g10ht8ThL4Fdj7Quk95D80zyboknXozLkV1V2ZuzI25tW3H5N4xaCogOfqJIQM3MWWgSYKI0nHt35KM1AJf1iBkUDlnBNt-igbqgkhlaoRZd9WUUN5yXdyGSzYeTlyIvQnzuHigkeOjbLE2nBqAwf_-z_0OK07ojG2TYKcNo6Fi9C0yLX-rU-FkTt86vnPEawZzv9BJl8AoT2gTRxnue_dH9_A8YBa7WLIr7Rr3VyqdM8COVxzOHtJCeI0ERAbCPmdeV6HjFYVsCIKjR5jNW1GbbPhYRyQE3ytFPrCrc2crMt09omwAs4N1bMxq2gp5ddxOwBt1QQZndjGzkrdl_D-Skau3xjglMVFi__F7MrK-b7wVI3LllY-iwbgOg6t1GYEtWy7-CefuAnQS2N0JmttirlWFykcSYoqca6V4HI38vJbr8HUNFGdHBq5BBW1T21CYPUJHkXy9aZGtTcYI0c8kICB146StvB8wHEAEAtfL2HNu7eE_7mU.YOXXjmBhXxj7NnJ9arhhhQ.56b97ef44c4e1384fda16d875328c6fedbe4da75dd56fa893357cdb3ba2d3942