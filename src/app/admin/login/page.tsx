"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cachedEmail = localStorage.getItem("admin_login_email");
    if (cachedEmail) {
      setEmail(cachedEmail);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.token); // Store the DB ref ID
        if (rememberEmail) {
          localStorage.setItem("admin_login_email", email);
        } else {
          localStorage.removeItem("admin_login_email");
        }
        router.push("/admin/dashboard");
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.details?.includes('Firestore API has not been used')) {
           setErrorText('FIRESTORE_NOT_ENABLED: Please enable Firestore Database in your Firebase Console.');
        } else {
           setErrorText('AUTH_FAILED: Invalid Credentials');
        }
      }
    } catch (err) {
      setErrorText('AUTH_FAILED: Server Offline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onSubmit={handleLogin} 
        className="bg-surface-card border-2 border-text-muted/20 p-8 w-full max-w-md relative z-10 shadow-2xl"
      >
        <div className="mb-8 border-b-2 border-text-muted/20 pb-4">
          <h1 className="text-3xl font-black uppercase tracking-widest text-text-primary">SYS_ADMIN</h1>
          <p className="font-mono text-xs text-text-muted mt-2">RESTRICTED ACCESS NODE</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase text-accent-primary">Enter Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-2 border-text-muted/40 p-3 font-mono text-text-primary placeholder:text-text-muted/70 outline-none focus:border-accent-primary rounded-sm transition-colors"
              placeholder="admin@system.local"
              required
              autoFocus
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase text-accent-energy">Enter Security Key</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border-2 border-text-muted/40 p-3 pr-12 font-mono text-text-primary placeholder:text-text-muted/70 outline-none focus:border-accent-energy rounded-sm transition-colors"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-mono text-text-secondary mt-[-8px]">
            <input
              type="checkbox"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
              className="h-4 w-4 accent-accent-primary"
            />
            Remember email on this browser
          </label>

          {errorText && <span className="font-mono text-xs text-accent-warning mt-[-10px]">{errorText}</span>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-accent-primary text-white font-bold font-mono py-4 border-2 border-transparent hover:bg-surface-dark hover:text-white hover:border-accent-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "AUTHENTICATING..." : "INITIALIZE_SESSION"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
