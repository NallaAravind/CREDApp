import { useState } from 'react';
import axios from 'axios';
import { loginContext } from './logincontext';

function Userloginstore({ children }) {
    const [currentuser, setUser] = useState();
    const [error, setErr] = useState("");
    const [userloginstatus, setUserLoginStatus] = useState(false);
    const logoutUser =()=>{
        localStorage.clear();
        setUserLoginStatus(false);
    }
    const loginUser = (credObj) => {
        axios.post("http://localhost:3500/userApp/login", credObj)
            .then((res) => {
                if (res.data.message === "success") {
                    console.log(res)
                    localStorage.setItem("token",res.data.token)
                    console.log("Navigated to userprofile");
                    setUser({ ...res.data.user });
                    // console.log(currentuser);
                    setErr("");
                    setUserLoginStatus(true);
                } else {
                    console.log("User login failed", res.data.message);
                    setErr(res.data.message);
                }
            })
            .catch((error) => {
                console.log("err in userlogin ", error);
                setErr(error.message);
            });
    };

    return (
        <loginContext.Provider value={[currentuser, error, userloginstatus, loginUser,logoutUser]}>
            {children}
        </loginContext.Provider>
    );
}

export default Userloginstore;
