import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <p className="mt-4 text-lg text-slate-600">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
