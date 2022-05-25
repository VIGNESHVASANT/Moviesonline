import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import env from './settings'


function Admin() {
    const [list, setList] = useState([])
    let navigate =  useNavigate();
    let fetchTheatres = async() => {
        try{
            let data= await axios.get(`${env.api}/theatres`,{
                headers : {
                  "Authorization" : window.localStorage.getItem("admin_token")
                }
              })
            setList([...data.data])
            // setLoading(false)
        }
        catch(error){
            console.log(error);
            // setLoading(false)
        }
    }
    useEffect(async() => {
        try{
            {window.localStorage.getItem("admin_token")?<></>:navigate.push("/login-admin")}
            fetchTheatres();
        }
        catch(error){
            console.log(error);
            // setLoading(false)
        }
    }, []);
    let handleDelete=async(id)=>{
        try{
            let data= await axios.delete(`${env.api}/remove-theatre/${id}`,{
                headers : {
                  "Authorization" : window.localStorage.getItem("admin_token")
                }
              })
            fetchTheatres();
            // setLoading(false)
        }
        catch(error){
            console.log(error);
            // setLoading(false)
        }
    }
    return (
        <div className="container">
            <Link className="mt-3 btn btn-primary d-flex justify-content-center" to="/addtheatre">Add a theatre</Link>
             <br/>
            <h2>Your Theatres</h2>
            <div class="container row">
                {list.map((obj)=>{
                    return(
                    <div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                    <div class="card card-inverse card-info">
                        <img class="card-img-top" src="https://thumbs.dreamstime.com/b/red-ticket-icons-%C3%A2%E2%82%AC-stock-vector-red-ticket-icons-vector-117693776.jpg"/>
                        <div class="card-block">
                            <figure class="profile profile-inline">
                                {/* <img src="https://picsum.photos/200/150/?random" class="profile-avatar" alt=""/> */}
                            </figure>
                            <h4 class="card-title">{obj.name}</h4>
                            <div class="card-text">
                                Lorem ipsum
                            </div>
                        </div>
                        <div class="card-footer">
                            <Link class="btn btn-info btn-sm" to={`/theatre/${obj._id}`}>View Shows</Link>
                            <Link class="btn btn-info btn-sm" to={`/theatre/addmovie/${obj._id}`}>Add Shows</Link>
                            <button class="btn btn-info btn-sm btn-danger" onClick={()=> {handleDelete(obj._id)}}>Remove Theatre</button>
                        </div>
                    </div>
                </div>
                 ) })}
            </div>
        </div>
    )
}

export default Admin

