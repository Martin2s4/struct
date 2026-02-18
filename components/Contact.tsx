import React, { useState } from 'react';
import { saveMessage } from '../services/storage';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate network delay then save
    setTimeout(() => {
      saveMessage({
        id: Date.now().toString(),
        name: formState.name,
        email: formState.email,
        message: formState.message,
        date: new Date().toISOString()
      });
      
      setStatus('sent');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="bg-structure-gray py-24 border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-neon-blue font-sans tracking-widest text-sm mb-2">GET IN TOUCH</h2>
          <h3 className="text-3xl font-display font-bold text-white">Contact Me</h3>
        </div>

        <div className="bg-deep-space p-8 rounded-lg border border-gray-700 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm font-bold mb-2 tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-structure-gray border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2 tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-structure-gray border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-400 text-sm font-bold mb-2 tracking-wider">
                MESSAGE
              </label>
              <textarea
                required
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                rows={5}
                className="w-full bg-structure-gray border border-gray-600 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors"
                placeholder="How can I help you?"
              />
            </div>

            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className="w-full bg-neon-blue text-deep-space font-bold py-3 px-6 rounded hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'idle' ? 'SEND MESSAGE' : status === 'sending' ? 'SENDING...' : 'MESSAGE SENT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};