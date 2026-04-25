import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message);
    } else {
      navigate("/"); // Redirect to dashboard
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">DevEngine</h2>
        <p className="text-slate-400 mb-8">Access your technical dashboard</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-indigo-500 transition-all"
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email Address" 
            type="email"
            required
          />
          <input 
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-indigo-500 transition-all"
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            type="password"
            required
          />
          <button 
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}