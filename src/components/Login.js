import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    let navigate = useNavigate()
    const [cred, setcred] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.JWTData)
            navigate("/")

        }else{
            alert("Invalid Request")
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setcred({...cred, [name]: value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" name="email" onChange={handleChange} value={cred.email} class="form-control" autoComplete='off' id="email" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" onChange={handleChange} value={cred.password} name="password" class="form-control" id="password" />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login