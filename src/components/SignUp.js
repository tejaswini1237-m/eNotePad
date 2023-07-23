import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function SignUp() {
    let navigate = useNavigate()
    const [cred, setcred] = useState({
        name:"",
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name:cred.name, email: cred.email, password: cred.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.JWTData)
            navigate("/")
        } else {
            alert("Invalid Request")
        }
        
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setcred({ ...cred, [name]: value })
    }
    return (
        <div><form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" name="name" onChange={handleChange} id="name" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" name="email" onChange={handleChange} id="email" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" onChange={handleChange} id="password" />
            </div>
            <button type="submit" class="btn btn-primary">SignUp</button>
        </form></div>
    )
}

export default SignUp