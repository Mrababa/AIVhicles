import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ContentContext } from '../contexts/ContentContext.tsx';

/**
 * Admin interface for managing static site content across pages.
 */
export default function AdminContent() {
  const { isAuthenticated } = useAuth();
  const { content, setContent } = useContext(ContentContext);
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState('home');
  const [isSaved, setIsSaved] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent(draft);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFeatureChange = (index, field, value) => {
    setDraft((prev) => {
      const features = [...prev.features];
      features[index] = { ...features[index], [field]: value };
      return { ...prev, features };
    });
  };

  const handleAboutChange = (field, value) => {
    setDraft((prev) => ({ ...prev, about: { ...prev.about, [field]: value } }));
  };

  const handleTeamChange = (index, field, value) => {
    setDraft((prev) => {
      const team = [...prev.about.team];
      team[index] = { ...team[index], [field]: value };
      return { ...prev, about: { ...prev.about, team } };
    });
  };

  const handleContactChange = (field, value) => {
    setDraft((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  };

  const handleLegalChange = (index, field, value) => {
    setDraft((prev) => {
      const sections = [...prev.legal.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, legal: { ...prev.legal, sections } };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-3xl font-bold">Content Management</h1>
            <div className="flex items-center space-x-4">
              {isSaved && (
                <p className="text-green-600">Content saved successfully!</p>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>

          <nav className="flex space-x-4 border-b">
            {[
              { key: 'home', label: 'Home' },
              { key: 'about', label: 'About Us' },
              { key: 'contact', label: 'Contact' },
              { key: 'careers', label: 'Careers' },
              { key: 'legal', label: 'Legal Pages' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2 border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4">
                <h3 className="text-xl font-bold">Hero Section</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={draft.headline}
                    onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
                    className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Tagline
                  </label>
                  <textarea
                    rows={3}
                    value={draft.tagline}
                    onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
                    className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold">Features</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {draft.features.map((f, idx) => (
                    <div key={idx} className="space-y-2 border rounded-md p-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Title
                        </label>
                        <input
                          type="text"
                          value={f.title}
                          onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={f.description}
                          onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4">
                <h3 className="text-xl font-bold">Main</h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Intro Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about.intro}
                    onChange={(e) => handleAboutChange('intro', e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mission Statement
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about.mission}
                    onChange={(e) => handleAboutChange('mission', e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Leadership Intro
                  </label>
                  <textarea
                    rows={3}
                    value={draft.about.leadership}
                    onChange={(e) => handleAboutChange('leadership', e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold">Team Members</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {draft.about.team.map((m, idx) => (
                    <div key={idx} className="space-y-2 border rounded-md p-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Name
                        </label>
                        <input
                          type="text"
                          value={m.name}
                          onChange={(e) => handleTeamChange(idx, 'name', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Title
                        </label>
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => handleTeamChange(idx, 'title', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={m.imageUrl}
                          onChange={(e) => handleTeamChange(idx, 'imageUrl', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Intro Paragraph
                </label>
                <textarea
                  rows={3}
                  value={draft.contact.intro}
                  onChange={(e) => handleContactChange('intro', e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Address
                </label>
                <input
                  type="text"
                  value={draft.contact.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={draft.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={draft.contact.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Google Maps Embed URL
                </label>
                <input
                  type="text"
                  value={draft.contact.mapUrl}
                  onChange={(e) => handleContactChange('mapUrl', e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Intro Paragraph
                </label>
                <textarea
                  rows={3}
                  value={draft.careers.intro}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      careers: { ...prev.careers, intro: e.target.value },
                    }))
                  }
                  className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-6">
              {draft.legal.sections.map((section, idx) => (
                <div key={idx} className="space-y-2 border rounded-md p-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleLegalChange(idx, 'title', e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Section Content
                    </label>
                    <textarea
                      rows={6}
                      value={section.content}
                      onChange={(e) => handleLegalChange(idx, 'content', e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
    </form>
  );
}
