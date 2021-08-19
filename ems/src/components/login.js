import React, { useState } from "react"
import 'antd/dist/antd.css';
import { Card } from 'antd';
import axios from "axios"
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useHistory } from "react-router-dom"

const Login = ({ setLoginUser }) => {

    const history = useHistory()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9001/login", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                history.push("/")
            })
    }
    return (

        <Card style={{ textAlign: "center", width: "50%", margin: "auto" }}>
            <u><h1>Please enter credentials</h1></u>
            <div className="login">
                <Input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></Input> <br></br>
                <Input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></Input>
                <br></br>

                <Button type="primary" onClick={login} htmlType="submit">
                    Login
                </Button>
                <div>or</div>
                <div className="button" onClick={() => history.push("/register")}>Register</div>
            </div>
        </Card>
    )
}

export default Login