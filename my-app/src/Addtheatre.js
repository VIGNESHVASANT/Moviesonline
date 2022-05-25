import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import env from './settings';
function Addtheatre() {
    const [name, setname] = useState("");
    let navigate=useNavigate();
    
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let data = await axios.post(`${env.api}/addtheatre`, {name},{
                headers : {
                  "Authorization" : window.localStorage.getItem("admin_token")
                }
              })
            console.log(data)
            navigate.push("/admin")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        {window.localStorage.getItem("admin_token")?<></>:navigate.push('/login-admin')}
    }, [])
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col col-md-6">
                        <label>Theatre Name</label>
                        <input type="text" value={name} onChange={(e)=>setname(e.target.value)} className="form-control"/>
                    </div>
                    <div className="col col-md-12">
                            <input type="submit" value="Submit" className="btn btn-primary mt-3" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Addtheatre
