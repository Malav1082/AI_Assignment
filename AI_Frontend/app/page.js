"use client";

import { useEffect, useState } from "react";

// This is the main application component.
export default function Home() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "", affectedService: "" });
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Fetches all incidents from the backend on initial load.
  useEffect(() => {
    fetch("http://localhost:8080/incidents")
      .then(res => res.json())
      .then(setIncidents)
      .catch(error => console.error("Error fetching incidents:", error))
      .finally(() => setLoading(false));
  }, []);

  // Handles form submission to create a new incident.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const newIncident = await response.json();
    setIncidents([...incidents, newIncident]);
    setFormData({ title: "", description: "", affectedService: "" }); // Reset form
  };

  // Helper function to get color based on severity.
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-2">ITSM Dashboard</h1>
          <p className="text-lg text-slate-600">Al-Powered Incident Triage Assistant</p>
        </header>

        {/* Incident Submission Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Submit New Incident</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Incident Title"
                required
                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 placeholder-slate-400 text-slate-800"
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description"
                required
                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 placeholder-slate-400 text-slate-800"
              />
              <input
                type="text"
                value={formData.affectedService}
                onChange={(e) => setFormData({ ...formData, affectedService: e.target.value })}
                placeholder="Affected Service"
                required
                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 placeholder-slate-400 text-slate-800"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
              >
                Submit Incident
              </button>
            </div>
          </form>
        </div>

        {/* Incident List */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Incident List</h2>
          {loading ? (
            <p className="text-center text-slate-500 text-lg">Loading incidents...</p>
          ) : (
            <div className="space-y-6">
              {incidents.length === 0 ? (
                <p className="text-center text-slate-500 text-lg">No incidents found. Submit one above!</p>
              ) : (
                incidents.map(i => (
                  <div
                    key={i.id}
                    className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md cursor-pointer transition-shadow duration-200"
                    onClick={() => setSelectedIncident(i)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-xl text-slate-900">{i.title}</h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${getSeverityColor(i.aiSeverity)}`}>
                        {i.aiSeverity || 'N/A'}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">{i.description}</p>
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>Service: <span className="font-medium text-slate-700">{i.affectedService}</span></span>
                      <span className="font-medium">Category: <span className="text-blue-600">{i.aiCategory || 'N/A'}</span></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detail View Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full relative">
            <button
              onClick={() => setSelectedIncident(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">{selectedIncident.title}</h3>
            <p className="text-slate-600 mb-4">{selectedIncident.description}</p>
            <div className="space-y-2">
              <p className="font-semibold text-slate-700">Affected Service: <span className="font-normal">{selectedIncident.affectedService}</span></p>
              <p className="font-semibold text-slate-700">AI Severity: <span className="font-normal">{selectedIncident.aiSeverity}</span></p>
              <p className="font-semibold text-slate-700">AI Category: <span className="font-normal">{selectedIncident.aiCategory}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}