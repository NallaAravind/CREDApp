
import React,{useState} from 'react'
import './Register.css'
// import { FormData } from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useForm} from 'react-hook-form'
function Register() {
  let [selectedFile,setselectedfile]=useState(null);
    let navigate=useNavigate();
  let [err,setErr]=useState("")
  const InputFile=(e)=>{
    setselectedfile(e.target.files[0]);
  }
  let {register,handleSubmit,formState:{errors},}=useForm();
  let submitForm=(adduser)=>{
    // console.log(adduser)
    // document.writeln(adduser);
    let fd=new FormData();
    fd.append("user",JSON.stringify(adduser));
    fd.append("photo",selectedFile);
    axios.post("http://localhost:3500/userApp/register",fd)
    .then((res)=>{
      console.log("res status",res.status)
      if(res.status===201){
        setErr("");
        navigate("/Login");
      }
      if(res.status!=201)
        {
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
    <div className=''>
    <p className="display-3 text-center text-black ">Registration Form</p>
     {err.length!==0 && <p className='display-3 fw-bold text-center text-danger'>{err}</p>}
     <div className="row">
      <div className="col-11 col-sm-8 col-md-6 mx-auto text-black">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="div mb-3">
            <label htmlFor='name'>Name</label>
            <input type="text" id="name" className='form-control' {...register("name",{required:true})}/>
            {errors.name?.type==="required" && <p className='text-danger'>Name is Required</p>}
          </div>
          <div className="div mb-3">
            <label htmlFor='name'>Email</label>
            <input type="text" id="email" className='form-control' {...register("email",{required:true})}/>
            {errors.email?.type==="required" && <p className='text-danger'>Email  is Required</p>}
          </div>
          <div className="div mb-3">
            <label htmlFor='dob'>Date of birth</label>
            <input type="date" id="dob" className='form-control' {...register("dob",{required:true})}/>
            {errors.date?.type==="required" && <p className='text-danger'>Date of birth is Required</p>}
          </div>
          <div className="div mb-3">
            <label htmlFor='name'> select an Image</label>
            <input type="file" id="image" className='form-control' {...register("image",{required:true})} onInput={InputFile} />
            {errors.image?.type==="required" && <p className='text-danger'>image is Required</p>}
          </div>
          <div className="div mb-3">
            <label htmlFor='name'>Password</label>
            <input type="password" id="password" className='form-control' {...register("password",{required:true})} />
            {errors.name?.type==="required" && <p className='text-danger'>password is Required</p>}
          </div>
      

          <button type="submit" className="btn btn-success" >Sign up</button>
         </form>
      </div>
     </div>
    </div>
  )
}

export default Register
