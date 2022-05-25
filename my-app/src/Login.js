import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';



function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [message, setMessage] = useState(true);
    let Navigate = useNavigate()
    useEffect(() => {
        {window.localStorage.getItem("app_token")?Navigate.push('/user'):<></>}

    },[])
    let handelSubmit = async (e) => {
        e.preventDefault()
        try {
            let logindata = await axios.post(`${env.api}/login`, { username, password })

            window.localStorage.setItem.setItem("app_token",logindata.data.token)
            window.localStorage.getItem("admin_token")?window.localStorage.removeItem("admin_token"):<></>
            Navigate.push("/user")
            window.location.reload()


        } catch (error) {
            setMessage(false)
            console.log(error)
        }
    }
    return (
        <main class="form-sign text-center">
            <form onSubmit={handelsubmit}>

                <img class="mb-4" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" width="72" height="57" />
                <h1 class="h3 mb-3 fw-normal">USER SIGN IN</h1>

                <div class="form-floating">
                    <input type="email" Value={username} onChange={e => setusername(e.target.value)} class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" value={password} onChange={e => setpassword(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                {message? <></>:<label style={{color:"red"}}>Username/Password is incorrect</label>}

                <input class="w-100 tbn tbn-lg btn-primary" type="submit" value="sign in" />
                <p class="mt-5 mb-3 text-muted">Don't have an account <Link to="/register-user">Register here</Link></p>
            </form>
        </main>
    )
}

export default Login;