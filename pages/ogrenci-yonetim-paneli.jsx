import React, { useState } from 'react';
import { 
  Users, Calendar, CreditCard, Settings, Plus, Search, 
  MoreVertical, CheckCircle2, Clock, AlertCircle, ArrowUpRight,
  GraduationCap, MessageSquare, ShieldCheck, ChevronRight
} from 'lucide-react';

export default function StudentManagementPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Profil / Üst Başlık */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">LEMI ÖNEN</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Koçluk Programı • @lemi.onen</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Öğrenci Ekle
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Alt Menü Tabları */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-3">
          {[
            { id: 'overview', label: 'Ana Sayfa' },
            { id: 'students', label: 'Öğrencilerim' },
            { id: 'calendar', label: 'Takvim & Randevular' },
            { id: 'payments', label: 'Ödemeler' },
            { id: 'settings', label: 'Ayarlar' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ana Kart */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Merhaba, Yücel</h2>
          <p className="text-sm text-gray-500 mb-6">2 Eylül Çarşamba — bugün 2 birebir görüşmen ve gönderilecek 3 dosyan var.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-400 tracking-wider">AKTİF ÖĞRENCİ</span>
              <div className="text-3xl font-extrabold text-gray-900 mt-2">24</div>
              <span className="text-xs font-semibold text-emerald-600 mt-1 block">+3 bu ay</span>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-400 tracking-wider">TAMAMLANAN GÖRÜŞME</span>
              <div className="text-3xl font-extrabold text-gray-900 mt-2">142</div>
              <span className="text-xs font-semibold text-blue-600 mt-1 block">Bu hafta 12 görüşme</span>
            </div>
          </div>
        </div>
      </div>

      {/* Öğrenci Ekle Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Yeni Öğrenci Ekle</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ad Soyad</label>
                <input type="text" placeholder="Örn: Ahmet Yılmaz" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">E-posta</label>
                <input type="email" placeholder="ahmet@example.com" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                İptal
              </button>
              <button 
                onClick={() => {
                  alert('Öğrenci başarıyla eklendi!');
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
