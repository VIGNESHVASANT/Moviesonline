import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import env from './settings'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

function Bookshow(props) {
    const [list, setList] = useState([])
    const [count,setCount]=useState(0)
    const [selected,setSelected]=useState([])
    const [userid, setUserid]=useState('')
    let Navigate=useNavigate();
    
    let fetchSeats = async() => {
        
        try{
            let {data}= await axios.get(`${env.api}/seats/${props.match.params.id}`,{
                headers : {
                  "Authorization" : window.localStorage.getItem("app_token")
                }
            })
            console.log(data)
            setUserid(data.userid)
            setList(data.seats)
            setSelected(data.seats.filter(item => item.status === true && item.statusid === userid && item.booked === false))
            setCount(data.seats.filter(item => item.status===true&&item.statusid===userid&&item.booked===false ).length)
            // setCount(selected.length)
            console.log(list)
            // console.log(userid)
            console.log(selected)
           }
        catch(error){
            console.log(error);
        }
    }
    useEffect(async() => {
        try{
            {window.localStorage.getItem("app_token")? <></>:Navigate.push('/login-admin')}
            fetchSeats();
         }
        catch(error){
            console.log(error);
        }
    }, []);
    // let Test = async (e) => {
    //     e.preventDefault()
    //     const data = axios.get(`${env.api}/sample`, {
    //         headers : {
    //                 "Authorization" : window.localStorage.getItem("app_token")
    //               }
    //     })
    //     console.log(data)
    // }
    let handleChange=async (e,obj)=>{
        // console.log(e)
        if(!obj.booked&&(obj.statusid==0||obj.statusid===userid)){
            obj.status=!obj.status
            const {data}= await axios.put(`${env.api}/seatbook/${props.match.params.id}`,{status:obj.status,_id:obj._id,row:obj.row},{
                headers : {
                    "Authorization" : window.localStorage.getItem("app_token")
                  }
            })
            // setList(data.value.seats)
            console.log(data)
            // setSelected(data.value.seats.filter(item => item.status===true&&item.statusid===userid&&item.booked===false ))
            // setCount(data.value.seats.filter(item => item.status===true&&item.statusid===userid&&item.booked===false ).length)
            fetchSeats()
        }
        else{
        }
    }
    let handleSubmit= async(e,)=>{
        e.preventDefault()
        try {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            console.log(res)
            let data1= await axios.post(`${env.api}/razorpay`,{count},{
                headers : {
                    "Authorization" : window.localStorage.getItem("app_token")
                  }
            });
            console.log(data1.data)
            var options = {
                key: "rzp_test_ATpjQlVb8Ah2vF", // Enter the Key ID generated from the Dashboard
                amount: data1.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: data1.data.currency,
                name: "To Gopi",
                description: "Test Transaction",
                handler: async function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);    
                    // alert(response.razorpay_signature)};
                    let data=await axios.put(`${env.api}/seatbooked/${props.match.params.id}`,{userid},{
                        headers : {
                            "Authorization" : window.localStorage.getItem("app_token")
                          }
                    })
                    // console.log(data.data.data[0].seats.filter(obj=>obj.booked==true&&obj.bookedid==userid))
                    alert('Tickets booked and sent on mail')
                    Navigate.push("/")
                },
                // "image": "https://example.com/your_logo",
                order_id: data1.data.id,   
                prefill: {
                    "name": "Test User",
                    "email": "testuser@example.com",
                    "contact": "9999999999"
                    },
                theme: {
                    "color": "#3399cc"
                }
            };
            console.log(options)
            const rzp1 =await new window.Razorpay(options);
            await rzp1.open()
            // console.log(typeof(rzp1))
            // rzp1.on('payment.failed', function (response){
            //     alert(response.error.code);
            //     alert(response.error.description);
            //     alert(response.error.source);
            //     alert(response.error.step);
            //     alert(response.error.reason);
            //     alert(response.error.metadata.order_id);
            //     alert(response.error.metadata.payment_id);
            // })
            // let data=await axios.put(`${env.api}/seatbooked/${props.match.params.id}`,{userid},{
            //     headers : {
            //         "Authorization" : window.localStorage.getItem("app_token")
            //       }
            // })
            // console.log(data.data.data[0].seats.filter(obj=>obj.booked==true&&obj.bookedid==userid))
            // // alert('tickets sent on mail')
            // Navigate.push("/")
        } catch (error) {
            
        }
    }
    let select = '';
    return (
        <div className="container d-flex justify-content-around flex-row row">
            <div className='col-lg-6'>
            <h3>Ticket Cost: Rs.250 per head</h3>
            {/* <div className='d-flex flex-row'>Hi</div> */}
            <div class="d-flex flex-row" ><h3 class='p-2'>A</h3>
                {list.filter((item,index)=>index<10).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>B</h3>
                {list.filter((item,index)=>index>=10&index<20).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>C</h3>
                {list.filter((item,index)=>index>=20&index<30).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>D</h3>
                {list.filter((item,index)=>index>=30&index<40).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>E</h3>
                {list.filter((item,index)=>index>=40&index<50).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>F</h3>
                {list.filter((item,index)=>index>=50&index<60).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>G</h3>
                {list.filter((item,index)=>index>=60&index<70).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>H</h3>
                {list.filter((item,index)=>index>=70&index<80).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>I</h3>
                {list.filter((item,index)=>index>=80&index<90).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            <div class="d-flex flex-row" ><h3 class='p-2'>J</h3>
                {list.filter((item,index)=>index>=90&index<100).map(obj=>{return(<span onClick={(e)=>handleChange(e,obj)} ><i class="p-2 fas fa-square fa-2x" style={obj.booked?{color:"#FF0000"}:obj.status&&obj.statusid==userid?{color:"#39E500"}:obj.status?{color:"#FF0000"}:{color:"#A5A5A5"}}></i></span>
            )})}
            </div>
            </div>
            <div className='col-lg-4'>
                <div>
                    <h3><i class="p-2 fas fa-square fa-2x" style={{color:"#A5A5A5"}}></i>Available</h3>
                    <h3><i class="p-2 fas fa-square fa-2x" style={{color:"#FF0000"}}></i>Unavailable</h3>
                    <h3><i class="p-2 fas fa-square fa-2x" style={{color:"#39E500"}}></i>Selected</h3>
                </div>
                <div class="p-5">
                    <h3>
                        
                    Total Payable : <span style={{color:'blue'}}>Rs. {250*count}</span><br/>
                    {/* Selected Seats : <span style={{color:'blue'}}></span><br/> */}
                    <button class="btn btn-primary" disabled={!count} onClick={e=>handleSubmit(e)} >Make Payment</button>
                    {/* <button class="btn btn-primary" onClick={e=>Test(e)} >Test</button> */}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Bookshow
