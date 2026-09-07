import React, { useState } from 'react';
import AdminPanel from './ogrenci-yonetim-paneli.jsx';
import StudentPanel from './ogrenci-tarafi-akisi.jsx';

export default function Home() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div>
      {/* Üst Geçiş Menüsü */}
      <div style={{ padding: '10px 20px', background: '#111827', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 'bold', marginRight: '15px' }}>Dijital Gelir Sistemi</span>
        <button 
          onClick={() => setActiveTab('admin')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'admin' ? '#3b82f6' : '#374151',
            color: '#fff',
            fontWeight: '600'
          }}
        >
          Yönetici (Koç) Paneli
        </button>
        <button 
          onClick={() => setActiveTab('student')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'student' ? '#10b981' : '#374151',
            color: '#fff',
            fontWeight: '600'
          }}
        >
          Öğrenci Paneli
        </button>
      </div>

      {/* Ekran İçeriği */}
      <div>
        {activeTab === 'admin' ? <AdminPanel /> : <StudentPanel />}
      </div>
    </div>
  );
}
