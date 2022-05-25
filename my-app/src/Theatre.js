import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import env from './settings'

function Theatre(props) {
    const [list, setList] = useState([])
    const Navigate = useNavigate()
    let fetchMovies = async() => {
        try{
            let data= await axios.get(`${env.api}/movies/${props.match.params.id}`,{
                headers : {
                  "Authorization" : window.localStorage.getItem("admin_token")
                }
              })
              console.log(data)
            setList([...data.data])
            // setLoading(false)
        }
        catch(error){
            console.log(error);
            // setLoading(false)
        }
    }
    useEffect(async () => {
        try {
            {window.localStorage.getItem("admin_token")? <></>:Navigate.push('/login-admin')}
            fetchMovies();
        } catch (error) {
            
        }
    }, [])
    let handleDelete=async(id)=>{
        try{
            let data= await axios.delete(`${env.api}/remove-movie/${id}`,{
                headers : {
                  "Authorization" : window.localStorage.getItem("admin_token")
                }
              })
            fetchMovies();
            // setLoading(false)
        }
        catch(error){
            console.log(error);
            // setLoading(false)
        }
    }
    return (
        <div class="container">
            <Link className="mx-3 btn btn-primary " to={`/theatre/addmovie/${props.match.params.id}`}>Add a Movie</Link>
            <div class="container row">
            
            {list.map((obj)=>{
                return(
                    <div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                    <div class="card card-inverse card-info">
                        <img class="card-img-top" src={`${obj.url}`}/>
                        <div class="card-block">
                            <figure class="profile profile-inline">
                                {/* <img src={obj.url} class="profile-avatar" alt=""/> */}
                            </figure>
                            <h4 class="card-title">{obj.movieName}</h4>
                            <div class="card-text">
                                {obj.time}
                            </div>
                        </div>
                        <div class="card-footer">
                            <Link class="btn btn-info btn-sm" to={`/viewbooks/${obj._id}`}>View Bookings</Link>
                            <button class="btn btn-info btn-sm btn-danger" onClick={()=> {handleDelete(obj._id)}}>Remove Show</button>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
        </div>
    )
}

export default Theatre