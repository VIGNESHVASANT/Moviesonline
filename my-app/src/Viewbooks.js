import axios from 'axios';
import React, { useEffect, useState } from 'react'
import env from "./settings"
function Viewbooks(props) {
    let [list,setList]=useState([])
    let fetchSeats = async() => {
        let c=0;
        let s=[]
        try{
            let data= await axios.get(`${env.api}/seats/${props.match.params.id}`,{
                headers : {
                  "Authorization" : window.localStorage.getItem("admin_token")
                }
              })
            //   console.log(data.data[0].userid)
            //   setUserid(data.data[0].userid)
              setList(data.data[0].seats)                     
         
           }
        catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        
        fetchSeats()
    }, [])
    return (
        <div>
            Shows booked tickets
            <div className="container d-flex justify-content-around flex-row">
            <div>
            <div class="d-flex flex-row" ><h3 class='p-2'>A</h3>
                {list.filter((item,index)=>index<10).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>B</h3>
                {list.filter((item,index)=>index>=10&index<20).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>C</h3>
                {list.filter((item,index)=>index>=20&index<30).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>D</h3>
                {list.filter((item,index)=>index>=30&index<40).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>E</h3>
                {list.filter((item,index)=>index>=40&index<50).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>F</h3>
                {list.filter((item,index)=>index>=50&index<60).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>G</h3>
                {list.filter((item,index)=>index>=60&index<70).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>H</h3>
                {list.filter((item,index)=>index>=70&index<80).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>I</h3>
                {list.filter((item,index)=>index>=80&index<90).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>J</h3>
                {list.filter((item,index)=>index>=90&index<100).map(obj=>{return(<span><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            </div>
        </div>
    
        </div>
    )
}

export default Viewbooks