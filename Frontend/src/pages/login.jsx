import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate=useNavigate();

  async function setDetails() {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/users/login",
      { email, password }
    );
    toast.success("Success");
    
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("email",response.data.email)

    if(response.data.role==='admin'){

        window.location.href = "/admin/Products";

        localStorage.setItem("role","admin")

        toast.success("Success");
    }else{
      if(response.data.role==='customer'){
        window.location.href = "/";

        toast.success("Success");
        localStorage.setItem("role","customer")
        

      }else{
        window.location.href = "/login";
      toast.error("Login Failed")
      }
    }
  } catch (e) {
    console.log(e.response?.data || e.message);
    toast.error("Incorrect Username or Password")
    
  }

}

const LoginWithGoole = useGoogleLogin({
        onSuccess:(response)=>{
          const accessToken=response.access_token
          axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google",{
            accessToken:accessToken
          }).then((response)=>{
          
          const token=response.data.token;
          
          localStorage.setItem("token", token)
          
          if(response.data.role=="admin"){

        localStorage.setItem("role","admin")
        
             window.location.href = "/admin/Products";
             

        
          }else{
            localStorage.setItem("role","customer")
             window.location.href = "/";

        
        
       
          }
        })
        }
});



  return (
    <div className="w-full h-screen flex  justify-evenly items-center bg-center bg-cover bg-[url('login1.jpg')]">
      <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 backdrop-blur-md bg-white/10 border border-white/20">
  
  
  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    type="email"
    placeholder="Email"
    className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
  />
  
  <input
    value={password}
    onChange={(e) => setPass(e.target.value)}
    type="password"
    placeholder="Password"
    className="w-full mb-6 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
  />
  
  <button
    onClick={setDetails}
    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
  >
    Login
  </button>

  <p className="text-center text-sm text-gray-500 mt-4">
    Don’t have an account? <a href="/register" className="text-blue-400 hover:underline">Sign up</a>
  </p>
  <button onClick={LoginWithGoole}className="cursor-pointer flex flex-row items-center justify-center w-full gap-2 hover:scale-105 transition-transform duration-200">
        <FaGoogle className="text-3xl"/>
        <span> Login with google</span>
  </button>
</div>


      <div className="w-[50%] f-full max-w-md rounded-2xl shadow-lg p-8 backdrop-blur-md">  </div>
    </div>
  );
}
