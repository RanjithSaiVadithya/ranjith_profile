"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldAlert,
  LogOut,
  Database,
  Navigation,
  Archive,
  Edit,
  Trash2,
  UserCircle2,
  Save,
  X,
  RefreshCw,
  Mail,
  FileText,
} from "lucide-react";

type Tab = "FEED" | "INBOX" | "ARCHIVE";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("INBOX");
  const [token, setToken] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState("Ranjith Sai");
  const [profileEmail, setProfileEmail] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [relatedProject, setRelatedProject] = useState("");
  const [category, setCategory] = useState("ARCHITECTURE");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFeedId, setEditingFeedId] = useState<string | null>(null);

  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactsError, setContactsError] = useState("");
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loadingFeeds, setLoadingFeeds] = useState(false);
  const [feedsError, setFeedsError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.push("/admin/login");
    } else {
      setToken(t);
      const savedProfileName = localStorage.getItem("admin_profile_name");
      const savedProfileEmail = localStorage.getItem("admin_profile_email");
      if (savedProfileName) setProfileName(savedProfileName);
      if (savedProfileEmail) setProfileEmail(savedProfileEmail);
      fetchContacts(t);
      fetchFeeds();
    }
  }, [router]);

  const fetchContacts = async (t: string) => {
    setLoadingContacts(true);
    setContactsError("");
    try {
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to load contacts (${res.status})`);
      }
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (e: any) {
      console.error(e);
      setContactsError(e.message || "Could not load contact messages.");
      setContacts([]);
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchFeeds = async () => {
    setLoadingFeeds(true);
    setFeedsError("");
    try {
      const res = await fetch("/api/feed");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to load feed posts (${res.status})`);
      }
      const data = await res.json();
      setFeeds(data.feeds || []);
    } catch (e: any) {
      console.error(e);
      setFeedsError(e.message || "Could not load feed posts.");
      setFeeds([]);
    } finally {
      setLoadingFeeds(false);
    }
  };

  const handlePostFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    try {
      const method = editingFeedId ? "PUT" : "POST";
      const payload = {
        ...(editingFeedId && { id: editingFeedId }),
        title,
        content,
        relatedProjectId: relatedProject || null,
        category,
      };

      const res = await fetch("/api/feed", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMessage(editingFeedId ? "Feed post updated." : "Feed post published.");
        setTitle("");
        setContent("");
        setRelatedProject("");
        setCategory("ARCHITECTURE");
        setEditingFeedId(null);
        fetchFeeds();
        setTab("ARCHIVE");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatusMessage(data.error || "Failed to save feed post.");
      }
    } catch {
      setStatusMessage("Server offline. Could not save feed post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFeed = async (id: string) => {
    if (!confirm("Delete this feed post? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/feed?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage("Feed post deleted.");
        fetchFeeds();
      } else {
        setStatusMessage("Failed to delete feed post.");
      }
    } catch (e) {
      console.error(e);
      setStatusMessage("Server offline. Could not delete feed post.");
    }
  };

  const handleEditFeed = (feed: any) => {
    setEditingFeedId(feed.id);
    setTitle(feed.title);
    setContent(feed.content);
    setRelatedProject(feed.relatedProjectId || "");
    setCategory(feed.category || "ARCHITECTURE");
    setTab("FEED");
    setStatusMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const handleProfileSave = () => {
    localStorage.setItem("admin_profile_name", profileName.trim() || "Admin User");
    localStorage.setItem("admin_profile_email", profileEmail.trim());
    setIsProfileOpen(false);
  };

  const refreshCurrent = () => {
    if (tab === "INBOX") fetchContacts(token);
    else fetchFeeds();
  };

  if (!token) return <div className="min-h-screen bg-background-main" />;

  return (
    <div className="min-h-screen bg-background-main text-text-primary p-3 md:p-8 lg:p-12 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col h-full gap-8 md:gap-12 relative z-10 pt-4 md:pt-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-end border-b-2 border-text-muted/20 pb-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black uppercase text-text-primary tracking-widest flex items-center gap-3 md:gap-4">
              <ShieldAlert className="text-accent-energy w-10 h-10" />
              Admin Dashboard
            </h1>
            <div className="text-xs text-text-muted mt-2 tracking-widest uppercase flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              Contact inbox · Feed posts · Connected to Firebase
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-wrap md:flex-nowrap">
            <button
              onClick={refreshCurrent}
              className="flex items-center gap-2 text-xs border border-text-muted/30 bg-surface-card/90 px-3 py-2 hover:border-accent-energy hover:text-accent-energy transition-colors uppercase tracking-widest"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 text-xs border border-text-muted/30 bg-surface-card/90 backdrop-blur-sm px-3 py-2 hover:border-accent-primary hover:text-accent-primary transition-colors uppercase tracking-widest"
            >
              <UserCircle2 size={16} />
              {profileName || "Admin User"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs border border-accent-warning text-accent-warning px-3 md:px-4 py-2 hover:bg-accent-warning hover:text-white transition-colors uppercase tracking-widest group"
            >
              <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
              Logout
            </button>
          </div>
        </motion.div>

        {statusMessage && (
          <div className="border border-accent-energy/40 bg-accent-energy/10 px-4 py-3 text-xs text-accent-energy uppercase tracking-widest flex justify-between items-center gap-4">
            <span>{statusMessage}</span>
            <button type="button" onClick={() => setStatusMessage("")} className="hover:text-text-primary">
              <X size={14} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-1 lg:col-span-3 flex flex-col gap-4"
          >
            <div className="bg-surface-card border border-text-muted/20 p-4 flex flex-col gap-2 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-primary" />
              <p className="text-[10px] text-text-muted font-bold tracking-widest mb-2 uppercase">Menu</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                <button
                  onClick={() => setTab("INBOX")}
                  className={`text-left p-3 flex justify-between items-center transition-colors font-bold uppercase text-xs tracking-widest ${
                    tab === "INBOX"
                      ? "bg-accent-secondary/10 text-accent-secondary border-l-2 border-accent-secondary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Mail size={12} /> Contact Messages
                  </span>
                  {tab === "INBOX" && <Database size={12} />}
                </button>

                <button
                  onClick={() => {
                    setTab("FEED");
                    setEditingFeedId(null);
                    setTitle("");
                    setContent("");
                    setStatusMessage("");
                  }}
                  className={`text-left p-3 flex justify-between items-center transition-colors font-bold uppercase text-xs tracking-widest ${
                    tab === "FEED"
                      ? "bg-accent-energy/10 text-accent-energy border-l-2 border-accent-energy"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText size={12} /> Create Feed Post
                  </span>
                  {tab === "FEED" && <Activity size={12} />}
                </button>

                <button
                  onClick={() => setTab("ARCHIVE")}
                  className={`text-left p-3 flex justify-between items-center transition-colors font-bold uppercase text-xs tracking-widest ${
                    tab === "ARCHIVE"
                      ? "bg-accent-primary/10 text-accent-primary border-l-2 border-accent-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Archive size={12} /> All Feed Posts
                  </span>
                  {tab === "ARCHIVE" && <Archive size={12} />}
                </button>
              </div>
            </div>

            <div className="bg-surface-card border border-dashed border-text-muted/30 p-4 mt-4 shadow-sm">
              <p className="text-[10px] text-accent-energy mb-2 uppercase opacity-80">Overview</p>
              <div className="flex flex-col gap-1 text-[10px] text-text-muted uppercase tracking-widest">
                <p>Contact messages: {contacts.length}</p>
                <p>Feed posts: {feeds.length}</p>
                <p>API: /api/contact · /api/feed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 lg:col-span-9"
          >
            <div className="w-full bg-surface-card/95 backdrop-blur-sm border border-text-muted/20 shadow-xl relative">
              <div className="flex items-center justify-between border-b border-text-muted/20 px-4 py-3 bg-surface-dark">
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-[10px] text-text-muted font-bold tracking-widest uppercase">
                    {tab === "INBOX" && "Contact Messages from Website Form"}
                    {tab === "FEED" && (editingFeedId ? "Edit Feed Post" : "Create New Feed Post")}
                    {tab === "ARCHIVE" && "Published Feed Posts"}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse" />
                </div>
              </div>

              <div className="p-4 md:p-8 lg:p-10 min-h-[420px] md:min-h-[500px]">
                <AnimatePresence mode="wait">
                  {tab === "FEED" && (
                    <motion.div
                      key="feed"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-8"
                    >
                      <h2 className="text-2xl font-black uppercase text-text-primary tracking-widest border-l-4 border-accent-energy pl-4">
                        {editingFeedId ? "Edit Feed Post" : "Create Feed Post"}
                      </h2>

                      <form onSubmit={handlePostFeed} className="flex flex-col gap-6 md:gap-8 text-text-primary">
                        <div className="group">
                          <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block">
                            Title
                          </label>
                          <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-text-muted/30 tracking-wider text-text-primary font-mono placeholder:text-text-muted/60 focus:border-accent-energy focus:outline-none transition-colors pb-1"
                            placeholder="Post title"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="group">
                            <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block">
                              Category
                            </label>
                            <select
                              className="w-full bg-transparent border-b-2 border-text-muted/30 tracking-wider text-text-primary font-mono focus:border-accent-primary focus:outline-none transition-colors pb-1 appearance-none cursor-pointer"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              <option value="ARCHITECTURE">Architecture</option>
                              <option value="PERFORMANCE">Performance</option>
                              <option value="UI/UX">UI/UX</option>
                              <option value="DEVOPS">DevOps</option>
                              <option value="SYSTEMS">Systems</option>
                            </select>
                          </div>

                          <div className="group">
                            <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block">
                              Related Project
                            </label>
                            <select
                              className="w-full bg-transparent border-b-2 border-text-muted/30 tracking-wider text-text-primary font-mono focus:border-accent-secondary focus:outline-none transition-colors pb-1 appearance-none cursor-pointer"
                              value={relatedProject}
                              onChange={(e) => setRelatedProject(e.target.value)}
                            >
                              <option value="">None</option>
                              <option value="praxo">Praxo</option>
                              <option value="ridewheels">Ride Wheels</option>
                              <option value="pet-ecommerce">Pet Care E-Comm</option>
                              <option value="n8n-bot">n8n Telegram Bot</option>
                              <option value="atal">Atal Incubation</option>
                            </select>
                          </div>
                        </div>

                        <div className="group">
                          <label className="font-mono text-[10px] uppercase text-text-muted font-bold tracking-widest mb-1 block">
                            Content
                          </label>
                          <textarea
                            required
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-surface-dark border-l-2 border-text-muted/30 p-4 tracking-wider text-text-primary font-mono placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none transition-colors resize-none shadow-inner"
                            placeholder="Write your feed post content..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="relative overflow-hidden w-full bg-accent-energy text-white font-mono font-bold uppercase tracking-[0.14em] md:tracking-[0.2em] py-4 hover:bg-surface-dark hover:text-accent-energy transition-all group mt-4 flex items-center justify-center gap-3"
                        >
                          <span className="z-10">
                            {isSubmitting ? "Saving..." : editingFeedId ? "Update Post" : "Publish Post"}
                          </span>
                          {!isSubmitting && <Navigation size={16} className="z-10 group-hover:translate-x-2 transition-transform" />}
                        </button>

                        {editingFeedId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingFeedId(null);
                              setTitle("");
                              setContent("");
                            }}
                            className="text-text-muted text-xs hover:text-accent-warning transition-colors uppercase tracking-widest"
                          >
                            Cancel edit
                          </button>
                        )}
                      </form>
                    </motion.div>
                  )}

                  {tab === "ARCHIVE" && (
                    <motion.div
                      key="archive"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="text-2xl font-black uppercase text-text-primary tracking-widest border-l-4 border-accent-primary pl-4 mb-4">
                        All Feed Posts
                      </h2>
                      {feedsError && (
                        <div className="border border-accent-warning/40 bg-accent-warning/10 p-4 text-xs text-accent-warning">
                          {feedsError}
                        </div>
                      )}
                      {loadingFeeds ? (
                        <div className="flex items-center gap-3 text-accent-primary p-8 border border-dashed border-accent-primary/30">
                          <Database size={16} className="animate-spin" />
                          <span className="uppercase tracking-widest text-xs">Loading feed posts...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {feeds.length === 0 && !feedsError && (
                            <p className="text-text-muted text-xs uppercase tracking-widest border border-dashed border-text-muted/30 p-8 text-center">
                              No feed posts yet. Create one from “Create Feed Post”.
                            </p>
                          )}
                          {feeds.map((f, i) => (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              key={f.id}
                              className="bg-surface-card border border-text-muted/20 shadow-sm p-4 group hover:border-text-muted/40 transition-colors relative flex justify-between items-start"
                            >
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-text-muted/20 group-hover:bg-accent-primary transition-colors" />

                              <div className="ml-2 flex flex-col gap-1 w-full max-w-[80%]">
                                <span className="text-accent-primary font-bold text-lg tracking-widest uppercase truncate">
                                  {f.title}
                                </span>
                                <div className="flex flex-wrap gap-2 text-[10px] text-text-muted uppercase">
                                  <span className="bg-surface-dark px-2 py-1">{f.category || "General"}</span>
                                  {f.relatedProjectId && (
                                    <span className="bg-surface-dark px-2 py-1 flex items-center gap-1">
                                      <Navigation size={10} /> {f.relatedProjectId}
                                    </span>
                                  )}
                                  <span className="bg-surface-dark px-2 py-1">
                                    {f.createdAt ? new Date(f.createdAt).toLocaleDateString() : ""}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditFeed(f)}
                                  className="p-2 border border-text-muted/20 hover:border-accent-secondary hover:text-accent-secondary transition-colors text-text-muted"
                                  aria-label="Edit post"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteFeed(f.id)}
                                  className="p-2 border border-text-muted/20 hover:border-accent-warning hover:text-accent-warning transition-colors text-text-muted"
                                  aria-label="Delete post"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {tab === "INBOX" && (
                    <motion.div
                      key="inbox"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6"
                    >
                      <h2 className="text-2xl font-black uppercase text-text-primary tracking-widest border-l-4 border-accent-secondary pl-4 mb-4">
                        Contact Messages
                      </h2>
                      <p className="text-xs text-text-muted -mt-4 mb-2">
                        Submissions from the website contact form (`/contact` → `/api/contact` → Firebase `contacts`)
                      </p>

                      {contactsError && (
                        <div className="border border-accent-warning/40 bg-accent-warning/10 p-4 text-xs text-accent-warning">
                          {contactsError}
                        </div>
                      )}

                      {loadingContacts ? (
                        <div className="flex items-center gap-3 text-accent-secondary p-8 border border-dashed border-accent-secondary/30">
                          <Database size={16} className="animate-spin" />
                          <span className="uppercase tracking-widest text-xs">Loading contact messages...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6">
                          {contacts.length === 0 && !contactsError && (
                            <p className="text-text-muted text-xs uppercase tracking-widest border border-dashed border-text-muted/30 p-8 text-center">
                              No contact messages yet. Submit one from the Contact page to test.
                            </p>
                          )}
                          {contacts.map((c, i) => (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              key={c.id}
                              className="bg-surface-card border border-text-muted/20 shadow-sm p-5 group hover:border-text-muted/40 transition-colors relative"
                            >
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-text-muted/20 group-hover:bg-accent-secondary transition-colors" />

                              <div className="flex justify-between items-start border-b border-text-muted/20 pb-3 mb-3 ml-2 gap-4">
                                <div className="flex flex-col">
                                  <span className="text-accent-secondary font-bold text-sm tracking-widest uppercase">
                                    {c.name}
                                  </span>
                                  <span className="text-text-muted text-[10px] break-all">
                                    {c.email}
                                    {c.phone ? ` · ${c.phone}` : ""}
                                  </span>
                                  {c.status && (
                                    <span className="mt-1 text-[9px] uppercase tracking-widest text-accent-energy">
                                      Status: {c.status}
                                    </span>
                                  )}
                                </div>
                                <span className="bg-surface-dark border border-text-muted/20 px-2 py-1 text-[10px] text-text-muted uppercase shadow-inner shrink-0">
                                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                                </span>
                              </div>

                              <p className="text-sm whitespace-pre-wrap text-text-secondary leading-relaxed font-mono ml-2">
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

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-md bg-surface-card border border-text-muted/20 shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-text-muted/20">
                <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary flex items-center gap-2">
                  <UserCircle2 size={16} className="text-accent-primary" />
                  Update Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Close profile modal"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Display Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="bg-white border border-text-muted/30 p-3 text-sm text-text-primary outline-none focus:border-accent-primary transition-colors"
                    placeholder="Admin User"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Profile Email</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="bg-white border border-text-muted/30 p-3 text-sm text-text-primary outline-none focus:border-accent-primary transition-colors"
                    placeholder="admin@email.com"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleProfileSave}
                  className="mt-1 flex items-center justify-center gap-2 bg-accent-primary text-white font-bold uppercase tracking-widest text-xs py-3 hover:bg-accent-secondary transition-colors"
                >
                  <Save size={14} />
                  Save Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
