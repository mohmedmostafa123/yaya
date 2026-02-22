
import React, { useState, useEffect } from 'react';
import { UserProfile, UserType, AppMode, Theme } from './types';
import SetupWizard from './components/SetupWizard';
import Layout from './components/Layout';
import ChatPanel from './components/ChatPanel';
import Settings from './components/Settings';
import SkillsDevelopmentTest from './components/EmploymentTest';
import SoundBracelet from './components/SoundBracelet';
import SignSpeakPanel from './components/SignSpeakPanel';
import DeliveryLog from './components/DeliveryLog';
import { UI_STRINGS } from './constants';
import { IncidentLogEntry } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [isLoading, setIsLoading] = useState(true);
  const [incidentLogs, setIncidentLogs] = useState<IncidentLogEntry[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedLogs = localStorage.getItem('incident_logs');
    if (savedLogs) {
      setIncidentLogs(JSON.parse(savedLogs));
    }
    setIsLoading(false);
  }, []);

  const handleSetupComplete = (profile: UserProfile) => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
    setUser(profile);
    setActiveTab('chat');

    // Update document class for Tailwind dark mode
    if (profile.theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));

    // Update document class for Tailwind dark mode
    if (updates.theme !== undefined) {
      if (updates.theme === Theme.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_profile');
    localStorage.removeItem('incident_logs');
    setUser(null);
    setIncidentLogs([]);
  };

  const handleAddIncident = (text: string) => {
    if (!user) return;
    const newLog: IncidentLogEntry = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
      reporterName: user.name
    };
    const updated = [newLog, ...incidentLogs];
    setIncidentLogs(updated);
    localStorage.setItem('incident_logs', JSON.stringify(updated));
  };

  const handleDeleteIncident = (id: string) => {
    const updated = incidentLogs.filter(log => log.id !== id);
    setIncidentLogs(updated);
    localStorage.setItem('incident_logs', JSON.stringify(updated));
  };

  const handleClearIncidents = () => {
    setIncidentLogs([]);
    localStorage.removeItem('incident_logs');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="animate-spin text-indigo-600 text-4xl">
          <i className="fas fa-circle-notch"></i>
        </div>
      </div>
    );
  }

  if (!user) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  return (
    <Layout
      user={user}
      onLogout={handleLogout}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onUpdateUser={handleUpdateUser}
    >
      {activeTab === 'chat' && <ChatPanel user={user} onAddIncident={handleAddIncident} />}
      {activeTab === 'bracelet' && <SoundBracelet />}
      {activeTab === 'visualizer' && <SignSpeakPanel />}
      {activeTab === 'settings' && <Settings user={user} onUpdate={handleUpdateUser} />}
      {activeTab === 'test' && user.mode === AppMode.SKILLS_DEVELOPMENT && <SkillsDevelopmentTest />}
      {activeTab === 'delivery' && (
        <DeliveryLog
          logs={incidentLogs}
          onDelete={handleDeleteIncident}
          onClear={handleClearIncidents}
        />
      )}
    </Layout>
  );
};

export default App;
