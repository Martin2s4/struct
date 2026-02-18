import React, { useState, useEffect } from 'react';
import { Job, ContactMessage } from '../types';
import { getJobs, saveJob, deleteJob, getMessages } from '../services/storage';
import { generateJobDescription } from '../services/geminiService';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'jobs' | 'messages'>('jobs');
  
  // Data State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState<'Full-time' | 'Contract' | 'Remote'>('Full-time');
  const [keyPoints, setKeyPoints] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setJobs(getJobs());
      setMessages(getMessages());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded check for MVP
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Invalid Credentials');
    }
  };

  const handleGenerateAI = async () => {
    if (!newTitle || !keyPoints) {
      alert("Please enter a Job Title and Key Responsibilities first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateJobDescription(newTitle, newLocation, keyPoints);
    setGeneratedDescription(desc);
    setIsGenerating(false);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Date.now().toString(),
      title: newTitle,
      location: newLocation,
      type: newType,
      description: generatedDescription || keyPoints,
      postedDate: new Date().toISOString().split('T')[0],
    };
    const updatedJobs = saveJob(newJob);
    setJobs(updatedJobs);
    
    // Reset Form
    setNewTitle('');
    setNewLocation('');
    setKeyPoints('');
    setGeneratedDescription('');
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to remove this position?')) {
      const updatedJobs = deleteJob(id);
      setJobs(updatedJobs);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.hash = ''; // Return to public
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-deep-space flex items-center justify-center p-4">
        <div className="glass-panel p-8 max-w-md w-full border border-neon-blue/20">
          <h2 className="text-2xl font-display text-white mb-6 text-center">SYSTEM ACCESS</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-xs tracking-widest mb-2">ACCESS CODE</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-deep-space/50 border border-gray-700 text-white p-3 focus:border-neon-blue focus:outline-none"
                placeholder="Enter password..."
              />
            </div>
            <button className="w-full bg-neon-blue text-deep-space font-bold py-3 hover:bg-white transition-colors tracking-widest">
              AUTHENTICATE
            </button>
            <div className="text-center">
              <button type="button" onClick={() => window.location.hash = ''} className="text-gray-500 text-xs hover:text-white mt-4">
                RETURN TO PUBLIC TERMINAL
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-space text-gray-200 font-sans">
      {/* Admin Nav */}
      <div className="bg-structure-gray border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-white tracking-widest">STRUCTURA <span className="text-neon-purple">ADMIN</span></span>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-500 font-mono">LOGGED IN AS ADMIN</span>
            <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 border border-red-900 px-3 py-1 bg-red-900/10">TERMINATE SESSION</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-2 font-display tracking-widest text-sm transition-all ${activeTab === 'jobs' ? 'bg-neon-blue text-deep-space' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            JOBS MANAGER
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-2 font-display tracking-widest text-sm transition-all ${activeTab === 'messages' ? 'bg-neon-blue text-deep-space' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            INBOX ({messages.length})
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Job Form */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-6 border border-white/5">
                <h3 className="font-display text-lg text-white mb-6">POST NEW POSITION</h3>
                <form onSubmit={handleAddJob} className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">TITLE</label>
                    <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full bg-deep-space border border-gray-700 p-2 text-white focus:border-neon-blue focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">LOCATION</label>
                    <input type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} className="w-full bg-deep-space border border-gray-700 p-2 text-white focus:border-neon-blue focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">TYPE</label>
                    <select value={newType} onChange={e => setNewType(e.target.value as any)} className="w-full bg-deep-space border border-gray-700 p-2 text-white focus:border-neon-blue focus:outline-none text-sm">
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">DRAFT NOTES</label>
                    <textarea value={keyPoints} onChange={e => setKeyPoints(e.target.value)} className="w-full h-24 bg-deep-space border border-gray-700 p-2 text-white focus:border-neon-blue focus:outline-none text-sm" placeholder="Key responsibilities..." />
                  </div>
                  
                  <button type="button" onClick={handleGenerateAI} disabled={isGenerating} className="w-full border border-neon-blue text-neon-blue text-xs py-2 hover:bg-neon-blue hover:text-deep-space transition-colors mb-2">
                    {isGenerating ? 'AI PROCESSING...' : 'GENERATE DESCRIPTION (GEMINI)'}
                  </button>

                  {generatedDescription && (
                    <div className="animate-fade-in">
                      <label className="block text-gray-500 text-xs mb-1">FINAL CONTENT</label>
                      <textarea value={generatedDescription} onChange={e => setGeneratedDescription(e.target.value)} className="w-full h-32 bg-deep-space border border-gray-700 p-2 text-white focus:border-neon-blue focus:outline-none text-sm" />
                    </div>
                  )}

                  <button type="submit" className="w-full bg-white text-deep-space font-bold py-3 hover:bg-gray-200 transition-colors">
                    PUBLISH
                  </button>
                </form>
              </div>
            </div>

            {/* Job List */}
            <div className="lg:col-span-2 space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-structure-gray p-4 flex justify-between items-start border border-gray-800 hover:border-gray-600 transition-colors">
                  <div>
                    <h4 className="text-white font-bold">{job.title}</h4>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1 mb-2 font-mono">
                      <span>{job.location}</span>
                      <span>{job.type}</span>
                      <span>{job.postedDate}</span>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">{job.description}</p>
                  </div>
                  <button onClick={() => handleDeleteJob(job.id)} className="text-red-500 hover:text-red-400 px-3 py-1 text-xs border border-red-900/50 bg-red-900/10">
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 gap-4">
            {messages.length === 0 ? (
                <div className="text-center py-20 text-gray-500">NO MESSAGES IN DATABASE</div>
            ) : (
                messages.map(msg => (
                <div key={msg.id} className="bg-structure-gray p-6 border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="text-white font-bold text-lg">{msg.name}</h4>
                            <a href={`mailto:${msg.email}`} className="text-neon-blue text-sm hover:underline">{msg.email}</a>
                        </div>
                        <span className="text-gray-500 text-xs font-mono">{new Date(msg.date).toLocaleString()}</span>
                    </div>
                    <div className="bg-deep-space p-4 rounded border border-gray-800">
                        <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};