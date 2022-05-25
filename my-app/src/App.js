import './App.css';
import Register from './Register';
import Login from './Login';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from 'react-router-dom';
import Home from './Home';
import Loginadmin from './Loginadmin';
import Registeradmin from './Registeradmin';
import Admin from './Admin';
import User from './User';
import Addtheatre from './Addtheatre';
import Addmovies from './Addmovies';
import Theatre from './Theatre';
import Bookshow from './Bookshow';
import Viewbooks from './Viewbooks';
function App() {
  let navigate= useNavigate();
  
  return (

    <div>
      <Router>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
         <Link class="navbar-brand" to="/">Movie Booking</Link>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
         </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
             <Link class="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/login-user">Customer</Link>
          </li>
          <li class="nav-item">
           <Link class="nav-link" to="/login-admin">Theatre Management</Link>
        </li>
      </ul>
      </div>
      {window.localStorage.getItem("app_token")?<button className="btn navbar-btn btn-danger navbar-right pull-right" onClick={() => {
          window.localStorage.removeItem("app_token")
          window.location.reload()
        }}>Logout</button> :window.localStorage.getItem("admin_token")?<button className="btn navbar-btn btn-danger navbar-right pull-right" onClick={() => {
          window.localStorage.removeItem("admin_token")
          window.location.reload()
        }}>Logout</button>:<Link to="/login-user" className="btn navbar-btn btn-primary navbar-right pull-right">Login</Link>}
   
    {/* {window.localStorage.getItem("app_token")?<button className="btn navbar-btn btn-danger navbar-right pull-right" onClick={() => {
          window.localStorage.removeItem("app_token");
          history.push("/")
        }}>Logout</button> :<div className="btn navbar-btn btn-danger navbar-right pull-right">Login</div>} */}
  </div>
</nav>
      <Router>
        <Route>
          <Route path="/" component={Home} exact="true"/>
          <Route path="/admin" component={Admin} exact="true"/>
          <Route path="/user" component={User} exact="true"/>
          <Route path="/addtheatre" component={Addtheatre} exact="true"/>
          <Route path="/theatre/addmovies/:id" component={Addmovies} exact="true"/>
          <Route path="/bookshow/:id" component={Bookshow} exact="true"/>
          <Route path="/viewbooks/:id" component={Viewbooks} exact="true"/>
          <Route path="/theatre/:id" component={Theatre} exact="true"/>
          <Route path="/login-user" component={Login} exact="true"/>
          <Route path="/register-user" component={Register} exact="true"/>
          <Route path="/login-admin" component={Loginadmin} exact="true"/>
          <Route path="/register-admin" component={Registeradmin} exact="true"/>
        </Route>
       </Router> 
      </Router>
    </div>
  );
}

export default App;


