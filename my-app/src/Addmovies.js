import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Addmovies(props) {
    const [movieName, setMovieName] = useState("");
    const [time, setTime] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [url, setUrl] = useState("");
    const [genre, setGenre] = useState("");
    let navigate=useNavigate();
    const d = new Date()
    let seats = [];
    for(let i=1;i<=10;i++){
        for( let j=1;j<=10;j++){
            seats.push({row:i,_id:j,status:false,booked:false,statusid:0,bookedid:0})
        }
    }
    useEffect(() => {
        {window.localStorage.getItem("admin_token")?<></>:navigate.push('/login-admin')}
    }, [])
    let handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let data = await axios.post(`${env.api}/addshow/${props.match.params.id}`, {movieName,time,url,seats},{
                headers : {
                  "Authorization" : window.localStorage.getItem("admin_token")
                }
              })
            console.log(props.match.params.id)
            navigate.push(`/theatre/${props.match.params.id}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col col-md-6">
                        <label>Movie Name</label>
                        <input type="text" value={movieName} onChange={(e)=>setMovieName(e.target.value)} className="form-control" required/>
                    </div>
                    <div className="col col-md-6">
                        <label>Show Time</label>
                        <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="form-control" required/>
                    </div>
                    <div className="col col-md-6">
                        <label>From Date</label>
                        <input type="date" min={`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`} max={`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()+6}`} value={fromDate} onChange={(e)=>setFromDate(e.target.value)} className="form-control" required/>
                    </div>
                    <div className="col col-md-6">
                        <label>To Date</label>
                        <input type="date" min={`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`} max={`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()+6}`} value={toDate} onChange={(e)=>setToDate(e.target.value)} className="form-control" required/>
                    </div>
                    <div className="col col-md-6">
                        <label>Poster URL</label>
                        <input type="url" value={url} onChange={(e)=>setUrl(e.target.value)} className="form-control" required/>
                    </div>
                    <div className="col col-md-6">
                        <label>Genres</label>
                        <input type="text" value={genre} onChange={(e)=>setGenre(e.target.value)} className="form-control" required/>
                    </div>
                    <div className="col col-md-12">
                        <input type="submit" value="Submit" className="btn btn-primary mt-3" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Addmovies;



