"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Activity, ShieldAlert, LogOut, Database, Navigation, Archive, Edit, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"FEED" | "INBOX" | "ARCHIVE">("FEED");
  const [token, setToken] = useState("");

  // Feed State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [relatedProject, setRelatedProject] = useState("");
  const [category, setCategory] = useState("ARCHITECTURE");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFeedId, setEditingFeedId] = useState<string | null>(null);

  // Lists State
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loadingFeeds, setLoadingFeeds] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.push("/admin/login");
    } else {
      setToken(t);
      fetchContacts(t);
      fetchFeeds();
    }
  }, [router]);

  const fetchContacts = async (t: string) => {
    setLoadingContacts(true);
    try {
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      }
    } catch(e) {
      console.error(e);
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchFeeds = async () => {
    setLoadingFeeds(true);
    try {
      const res = await fetch("/api/feed");
      if (res.ok) {
        const data = await res.json();
        setFeeds(data.feeds || []);
      }
    } catch(e) {
      console.error(e);
    } finally {
      setLoadingFeeds(false);
    }
  };

  const handlePostFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const method = editingFeedId ? "PUT" : "POST";
      const payload = {
        ...(editingFeedId && { id: editingFeedId }),
        title,
        content,
        relatedProjectId: relatedProject || null,
        category: category
      };

      const res = await fetch("/api/feed", {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editingFeedId ? "TRANSMISSION_UPDATED: Node Patched." : "TRANSMISSION_SUCCESSFUL: Node Connected.");
        setTitle("");
        setContent("");
        setRelatedProject("");
        setCategory("ARCHITECTURE");
        setEditingFeedId(null);
        fetchFeeds();
      } else {
        alert("TRANSMISSION_FAILED: Node Rejected Payload.");
      }
    } catch(e) {
       alert("CRITICAL_ERROR: Framework offline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFeed = async (id: string) => {
    if (!confirm("CONFIRM_DELETE_TRANSMISSION? This action is irreversible.")) return;
    try {
      const res = await fetch(`/api/feed?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchFeeds();
      else alert("DELETE_FAILED");
    } catch(e) {
      console.error(e);
    }
  };

  const handleEditFeed = (feed: any) => {
    setEditingFeedId(feed.id);
    setTitle(feed.title);
    setContent(feed.content);
    setRelatedProject(feed.relatedProjectId || "");
    setCategory(feed.category || "ARCHITECTURE");
    setTab("FEED");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  if (!token) return <div className="min-h-screen bg-background-main" />;

  return (
    <div className="min-h-screen bg-background-main text-text-primary p-4 md:p-12 font-mono relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col h-full gap-12 relative z-10 pt-8">
        
        {/* HEADER */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex justify-between items-end border-b-2 border-text-muted/20 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase text-text-primary tracking-widest flex items-center gap-4">
              <ShieldAlert className="text-accent-energy w-10 h-10" />
              SYS_COMMAND_CENTER
            </h1>
            <div className="text-xs text-text-muted mt-2 tracking-widest uppercase flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
               Global Access Node // SECURED
            </div>
          </div>
          <button onClick={handleLogout} className="flex hidden md:flex items-center gap-2 text-xs border border-accent-warning text-accent-warning px-4 py-2 hover:bg-accent-warning hover:text-white transition-colors uppercase tracking-widest group">
            <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
            TERMIANTE_LINK
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="col-span-1 lg:col-span-3 flex flex-col gap-4">
             <div className="bg-surface-card border border-text-muted/20 p-4 flex flex-col gap-2 relative overflow-hidden group shadow-sm">
               <div className="absolute top-0 left-0 w-1 h-full bg-accent-primary" />
               <p className="text-[10px] text-text-muted font-bold tracking-widest mb-2 uppercase">Core Routing</p>
               
               <button 
                 onClick={() => { setTab("FEED"); setEditingFeedId(null); setTitle(""); setContent(""); }}
                 className={`text-left p-3 flex justify-between items-center transition-colors font-bold uppercase text-xs tracking-widest ${tab === "FEED" ? "bg-accent-energy/10 text-accent-energy border-l-2 border-accent-energy" : "text-text-muted hover:text-text-primary"}`}
               >
                 <span>&gt; PUBLISHER</span>
                 {tab === "FEED" && <Activity size={12} />}
               </button>

               <button 
                 onClick={() => setTab("ARCHIVE")}
                 className={`text-left p-3 flex justify-between items-center transition-colors font-bold uppercase text-xs tracking-widest ${tab === "ARCHIVE" ? "bg-accent-primary/10 text-accent-primary border-l-2 border-accent-primary" : "text-text-muted hover:text-text-primary"}`}
               >
                 <span>&gt; LOG_ARCHIVE</span>
                 {tab === "ARCHIVE" && <Archive size={12} />}
               </button>
               
               <button 
                 onClick={() => setTab("INBOX")}
                 className={`text-left p-3 flex justify-between items-center transition-colors font-bold uppercase text-xs tracking-widest ${tab === "INBOX" ? "bg-accent-secondary/10 text-accent-secondary border-l-2 border-accent-secondary" : "text-text-muted hover:text-text-primary"}`}
               >
                 <span>&gt; INBOX_CACHE</span>
                 {tab === "INBOX" && <Database size={12} />}
               </button>
             </div>
             
             {/* Readout */}
             <div className="bg-surface-card border border-dashed border-text-muted/30 p-4 mt-4 shadow-sm">
                <p className="text-[10px] text-accent-energy mb-2 uppercase opacity-80">System Readout</p>
                <div className="flex flex-col gap-1 text-[10px] text-text-muted">
                   <p>PING: 14ms</p>
                   <p>UPTIME: {Math.floor(Math.random() * 90) + 10}H</p>
                   <p>PUB_LOGS: {feeds.length} BLOCKS</p>
                   <p>INBOX_SIZE: {contacts.length} BLOCKS</p>
                </div>
             </div>
          </motion.div>

          {/* MAIN TERMINAL */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-1 lg:col-span-9">
            <div className="w-full bg-surface-card border border-text-muted/20 shadow-lg relative">
                
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-text-muted/20 px-4 py-3 bg-surface-dark">
                <div className="flex gap-2 items-center">
                  <Terminal size={14} className={tab === "FEED" ? "text-accent-energy" : "text-accent-secondary"} />
                  <span className="font-mono text-[10px] text-text-muted font-bold tracking-widest uppercase">
                    SYS_TERMINAL // {tab === "FEED" ? (editingFeedId ? "PATCH_OVERRIDE" : "BROADCAST_OVERRIDE") : tab === "ARCHIVE" ? "ARCHIVE_VIEW" : "PULLED_LOGS"}
                  </span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                   <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                   <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse" />
                </div>
              </div>

              {/* Terminal Content Area */}
               <div className="p-6 md:p-10 min-h-[500px]">
                 <AnimatePresence mode="wait">
                   
                   {/* FEED PUBLISHER */}
                   {tab === "FEED" && (
                     <motion.div key="feed" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8">
                       <h2 className="text-2xl font-black uppercase text-text-primary tracking-widest border-l-4 border-accent-energy pl-4">
                         {editingFeedId ? "Patch Existing Log" : "Emit Global Transmission"}
                       </h2>
                       
                       <form onSubmit={handlePostFeed} className="flex flex-col gap-8 text-text-primary">
                         
                         <div className="group">
                           <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block group-focus-within:text-accent-energy transition-colors">
                             &gt; DATA // TITLE_IDENTIFIER
                           </label>
                           <div className="flex items-end">
                             <span className="font-mono text-accent-energy text-lg mr-2 leading-none mb-1">~#</span>
                             <input required value={title} onChange={e=>setTitle(e.target.value)} className="flex-1 bg-transparent border-b-2 border-text-muted/30 tracking-wider text-text-primary font-mono placeholder:text-text-muted/60 focus:border-accent-energy focus:outline-none transition-colors pb-1" placeholder="ENTER_LOG_TITLE..." />
                           </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="group">
                             <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block group-focus-within:text-accent-primary transition-colors">
                               &gt; POINTER // INDEX_CATEGORY
                             </label>
                             <div className="flex items-end">
                               <span className="font-mono text-accent-primary text-lg mr-2 leading-none mb-1">~#</span>
                               <select className="flex-1 bg-transparent border-b-2 border-text-muted/30 tracking-wider text-text-primary font-mono focus:border-accent-primary focus:outline-none transition-colors pb-1 appearance-none cursor-pointer" value={category} onChange={e=>setCategory(e.target.value)}>
                                  <option value="ARCHITECTURE">INDEX: ARCHITECTURE</option>
                                  <option value="PERFORMANCE">INDEX: PERFORMANCE</option>
                                  <option value="UI/UX">INDEX: UI/UX</option>
                                  <option value="DEVOPS">INDEX: DEVOPS</option>
                                  <option value="SYSTEMS">INDEX: SYSTEMS</option>
                               </select>
                             </div>
                           </div>

                           <div className="group">
                             <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block group-focus-within:text-accent-secondary transition-colors">
                               &gt; POINTER // PROJECT_LINK_ID
                             </label>
                             <div className="flex items-end">
                               <span className="font-mono text-accent-secondary text-lg mr-2 leading-none mb-1">~#</span>
                               <select className="flex-1 bg-transparent border-b-2 border-text-muted/30 tracking-wider text-text-primary font-mono focus:border-accent-secondary focus:outline-none transition-colors pb-1 appearance-none cursor-pointer" value={relatedProject} onChange={e=>setRelatedProject(e.target.value)}>
                                  <option value="">-- NULL (NO_LINK) --</option>
                                  <option value="praxo">SYS: PRAXO</option>
                                  <option value="ridewheels">SYS: RIDE WHEELS</option>
                                  <option value="pet-ecommerce">SYS: PET CARE ECOMMERCE</option>
                                  <option value="n8n-bot">SYS: INTEL_BOT (N8N)</option>
                               </select>
                             </div>
                           </div>
                         </div>

                         <div className="group">
                           <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block group-focus-within:text-text-primary transition-colors">
                             &gt; DATA // RAW_PAYLOAD (BODY)
                           </label>
                           <div className="flex items-start mt-2">
                             <span className="font-mono text-text-primary text-lg mr-2 leading-none mt-1">~#</span>
                             <textarea required rows={6} value={content} onChange={e=>setContent(e.target.value)} className="flex-1 bg-surface-dark border-l-2 border-text-muted/30 p-4 tracking-wider text-text-primary font-mono placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none transition-colors resize-none shadow-inner" placeholder="INSERT_DATA_STREAM_HERE..." />
                           </div>
                         </div>

                         <button type="submit" disabled={isSubmitting} className="relative overflow-hidden w-full bg-accent-energy text-white font-mono font-bold uppercase tracking-[0.2em] py-4 hover:bg-surface-dark hover:text-accent-energy transition-all group mt-4 flex items-center justify-center gap-3">
                           <span className="z-10">{isSubmitting ? "UPLOADING_BLOCKS..." : (editingFeedId ? "EXECUTE_LOG_PATCH" : "EXECUTE_GLOBAL_BROADCAST")}</span>
                           {!isSubmitting && <Navigation size={16} className="z-10 group-hover:translate-x-2 transition-transform" />}
                           <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)] opacity-0 group-hover:opacity-100 transition-opacity" />
                         </button>
                         
                         {editingFeedId && (
                            <button type="button" onClick={() => { setEditingFeedId(null); setTitle(""); setContent(""); }} className="text-text-muted text-xs hover:text-accent-warning transition-colors uppercase tracking-widest uppercase">
                               Cancel Edit Session
                            </button>
                         )}

                       </form>
                     </motion.div>
                   )}

                   {/* ARCHIVE VIEWER */}
                   {tab === "ARCHIVE" && (
                      <motion.div key="archive" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                        <h2 className="text-2xl font-black uppercase text-text-primary tracking-widest border-l-4 border-accent-primary pl-4 mb-4">Transmission Log Archive</h2>
                        {loadingFeeds ? (
                         <div className="flex items-center gap-3 text-accent-primary p-8 border border-dashed border-accent-primary/30">
                            <Database size={16} className="animate-spin" />
                            <span className="uppercase tracking-widest text-xs">SCANNING_PUBLISHED_FEEDS...</span>
                         </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {feeds.length === 0 && (
                               <p className="text-text-muted text-xs uppercase tracking-widest border border-dashed border-text-muted/30 p-8 text-center text-accent-warning">NO_PUBLISHED_BLOCKS_FOUND</p>
                            )}
                            {feeds.map((f, i) => (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                               key={f.id} 
                               className="bg-surface-card border border-text-muted/20 shadow-sm p-4 group hover:border-text-muted/40 transition-colors relative flex justify-between items-start"
                             >
                               <div className="absolute top-0 bottom-0 left-0 w-1 bg-text-muted/20 group-hover:bg-accent-primary transition-colors" />
                               
                               <div className="ml-2 flex flex-col gap-1 w-full max-w-[80%]">
                                  <span className="text-accent-primary font-bold text-lg tracking-widest uppercase truncate">{f.title}</span>
                                  <div className="flex flex-wrap gap-2 text-[10px] text-text-muted uppercase">
                                    <span className="bg-surface-dark px-2 py-1">{f.category || "UNKNOWN"}</span>
                                    {f.relatedProjectId && <span className="bg-surface-dark px-2 py-1 flex items-center gap-1"><Navigation size={10}/> {f.relatedProjectId}</span>}
                                    <span className="bg-surface-dark px-2 py-1">{new Date(f.createdAt).toLocaleDateString()}</span>
                                  </div>
                               </div>

                               <div className="flex gap-2">
                                  <button onClick={() => handleEditFeed(f)} className="p-2 border border-text-muted/20 hover:border-accent-secondary hover:text-accent-secondary transition-colors text-text-muted">
                                    <Edit size={14} />
                                  </button>
                                  <button onClick={() => handleDeleteFeed(f.id)} className="p-2 border border-text-muted/20 hover:border-accent-warning hover:text-accent-warning transition-colors text-text-muted">
                                    <Trash2 size={14} />
                                  </button>
                               </div>
                             </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                   )}

                   {/* INBOX VIEWER */}
                   {tab === "INBOX" && (
                     <motion.div key="inbox" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                       <h2 className="text-2xl font-black uppercase text-text-primary tracking-widest border-l-4 border-accent-secondary pl-4 mb-4">Pulled Inbound Logs</h2>
                       
                       {loadingContacts ? (
                         <div className="flex items-center gap-3 text-accent-secondary p-8 border border-dashed border-accent-secondary/30">
                            <Database size={16} className="animate-spin" />
                            <span className="uppercase tracking-widest text-xs">PULLING_SECURE_COLLECTION...</span>
                         </div>
                       ) : (
                         <div className="flex flex-col gap-6">
                           {contacts.length === 0 && (
                             <p className="text-text-muted text-xs uppercase tracking-widest border border-dashed border-text-muted/30 p-8 text-center text-accent-warning">NO_DATA_BLOCKS_FOUND</p>
                           )}
                           {contacts.map((c, i) => (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: i * 0.1 }}
                               key={c.id} 
                               className="bg-surface-card border border-text-muted/20 shadow-sm p-5 group hover:border-text-muted/40 transition-colors relative"
                             >
                               <div className="absolute top-0 bottom-0 left-0 w-1 bg-text-muted/20 group-hover:bg-accent-secondary transition-colors" />
                               
                               <div className="flex justify-between items-start border-b border-text-muted/20 pb-3 mb-3 ml-2">
                                 <div className="flex flex-col">
                                    <span className="text-accent-secondary font-bold text-sm tracking-widest uppercase">{c.name}</span>
                                    <span className="text-text-muted text-[10px] break-all">{c.email} • {c.phone || "NO_PHONE"}</span>
                                 </div>
                                 <span className="bg-surface-dark border border-text-muted/20 px-2 py-1 text-[10px] text-text-muted uppercase shadow-inner">{new Date(c.createdAt).toLocaleString()}</span>
                               </div>
                               
                               <p className="text-sm whitespace-pre-wrap text-text-secondary leading-relaxed font-mono ml-2">
                                 <span className="text-text-muted opacity-50 mr-2">&gt;</span>
                                 {c.message}
                               </p>
                             </motion.div>
                           ))}
                         </div>
                       )}
                     </motion.div>
                   )}

                 </AnimatePresence>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
