import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Registeradmin() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const Navigate = useNavigate()
    let handelsubmit = async (e) => {
        e.preventDefault()
        console.log({ username, password, confirmpassword })
        try {
            await axios.post(`${env.api}/register-admin`, { username, password });
            alert('confirmation Email sent! confirm it to login')
            history.push("/login-admin")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() =>{
        {window.localStorage.getItem("admin_token")?navigate.push('/admin'):<></>}
    }, [])
    return (
        <main class="form-signin text-center">
            <form onSubmit={(e) =>{
                handlesubmit(e)
            }}>
                <img class="mb-4" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" width="72" height="57" />
                <h1 class="h3 mb-3 fw-normal">ADMIN REGISTER</h1>

                <div class="form-floating">
                    <input type="email" value={username} onChange={e => setusername(e.target.value)} class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" value={password} onChange={e => setpassword(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                    <input type="password" value={confirmpassword} onChange={e => setconfirmpassword(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Confirm Password</label>
                </div>


                {/* <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div> */}
                <input class="w-100 btn btn-lg btn-primary" disabled={password!==confirmpassword} type="submit" value="Sign up" />
                <p class="mt-5 mb-3 text-muted">Already have an account <Link to="/login-admin">Login here</Link></p>
            </form>
        </main>
    )
}

export default Registeradmin;