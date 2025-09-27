import { Link, useNavigate } from "react-router-dom";




export default function Header() {

  const navigate=useNavigate()
  return (
   <header className="flex items-center justify-between px-6 py-4 bg-slate-800 text-white shadow-2xl w-full h-[70px]">
     
      <div className="text-xl font-bold"><img onClick={()=>{
        navigate("/")
      }} src="/logo.png" alt="MyShop Logo" className="inline-block  mr-2 w-[50px] h-[50px] object-cover" /> MyShop</div>
      <nav className="flex gap-4">
        <Link to="/" className="hover:text-indigo-300">Home</Link>
        <Link to="/Product" className="hover:text-indigo-300">Product</Link>
        <Link to="/About" className="hover:text-indigo-300">About</Link>
        <Link to="/Contact" className="hover:text-indigo-300">Contact</Link>
      </nav>
    </header>
    
      
  );
}
