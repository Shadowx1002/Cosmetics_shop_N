import { Link } from "react-router-dom";

export default function Header() {
  return (
   <header className="flex items-center justify-between px-6 py-4 bg-slate-800 text-white">
      <div className="text-xl font-bold">MyShop</div>
      <nav className="flex gap-4">
        <Link to="/" className="hover:text-indigo-300">Home</Link>
        <Link to="/login" className="hover:text-indigo-300">Login</Link>
        <Link to="/singup" className="hover:text-indigo-300">Sign Up</Link>
      </nav>
    </header>
    
      
  );
}
