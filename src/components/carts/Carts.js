import React, { useState, useEffect } from 'react';
import { loginContext } from '../../contexts/logincontext';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Carts = () => {
  let {register,handleSubmit,formState:{errors},}=useForm();
  let [err,setErr]=useState("")
  let submitForm=(adduser)=>{
    console.log("adduser",adduser)
    // document.writeln(adduser);
    axios.post("http://localhost:3500/userApp/delete",adduser)
    .then((res)=>{
     console.log("res",res.status);
      if(res.status===201){
        setErr("");
      }
      if(res.status!=201)
        {
          console.log("cannt delete")
          setErr(res.data.message)
        }
          })
      .catch((err)=>{console.log(err)
        if(err.response){
          setErr(err.message)
        }
        else if(err.request){
          setErr(err.message)
        }
        else{
          setErr(err.message)
        }
      });  
    };
  return (
    <div className='bg-dark-subtle'>
    <p className="display-3 text-center text-black ">Delete User</p>
     {/* {err.length!==0 && (<p className='display-3 fw-bold text-center text-danger'>{err}</p>)} */}
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
          <button type="submit" className="btn btn-success">delete User </button>
         </form>
      </div>
     </div>
    </div>
  );
};

export default Carts;
