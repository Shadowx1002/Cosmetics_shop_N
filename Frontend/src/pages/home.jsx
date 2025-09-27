export default function HomePage(){
    return(
         <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-4xl font-bold text-slate-800">Welcome to MyShop</h1>
      <p className="mt-3 text-slate-600">Your one-stop shop for awesome products.</p>
      <div className="mt-6 flex gap-4">
        <a href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Login</a>
        <a href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg">Sign Up</a>
      </div>
    </div>
    )
}