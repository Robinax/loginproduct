import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import Dashboard from "./Dashboard";


const Login = () => {
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token,setToken] = useState('')
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(false)
    const history = useHistory();

   async function handlelogin() {
       
        const result = await fetch("http://localhost:8080/user/login",{
         method:'Post',
         headers:{
             "username":username,
             "password":password
         }});
        
        const usertoken = await result.text()
         console.log(usertoken)
        if(usertoken==null || usertoken === ""){
           alert("Wrong username or password")     
        }else
    history.push({
        pathname: '/dashboard',
        state: {usertoken}
    });

    }
       
    return (
        <div>
           <h3>Login</h3> <br/><br/>
           <div>
               <div>
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
            </div>
            <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input> 
            </div><br/>
            {error &&  <div className="error">{error}</div>}
            <input type="button"
            value={loading ? "Loading...." : "Login"}
            disabled={loading}
            onClick={handlelogin}
            
            />
           </div>


        </div>
    )

}

export default Login;