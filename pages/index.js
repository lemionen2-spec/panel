import React, { useState } from 'react';
import AdminPanel from './ogrenci-yonetim-paneli.jsx';
import StudentPanel from './ogrenci-tarafi-akisi.jsx';

export default function Home() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Üst Paneller Arası Geçiş Barı */}
      <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-wide text-blue-400">Dijital Gelir Sistemi</span>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">v1.0</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              activeTab === 'admin' 
                ? 'bg-blue-600 text-white shadow' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Yönetici (Koç) Paneli
          </button>
          <button 
            onClick={() => setActiveTab('student')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              activeTab === 'student' 
                ? 'bg-emerald-600 text-white shadow' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Öğrenci Paneli
          </button>
        </div>
      </div>

      {/* Seçili Panel Ekranı */}
      <div>
        {activeTab === 'admin' ? <AdminPanel /> : <StudentPanel />}
      </div>
    </div>
  );
}
