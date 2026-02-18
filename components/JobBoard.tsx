import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { getJobs } from '../services/storage';

export const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(getJobs());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-neon-blue font-sans tracking-[0.2em] mb-2">OPPORTUNITIES</h2>
          <h3 className="text-4xl font-display font-bold text-white">Join the Crew</h3>
        </div>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 gap-6">
        {jobs.length === 0 ? (
          <div className="text-gray-500 font-mono text-center py-12">NO OPEN POSITIONS DETECTED.</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="group glass-panel p-6 hover:border-neon-blue/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gray-700 group-hover:bg-neon-blue transition-colors"></div>
              <div className="pl-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-neon-blue text-xs font-bold border border-neon-blue/30 px-2 py-0.5 rounded uppercase">{job.type}</span>
                    <span className="text-gray-500 text-xs font-mono">{job.postedDate}</span>
                  </div>
                  <h3 className="text-2xl font-display text-white mb-2 group-hover:text-neon-blue transition-colors">{job.title}</h3>
                  <p className="text-sm text-gray-400 font-mono mb-4">📍 {job.location}</p>
                  <p className="text-gray-300 leading-relaxed max-w-3xl">{job.description}</p>
                </div>
                <button className="whitespace-nowrap px-6 py-3 border border-gray-600 text-white hover:border-neon-blue hover:text-neon-blue transition-all font-sans font-bold">
                  APPLY NOW
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};