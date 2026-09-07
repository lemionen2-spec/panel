import React, { useState } from 'react';

export default function AdminPanel() {
  const [activeSubTab, setActiveSubTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '24px' }}>
      {/* Profil Barı */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Lemi Önen</h1>
            <p style={{ color: '#6b7280', margin: '4px 0 0 0', fontSize: '14px' }}>@lemi.onen • Koçluk Programı</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            + Öğrenci Ekle
          </button>
        </div>
      </div>

      {/* Alt Menü Tabları */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['Ana Sayfa', 'Öğrencilerim', 'Takvim & Randevular', 'Ödemeler', 'Ayarlar'].map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(idx === 0 ? 'dashboard' : 'other')}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: (idx === 0 && activeSubTab === 'dashboard') ? '#374151' : '#ffffff',
              color: (idx === 0 && activeSubTab === 'dashboard') ? '#ffffff' : '#374151',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ana Kart */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginTop: 0 }}>Merhaba, Yücel</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>2 Eylül Çarşamba — bugün 2 birebir görüşmen ve gönderilecek 3 dosyan var.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>AKTİF ÖĞRENCİ</span>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginTop: '4px' }}>24</div>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>+3 bu ay</span>
          </div>
        </div>
      </div>

      {/* Öğrenci Ekle Modalı */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', width: '360px', margin: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: 'bold' }}>Yeni Öğrenci Ekle</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#374151', marginBottom: '4px' }}>Öğrenci Adı</label>
              <input type="text" placeholder="Ahmet Yılmaz" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#fff', cursor: 'pointer' }}>İptal</button>
              <button onClick={() => { alert('Öğrenci eklendi!'); setShowAddModal(false); }} style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
