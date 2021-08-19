import React, { useState } from "react"
import axios from "axios"
import 'antd/dist/antd.css';
import { Card, Input } from 'antd';
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9001/register", user)
                .then(res => {
                    alert(res.data.message)
                    history.push("/login")
                })
        } else {
            alert("invlid input")
        }
    }

    return (
        <Card style={{ textAlign: "center", width: "50%", margin: "auto" }}>

            <div className="register">
                {console.log("User", user)}
                <h1>Register</h1>
                <Input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></Input><br></br>
                <Input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></Input><br></br>
                <Input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></Input><br></br>
                <Input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></Input>
                <div className="button" onClick={register} >Register</div>
                <div>or</div>
                <div className="button" onClick={() => history.push("/login")}>Login</div>
            </div>
        </Card>
    )
}

export default Register