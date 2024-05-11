import React,{useState,useContext,useEffect} from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useForm} from 'react-hook-form'
import { loginContext } from '../../contexts/logincontext';
function Login() {
  // console.log(useContext(loginContext));
  let [currentuser,error,userloginstatus,loginUser] =useContext(loginContext)
  let navigate=useNavigate();
  let [err,setErr]=useState("")
  let {register,handleSubmit,formState:{errors},}=useForm();
  let submitForm=(adduser)=>{
    console.log(adduser);
    loginUser(adduser);
    };
    useEffect(()=>{
      if(userloginstatus==true){
        navigate('/Profile');
      }
    },[userloginstatus]);
  return (
    <div className='bg-dark-subtle'>
    <p className="display-3 text-center text-black ">Login Credentials</p>
     {error.length!==0 && (<p className='display-3 fw-bold text-center text-danger'>{error}</p>)}
     {/* {error.length===0 && (<p className='display-3 fw-bold text-center text-danger'>{"User successfully loggin"}</p>)} */}
     <div className="row">
      <div className="col-11 col-sm-8 col-md-6 mx-auto text-black">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="div mb-3">
            <label htmlFor='name'>Email</label>
            <input type="text" id="email" className='form-control' {...register("email",{required:true})}/>
            {errors.email?.type==="required" && <p className='text-danger'>Email  is Required</p>}
          </div>
          <div className="div mb-3">
            <label htmlFor='password'>Password</label>
            <input type="password" id="password" className='form-control' {...register("password",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>password is Required</p>}
          </div>
          <button type="submit" className="btn btn-success">Sign in </button>
         </form>
      </div>
     </div>
    </div>
  )
}


export default Login
