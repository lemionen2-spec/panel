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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Koçluk Yönetim Paneli</h1>
            <p className="text-xs text-gray-500">Lemi Önen • Yücel</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Yeni Öğrenci Ekle
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2">Öğrenci Yönetimi</h2>
          <p className="text-sm text-gray-600 mb-4">Öğrencilerinizi ve süreçlerini buradan yönetebilirsiniz.</p>
          
          <div className="flex gap-4 border-b border-gray-200 pb-3 mb-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`text-sm font-medium pb-2 border-b-2 ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
            >
              Genel Bakış
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`text-sm font-medium pb-2 border-b-2 ${activeTab === 'students' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
            >
              Öğrenciler
            </button>
          </div>

          <div className="text-sm text-gray-700">
            {activeTab === 'overview' ? (
              <p>Aktif Öğrenci Sayısı: <strong>24</strong></p>
            ) : (
              <p>Öğrenci listesi yükleniyor...</p>
            )}
          </div>
        </div>
      </main>

      {/* Öğrenci Ekle Modalı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold mb-4">Yeni Öğrenci Ekle</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ad Soyad</label>
                <input type="text" placeholder="Örn: Ahmet Yılmaz" className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">E-posta</label>
                <input type="email" placeholder="ahmet@example.com" className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
              >
                İptal
              </button>
              <button 
                onClick={() => {
                  alert('Öğrenci başarıyla eklendi!');
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 font-medium"
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
